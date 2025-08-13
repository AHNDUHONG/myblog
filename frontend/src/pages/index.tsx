import Link from "next/link";
import type { GetServerSideProps } from "next";
import { prisma } from "@/lib/prisma";
// (선택) 아이콘
import {
  FileText,
  FolderGit2,
  MessageCircle,
  Github,
  ArrowRight,
} from "lucide-react";

type LatestPost = {
  id: number;
  title: string;
  category: string;
  createdAt: string; // ISO
};

type HomeProps = {
  stats: { posts: number; inquiries: number };
  latest: LatestPost[];
};

export default function Home({ stats, latest }: HomeProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Hero */}
      <section className="relative p-8 overflow-hidden bg-white border shadow-sm rounded-2xl">
        {/* 배경 데코 */}
        <div className="absolute rounded-full pointer-events-none -right-24 -top-24 h-72 w-72 bg-gradient-to-tr from-sky-400/20 to-indigo-500/20 blur-3xl" />
        <div className="absolute rounded-full pointer-events-none -left-24 -bottom-24 h-72 w-72 bg-gradient-to-tr from-purple-400/20 to-rose-500/20 blur-3xl" />

        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              <span className="text-transparent bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text">
                MyBlog
              </span>{" "}
              — 일상과 개발을 담다
            </h1>
            <p className="text-gray-600 max-w-prose">
              여행 후기부터 개발 일지까지. 기록이 쌓일수록 실력이 됩니다.
              아래에서 최신 글을 확인하거나 바로 글 목록으로 이동하세요.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/board"
                className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow bg-sky-600 hover:bg-sky-700"
              >
                게시판 보기 <ArrowRight size={18} />
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

      {/* 통계 */}
      <section className="grid gap-4 sm:grid-cols-2">
        <StatCard
          title="게시글"
          value={stats.posts.toLocaleString()}
          hint="최근 3개는 아래에 표시돼요"
          icon={<FileText className="w-5 h-5" />}
        />
        <StatCard
          title="문의"
          value={stats.inquiries.toLocaleString()}
          hint="관리자 페이지에서 확인"
          icon={<MessageCircle className="w-5 h-5" />}
        />
      </section>

      {/* 최신 글 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">🆕 최신 글</h2>
          <Link
            href="/board"
            className="text-sm text-sky-700 hover:underline"
          >
            전체 보기
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="text-gray-500">아직 게시글이 없습니다.</p>
        ) : (
          <ul className="grid gap-3">
            {latest.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/board/${p.id}`}
                  className="group block rounded-xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-sky-700">
                      {p.title}
                    </h3>
                    <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                      {p.category}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {p.createdAt.slice(0, 16).replace("T", " ")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 빠른 이동 */}
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <QuickLink
          href="/board"
          title="게시판"
          description="일상/개발 기록 모아보기"
          icon={<FileText className="w-5 h-5" />}
        />
        <QuickLink
          href="/project"
          title="프로젝트"
          description="진행 중/완료 프로젝트"
          icon={<FolderGit2 className="w-5 h-5" />}
        />
        <QuickLink
          href="/contact"
          title="문의하기"
          description="질문/제안은 언제든지"
          icon={<MessageCircle className="w-5 h-5" />}
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

function StatCard({
  title,
  value,
  hint,
  icon,
}: {
  title: string;
  value: string | number;
  hint?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-5 bg-white border shadow-sm rounded-2xl">
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="mt-1 text-2xl font-extrabold tracking-tight">
          {value}
        </div>
        {hint && <div className="mt-1 text-xs text-gray-500">{hint}</div>}
      </div>
      <div className="grid p-3 text-gray-700 place-content-center rounded-xl bg-gray-50">
        {icon}
      </div>
    </div>
  );
}

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

/* ---- SSR: 통계/최근글 불러오기 (hydration 안전) ---- */
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const [posts, inquiries] = await Promise.all([
    prisma.post.count(),
    prisma.contactMessage
      .count()
      .catch(() => 0), // contactMessage가 아직 없다면 0
  ]);

  const rows = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    select: { id: true, title: true, category: true, createdAt: true },
  });

  const latest: LatestPost[] = rows.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    createdAt: p.createdAt.toISOString(),
  }));

  return { props: { stats: { posts, inquiries }, latest } };
};
