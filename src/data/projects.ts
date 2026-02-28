export interface Project {
  title: string;
  description: string;
  technologies: string[];
  status: 'active' | 'completed' | 'in-progress';
  links: {
    github?: string;
    demo?: string;
    article?: string;
  };
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: 'AI Content Factory',
    description:
      'Pipeline tạo nội dung đa nền tảng sử dụng ComfyUI, tích hợp chatbot AI trên Zalo OA để tự động phân phối và tương tác với người dùng.',
    technologies: ['ComfyUI', 'Python', 'Zalo OA API', 'LLM', 'Stable Diffusion'],
    status: 'active',
    links: { github: 'https://github.com/hungng', article: '/posts/ai-content-factory' },
    featured: true,
  },
  {
    title: 'Badminton Score App',
    description:
      'Ứng dụng tính điểm cầu lông bằng nhận diện giọng nói, hỗ trợ điều khiển hoàn toàn bằng voice cho trải nghiệm tay không chạm màn hình.',
    technologies: ['Flutter', 'Dart', 'Voice Recognition', 'WebSocket'],
    status: 'in-progress',
    links: { github: 'https://github.com/hungng' },
    featured: true,
  },
  {
    title: 'FNMS CI/CD Pipeline',
    description:
      'Tự động hóa toàn bộ quy trình build, test và deployment cho Fixed Network Management System tại Nokia với Jenkins và Docker.',
    technologies: ['Jenkins', 'Docker', 'Java', 'Shell Script', 'SonarQube'],
    status: 'completed',
    links: {},
    featured: false,
  },
  {
    title: 'Test Failure Predictor',
    description:
      'Mô hình XGBoost dự đoán test case nào có khả năng thất bại trước khi chạy full regression, giảm thời gian CI xuống 40%.',
    technologies: ['Python', 'XGBoost', 'pandas', 'scikit-learn', 'Java'],
    status: 'completed',
    links: {},
    featured: false,
  },
];
