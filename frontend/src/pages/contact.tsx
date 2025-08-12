import { useState } from "react";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message:""});
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || "문의 전송 실패");
            } 
            setDone(true);
            setForm({ name: "", email: "", message: ""});
        }   catch (err: any) {
            setError(err?.message ?? "오류가 발생했습니다.");
        }   finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold">문의하기</h1>

            {done && <p className="p-3 text-green-700 border border-green-200 rounded bg-green-50">문의가 접수되었습니다. 빠르게 확인하겠습니다.</p>}
            {error && <p className="p-3 text-red-700 border border-red-200 rounded bg-red-50">{String(error)}</p>}

            <form onSubmit={onSubmit} className="space-y-3">
                <input
                    className="w-full px-3 py-2 border rounded"
                    placeholder="이름"
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    required
                />
                <input
                    className="w-full px-3 py-2 border rounded"
                    type="email"
                    placeholder="이메일"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    required
                />
                <textarea
                    className="w-full border rounded px-3 py-2 min-h-[140px]"
                    placeholder="문의 내용을 입력하세요"
                    value={form.message}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                    required
                />
                <button
                    disabled={submitting}
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-60"
                >
                {submitting ? "전송 중..." : "보내기"}
                </button>
            </form>
        </div>
    );

}