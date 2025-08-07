import { useEffect, useState } from 'react';
import { ContactMessage } from './types';

const ContactItem = ({ msg }: { msg: ContactMessage }) => {
  const [localDate, setLocalDate] = useState('');

  useEffect(() => {
    if (msg.createdAt) {
      setLocalDate(
        new Date(msg.createdAt).toLocaleString('ko-KR', {
          dateStyle: 'short',
          timeStyle: 'short',
        })
      );
    }
  }, [msg.createdAt]);

  return (
    <li className="border p-4 rounded shadow-sm bg-white">
      <div className="flex justify-between items-center">
        <strong>{msg.name}</strong>
        <span className="text-sm text-gray-500">
          {localDate || '날짜 없음'}
        </span>
      </div>
      <p className="text-sm text-gray-600">{msg.email}</p>
      <p className="mt-2 text-gray-800 whitespace-pre-wrap">{msg.message}</p>
    </li>
  );
};

export default ContactItem;
