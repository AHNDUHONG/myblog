import { GetServerSideProps } from "next";
import { getCsrfToken, signIn } from "next-auth/react";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
    return (
        <div className="max-w-sm mx-auto space-y-4">
            <h1 className="text-2xl font-bold">관리자 로그인</h1>
            <form 
                method="post"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget as HTMLFormElement;
                    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

                    const res = await signIn('credentials', { email, password, redirect: true, callbackUrl: '/admin/board' });
                    // NextAuth가 redirect 처리함
                }}
                className="space-y-3"
            >
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <input name="email" type="email" placeholder="이메일" className="w-full px-3 py-2 border rounded" />
                <input name="password" type="password" placeholder="비밀번호" className="w-full px-3 py-2 border rounded" />
                <button className="w-full px-4 py-2 text-white bg-blue-600 rounded">로그인</button>
            </form>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const csrfToken = await getCsrfToken(ctx);
  return { props: { csrfToken: csrfToken ?? '' } };
};