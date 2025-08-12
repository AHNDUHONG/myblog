import { useRouter } from "next/router";
import { useState } from "react";

export default function BoardForm() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<'CSS' | 'HTML' | 'JavaScript' | 'JAVA' | 'SQL'>('CSS');
    const [author, setAuthor] = useState('관리자');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, category, author }),
        });

    
        const text = await res.text();
        if (!res.ok) {
            console.error('[POST /api/posts] status=', res.status, 'body=', text);
            alert(`작성 실패 (${res.status}). 서버 로그를 확인하세요.`);
            return;
        }
        try {
            const data = JSON.parse(text);
        router.push(`/board/${data.id}`);
        } catch (err) {
            console.error(err);
            alert('네트워크 오류');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className="block font-semibold">카테고리</label>
                <select value={category} onChange={(e) => setCategory(e.target.value as any)} className="w-full p-2 border rounded">
                    <option value="CSS">CSS</option>
                    <option value="HTML">HTML</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="JAVA">JAVA</option>
                    <option value="SQL">SQL</option>
                </select>
            </div>

            <div>
                <label className="block font-semibold">제목</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border rounded"/>
            </div>

            <div>
                <label className="block font-semibold">작성자</label>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} required className="w-full p-2 border rounded"/>
            </div>

            <div>
                <label className="block font-semibold">내용</label>
                <textarea rows={10} value={content} onChange={(e) => setContent(e.target.value)} required className="w-full h-40 p-2 border rounded" />
            </div>

            <button disabled={submitting} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                {submitting ? '제출 중...' : '작성하기'}
            </button>
        </form>
    );
}