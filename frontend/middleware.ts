import withAuth from "next-auth/middleware";


// 이 미들웨어는 요청이 들어올 때마다 실행되며, 아래 matchers에 해당하는 경로에 대해 인증/인가를 검사한다.
export default withAuth({
    // 로그인 페이지 경로 지정 (미인증 시 여기로 리다이렉트)
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        /**
         * authorized 콜백에서 true/false를 반환해 접근 허용/차단
         * token은 NextAuth의 JWT(payload)이며, 우리는 거기에 role을 넣어놨음.
         */
        authorized: ({ token, req }) => {
            const { pathname } = req.nextUrl;

            // /admin/** 는 관리자만
            if (pathname.startsWith("/admin")) {
                return token?.role === "ADMIN";
            }

            if (pathname.startsWith("/api/admin")) {
                return token?.role === "ADMIN";
            }

            return true;
        }
    },
});

// matcher: 미들웨어를 실행할 경로 목록, 여기 지정된 경로에 대해서만 위 authorized 콜백이 실행됨

export const config = {
    matcher: [
        "/admin/:path*",
        "/api/admin/:path*",
    ],
};