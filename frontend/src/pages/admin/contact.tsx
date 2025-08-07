import ContactList from "@/features/contact/ContactList"
import { mockMessages } from "@/features/contact/mockData";
import router from "next/router";
import { useEffect } from "react";


const AdminContactPage = () => {
    const isAdmin = true;

    useEffect(() => {
        if (!isAdmin) {
            alert("관리자만 접근할 수 있습니다.");
            router.push('/');
        }
    }, []);
    
    return (
        <div className="space-y-6 max-w-3xl">
            <h1 className="text-2xl font-bold">문의 목록</h1>
            <ContactList messages={mockMessages} />
        </div>
    );
};

export default AdminContactPage;