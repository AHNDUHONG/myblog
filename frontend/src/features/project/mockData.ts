export interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: '블로그 프로젝트',
    description: 'Next.js와 React를 기반으로 한 개인 블로그입니다.',
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    github: 'https://github.com/AHNDUHONG',
  },
  {
    id: 2,
    name: 'ToDo List App',
    description: '할 일을 관리할 수 있는 간단한 앱입니다.',
    techStack: ['React', 'TypeScript', 'Vite'],
    github: 'https://github.com/AHNDUHONG',
    demo: 'https://todo-app.vercel.app',
  },
];
