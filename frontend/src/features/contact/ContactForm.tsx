import { useState } from "react";

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 임시 저장용
        const contactData = {
            name,
            email,
            message,
            createdAt: new Date().toISOString(),
        };

        console.log('문의 내용:', contactData);

        // 폼 초기화 및 완료 표시
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
    };

    if (submitted) {
        return <p className="text-green-600">문의가 성공적으로 전송되었습니다. 감사합니다!</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <div>
                <label className="block font-semibold">이름</label>
                <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            <div>
                <label className="block font-semibold">이메일</label>
                <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            <div>
                <label className="block font-semibold">문의 내용</label>
                <textarea 
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="문의 내용을 입력하세요"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    보내기
            </button>
        </form>
    );
};

export default ContactForm;