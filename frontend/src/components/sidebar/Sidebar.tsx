"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";


export default function Sidebar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // 마운트 플래그 (SSR과 최초 CSR을 동일하게)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const role = (session?.user as { role?: string } | undefined)?.role; // 관리자 여부

  // 현재 경로에 따라 스타일 분기
  const isActive = (href: string) =>
    router.pathname === href ||
    (href !== "/" && router.pathname.startsWith(href));

  // 메뉴 정의(추후 확장 편하게)
  const menus = useMemo(
    () => [
      { href: "/", label: "홈" },
      { href: "/board", label: "게시판" },
      { href: "/project", label: "프로젝트" },
      { href: "/contact", label: "문의" }, // 기존 "소개" → 실제 경로가 contact(문의)이면 라벨 통일
    ],
    []
  );

  if (!mounted) {
    return <aside className="w-56 p-4 bg-gray-100 border-r" />
  }

  return (
    <aside className="w-56 p-4 bg-gray-100 border-r">
      <Link href="/" className="font-bold">MyBlog</Link>

      {/* 기본 메뉴 */}
      <nav className="flex flex-col space-y-1">
        {menus.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            aria-current={isActive(m.href) ? "page" : undefined}
            className={[
              "px-2 py-1 rounded transition-colors",
              isActive(m.href)
                ? "bg-white text-blue-700 font-semibold shadow-sm"
                : "hover:bg-white/70",
            ].join(" ")}
          >
            {m.label}
          </Link>
        ))}

        {/* 외부 링크 */}
        <a
          href="https://github.com/AHNDUHONG"
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-1 rounded hover:bg-white/70"
        >
          GitHub
        </a>
      </nav>

      <div className="h-px my-2 bg-gray-300" />

      {/* 관리자 전용 메뉴 */}
        {role === "ADMIN" && (
            <div className="space-y-1">
                <div className="text-xs tracking-wider text-gray-500 uppercase">관리자</div>
                <Link
                    href="/admin/board"
                    className={[
                    "px-2 py-1 rounded transition-colors",
                    isActive("/admin/board")
                        ? "bg-white text-blue-700 font-semibold shadow-sm"
                        : "hover:bg-white/70",
                    ].join(" ")}
                >
                    글쓰기
                </Link>
                <Link
                    href="/admin/contact"
                    className={[
                    "px-2 py-1 rounded transition-colors",
                    isActive("/admin/contact")
                        ? "bg-white text-blue-700 font-semibold shadow-sm"
                        : "hover:bg-white/70",
                    ].join(" ")}
                >
                    문의 확인
                </Link>
            </div>
        )}

        <div className="h-px my-2 bg-gray-300" />

        {/* 로그인 / 로그아웃 */}
        <div className="space-y-2">
            {status === "loading" && (
                <button
                    className="w-full px-3 py-2 border rounded cursor-default opacity-60"
                    disabled
                >
                    로딩 중...
                </button>
            )}

            {status === "unauthenticated" && (
                <button
                    className="w-full px-3 py-2 border rounded hover:bg-white/70"
                    onClick={() => signIn(undefined, { callbackUrl: router.asPath })} // 현재 페이지 유지
                >
                    로그인
                </button>
            )}

            {status === "authenticated" && (
                <div className="flex items-center justify-between gap-2">
                    <div className="text-sm truncate">
                        <div className="font-semibold truncate max-w-[8rem]">
                            {session.user?.name || session.user?.email}
                        </div>
                        <div className="text-gray-500">{role || "USER"}</div>
                    </div>
                    <button
                        className="px-3 py-2 border rounded hover:bg-white/70"
                        onClick={() => signOut({ callbackUrl: "/" })} // 로그아웃 후 홈으로
                    >
                      로그아웃
                    </button>
                </div>
            )}
        </div>
    </aside>
  );
}
