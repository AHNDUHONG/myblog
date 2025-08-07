import ContactItem from "./ContactItem";
import { ContactMessage } from "./types";

interface Props {
    messages: ContactMessage[];
}

const ContactList = ({ messages }: Props) => {

    if (messages.length === 0) {
        return <p className="text-gray-500">아직 문의가 없습니다.</p>;
    }

    return (
            <ul className="space-y-4">
      {messages.map((msg, idx) => (
        <ContactItem key={idx} msg={msg} />
      ))}
    </ul>
  );
};

export default ContactList;