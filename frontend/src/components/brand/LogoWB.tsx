"use client";

import Link from "next/link";
import { useId } from "react";

type Props = {
  size?: number;          // 마크(정사각) 픽셀
  onDark?: boolean;       // 다크 배경 위에서 사용할 때
  className?: string;
};
@ 
export default function LogoWB({ size = 28, onDark = false, className }: Props) {
  const gid = useId(); // 그라데이션 id 충돌 방지

  return (
    <Link href="/" aria-label="Winters Blog" className={["flex items-center gap-3", className].filter(Boolean).join(" ")}>
      <MarkWB size={size} onDark={onDark} gid={gid} />
      {/* ⬇️ md 이상에서만 워드마크 노출 (sm에선 모노그램만) */}
      <span className="items-center hidden gap-2 md:flex">
        <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Winters&nbsp;Blog
        </span>
        {/* 얇은 골드 라인으로 포인트 */}
        <span
          aria-hidden
          className="h-[3px] w-16 rounded-full"
          style={{
            background: "linear-gradient(90deg,#f0d37a 0%, #d4a93a 100%)",
          }}
        />
      </span>
    </Link>
  );
}

/** 골드 톤 모노그램 마크 (WB) */
function MarkWB({ size, onDark, gid }: { size: number; onDark: boolean; gid: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="WB"
      className="shrink-0"
    >
      <defs>
        {/* 은은한 골드 그라데이션 */}
        <linearGradient id={`gold-${gid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0d37a" />
          <stop offset="100%" stopColor="#d4a93a" />
        </linearGradient>
      </defs>

      {/* 바탕 */}
      <rect
        x="2" y="2" width="60" height="60" rx="14"
        fill={onDark ? "rgba(255,255,255,0.04)" : "#ffffff"}
      />
      {/* 테두리 */}
      <rect
        x="2" y="2" width="60" height="60" rx="14"
        fill="none" stroke={`url(#gold-${gid})`} strokeWidth="2.5"
      />

      {/* 모노그램: WB (세리프 계열로 고급 톤) */}
      <text
        x="50%" y="56%" textAnchor="middle"
        fontSize="28" fontWeight={700}
        fontFamily="ui-serif, Georgia, Times New Roman, serif"
        letterSpacing="-0.5"
        fill={`url(#gold-${gid})`}
      >
        WB
      </text>
    </svg>
  );
}
