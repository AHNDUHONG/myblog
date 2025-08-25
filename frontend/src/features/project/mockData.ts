// types.ts
export interface Project {
  id: number;
  name: string;
  description: string; // Markdown 형식
  techStack: string[];
  features: string[];
  github?: string;
  demo?: string;
}

// mockData.ts
import { Project } from "./types";

const blogDescription = `
# 개인 블로그 & 포트폴리오

## 프로젝트 개요
Next.js와 React 기반의 개인 블로그이자 포트폴리오 웹사이트입니다.  
관리자 기능을 포함한 풀스택 웹 애플리케이션으로, 블로그 포스팅, 프로젝트 소개,  
연락처 관리 등의 기능을 제공합니다.

## 주요 기능
- **블로그 시스템**: 카테고리별 포스트 CRUD
- **관리자 패널**: 사용자 인증 및 권한 관리 (ADMIN/USER)
- **연락처 시스템**: 방문자 메시지 및 이메일 알림
- **반응형 디자인**: 모바일/데스크톱 지원
- **SEO 최적화**: Next.js의 SSR/SSG 활용

## 기술적 특징
- **데이터베이스**: MySQL + Prisma ORM
- **인증 시스템**: NextAuth.js 기반 보안 인증
- **UI 컴포넌트**: Radix UI + Tailwind CSS
- **타입 안전성**: TypeScript
- **이메일 서비스**: Nodemailer
`;

export const projects: Project[] = [
  {
    id: 1,
    name: "개인 블로그 & 포트폴리오",
    description: blogDescription.trim(),
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Prisma ORM",
      "MySQL",
      "NextAuth.js",
      "Radix UI",
      "Nodemailer",
    ],
    features: [
      "블로그 포스트 CRUD",
      "사용자 인증 및 권한 관리",
      "연락처 메시지 시스템",
      "이메일 알림 서비스",
      "반응형 웹 디자인",
      "관리자 대시보드",
    ],
    github: "https://github.com/AHNDUHONG",
  },
];
