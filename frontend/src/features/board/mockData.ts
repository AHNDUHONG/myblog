export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    category: 'Web Development' | 'Mobile Development' | 'UI/UX' | 'Design';
}

export const mockPosts: Post[] = [
  {
    id: 1,
    title: '제주도 여행 후기',
    content: '너무 좋았어요!',
    author: '관리자',
    createdAt: '2025-08-06',
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Next.js로 블로그 만들기',
    content: '초기 셋업부터 배포까지 정리했습니다.',
    author: '관리자',
    createdAt: '2025-08-07',
    category: 'Mobile Development',
  },
];