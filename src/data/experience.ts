export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  highlights: string[];
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    company: 'Nokia',
    role: 'Senior Backend Engineer',
    period: '2024 - Hiện tại',
    location: 'TP. Hồ Chí Minh',
    description: 'Fixed Network Management System (FNMS) — phần mềm quản lý mạng viễn thông doanh nghiệp.',
    technologies: ['Java', 'Spring Boot', 'NETCONF/YANG', 'Jenkins', 'Docker'],
    highlights: [
      'Dẫn dắt thiết kế API và ra quyết định về kiến trúc hệ thống',
      'Mentor junior developers về các best practices trong enterprise development',
      'Quản lý CI/CD pipeline và tự động hóa quy trình nâng cấp thiết bị',
      'Triển khai mô hình XGBoost để dự đoán lỗi trong bộ test',
    ],
    current: true,
  },
  {
    company: 'FPT Software',
    role: 'Backend Engineer',
    period: '2022 - 2024',
    location: 'TP. Hồ Chí Minh',
    description: 'Phát triển các hệ thống backend cho khách hàng doanh nghiệp trong và ngoài nước.',
    technologies: ['Java', 'Spring Boot', 'C#', '.NET', 'MySQL', 'Redis'],
    highlights: [
      'Phát triển và maintain các REST API cho hệ thống quản lý nội bộ',
      'Tối ưu hiệu năng database, giảm thời gian query trung bình 60%',
      'Tham gia thiết kế microservices architecture cho dự án mới',
    ],
    current: false,
  },
];
