import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import '@/styles/globals.css'; // Tailwind CSS 적용

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
