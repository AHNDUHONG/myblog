import { useRouter } from "next/router";
import { useState } from "react";

const BoardForm = () => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState<'Web Development' | 'Mobile Development' | 'UI/UX' | 'Design'>('Web Development');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newPost = {
            id: Date.now(),
            title,
            content,
            category,
            author: '관리자',
            createdAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD 형식
        };
        
        console.log('새 게시글:', newPost);
        alert('게시글이 작성되었습니다!');
        router.push('/board'); // 게시글 작성 후 목록 페이지로 이동
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block font-semibold">카테고리</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as 'Web Development' | 'Mobile Development' | 'UI/UX' | 'Design')}
                    className="border p-2 rounded w-full">
                        <option value="Web development">Web development</option>
                        <option value="Mobile development">Mobile development</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Design">Design</option>
                    </select>
            </div>

            <div>
                <label className="block font-semibold">제목</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="제목을 입력하세요"
                />
            </div>

            <div>
                <label className="block font-semibold">내용</label>
                <textarea
                    required
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="내용을 입력하세요"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:big-blue-700"
            >
                작성하기
            </button>
        </form>
    );
};

export default BoardForm;