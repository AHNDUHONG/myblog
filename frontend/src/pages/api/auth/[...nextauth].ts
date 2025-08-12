import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),     // DB에 유지 보관 (세션은 JWT 전략 사용)
    session: { strategy: 'jwt'},
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({ where: { email: credentials.email } })
                if (!user) return null;

                const ok = await bcrypt.compare(credentials.password, user.password);
                if (!ok) return null;

                // 반환 객체가 JWT의 payload로 들어감
                return { id: String(user.id), email: user.email, name: user.name, role: user.role };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // 로그인 시 user 정보가 들어오니 토큰에 role을 붙여둔다
            if (user) token.role = (user as any).role;
            return token;
        },
        async session({ session, token }) {
            // 클라이언트에서 사용하기 쉽게 role 세팅
            if (session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin', // 커스텀 로그인 페이지
    },

};

export default NextAuth(authOptions);