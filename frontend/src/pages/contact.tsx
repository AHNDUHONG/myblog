import ContactForm from "@/features/contact/ContactForm"

const ContactPage = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">문의하기</h1>
            <p className="text-gray-600">
                궁금한 점이나 제안사항이 있으시면 아래 폼을 통해 연락주세요.
            </p>
            <ContactForm />
        </div>
    );
};

export default ContactPage;