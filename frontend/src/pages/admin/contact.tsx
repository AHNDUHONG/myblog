import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import { useState } from "react";

export type AdminMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string; // 🔧 직렬화된 ISO
  answered: boolean;
  answer?: string | null;
  answeredAt: string | null;
};

export default function AdminContactPage({ items }: { items: AdminMessage[] }) {
  // 클라에서 상태 업데이트(옵티미스틱)
  const [list, setList] = useState<AdminMessage[]>(items);

  const updateItem = (updated: AdminMessage) =>
    setList((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">문의 목록</h1>

      {!items.length ? (
        <p className="text-gray-500">아직 문의가 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {list.map((m) => (
            <li key={m.id} className="p-4 bg-white border rounded shadow-sm">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{m.name}</div>
                <div className="text-sm text-gray-500">
                    {m.createdAt.slice(0, 16).replace("T", " ")}
                </div>
              </div>
              <div className="text-sm text-gray-600">{m.email}</div>
              <p className="mt-2 whitespace-pre-wrap">{m.message}</p>
              
              <div className="mt-2 text-xs text-gray-500">
                상태: {m.answered ? "답변 완료" : "미답변"}
                {m.answeredAt && ` · ${m.answeredAt.slice(0, 16).replace("T", " ")}`}
              </div>

              <ReplyEditor item={m} onSaved={updateItem} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 인라인 답변 편집 컴포넌트
function ReplyEditor({ item, onSaved }: { item: AdminMessage; onSaved: (m: AdminMessage) => void }) {
    const [open, setOpen] = useState(false);
    const [answer, setAnswer] = useState(item.answer ?? "");
    const [answered, setAnswered] = useState<boolean>(item.answered);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const save = async () => {
        setSaving(true);
        setError(null);
        try {
            const res = await fetch(`/api/contact/${item.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answer, answered }),
            });
            const txt = await res.text();
            if (!res.ok) throw new Error(txt);

            const data: AdminMessage = JSON.parse(txt);
            onSaved(data);
            setOpen(false);
        } catch (e: any) {
            setError(e?.message ?? "저장 실패");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mt-3">
            <button
                onClick={() => setOpen((v) => !v)}
                className="px-3 py-1 border rounded hover:bg-gray-50"
            >
                {open ? "닫기" : "답변하기 / 상태 변경"}
            </button>

            {open && (
                <div className="mt-3 space-y-3">
                    <label className="flex items-center gap-2 text-sm">
                        <input
                        type="checkbox"
                        checked={answered}
                        onChange={(e) => setAnswered(e.target.checked)}
                        />
                        <span>답변 완료로 표시</span>
                    </label>

                    <textarea
                        className="w-full min-h-[120px] border rounded px-3 py-2"
                        placeholder="답변 내용을 입력하세요 (선택)"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div className="flex gap-2">
                        <button
                            onClick={save}
                            disabled={saving}
                            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-60"
                        >
                            {saving ? "저장 중..." : "저장"}
                        </button>
                        <button
                            onClick={() => {
                                setAnswer(item.answer ?? "");
                                setAnswered(item.answered);
                                setOpen(false);
                            }}
                            className="px-4 py-2 border rounded hover:bg-gray-50"
                        >
                            취소
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}


export const getServerSideProps: GetServerSideProps<{ items: AdminMessage[] }> = async (ctx) => {
  // 🔒 관리자만 접근
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || role !== "ADMIN") {
    return { redirect: { destination: "/auth/signin", permanent: false } };
  }

  const rows = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const items: AdminMessage[] = rows.map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    message: m.message,
    createdAt: m.createdAt.toISOString(), // 🔧 직렬화
    answered: m.answered,
  }));

  return { props: { items } };
};