import Link from "next/link";
import { ArrowRight, BookOpen, Bot, ClipboardPen, Frame, Github, MessageCircleMore, SquareUserRound } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col space-y-10">
      {/* Hero */}
      <section className="relative p-8 overflow-hidden bg-white border shadow-sm rounded-2xl">
        {/* 배경 데코 */}
        <div className="absolute rounded-full pointer-events-none -right-24 -top-24 h-72 w-72 bg-gradient-to-tr from-sky-400/20 to-indigo-500/20 blur-3xl" />
        <div className="absolute rounded-full pointer-events-none -left-24 -bottom-24 h-72 w-72 bg-gradient-to-tr from-purple-400/20 to-rose-500/20 blur-3xl" />

        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              <span className="text-transparent bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text">
                Winters Blog
              </span>{" "}
              — 일상과 개발을 담다
            </h1>
            <p className="text-gray-600 max-w-prose">
              여행 후기부터 개발 일지까지. 기록이 쌓일수록 실력이 됩니다.
              아래에서 블로그를 둘러보거나 바로 글 목록으로 이동하세요.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/board"
                className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow bg-sky-600 hover:bg-sky-700"
              >
                블로그 보기 <ArrowRight size={18} />
              </Link>
              <Link
                href="/project"
                className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
              >
                프로젝트
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-50"
              >
                문의하기
              </Link>
            </div>
          </div>

          {/* 로고/엠블럼 느낌의 배지 */}
          <div className="shrink-0">
            <div className="grid place-content-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 p-[2px] shadow-md">
              <div className="flex items-center justify-center bg-white h-28 w-28 rounded-2xl">
                <span className="text-xl font-extrabold tracking-tight text-sky-600">
                  BLOG
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 빠른 이동 */}
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <QuickLink
          href="/board"
          title="Board"
          description="일상/개발 기록 모아보기"
          icon={<ClipboardPen className="w-5 h-5" />}
        />
        <QuickLink
          href="/project"
          title="About Me"
          description="진행 중/완료 프로젝트"
          icon={<SquareUserRound className="w-5 h-5" />}
        />
        <QuickLink
          href="/contact"
          title="Contact"
          description="질문/제안은 언제든지"
          icon={<MessageCircleMore className="w-5 h-5" />}
        />
        <QuickLink
          href="https://github.com/AHNDUHONG"
          title="GitHub"
          description="코드와 이력 확인"
          icon={<Github className="w-5 h-5" />}
          external
        />
      </section>
    </div>
  );
}

/* ---- 작은 컴포넌트들 ---- */

function QuickLink({
  href,
  title,
  description,
  icon,
  external,
}: {
  href: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  external?: boolean;
}) {
  const body = (
    <div className="group flex h-full flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
      <div className="flex items-center gap-3">
        <div className="grid p-2 text-gray-700 rounded-lg place-content-center bg-gray-50">
          {icon}
        </div>
        <h3 className="text-base font-semibold group-hover:text-sky-700">
          {title}
        </h3>
      </div>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {body}
      </a>
    );
  }
  return <Link href={href}>{body}</Link>;
}
