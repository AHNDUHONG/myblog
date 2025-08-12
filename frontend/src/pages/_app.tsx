import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css'; // Tailwind CSS 적용
import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {

  return (
    // NextAuth 세션을 전역에서 쓰기 위해 Provider로 감싸기
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}