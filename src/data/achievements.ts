export interface Achievement {
  title: string;
  organization: string;
  year: string;
  description: string;
  category: 'competitive-programming' | 'education' | 'professional';
  icon: string;
}

export const achievements: Achievement[] = [
  {
    title: 'ICPC Asia Regional — Huy chương',
    organization: 'ICPC',
    year: '2019 – 2021',
    description: 'Đạt nhiều huy chương trong các kỳ thi ACM-ICPC Asia Regional.',
    category: 'competitive-programming',
    icon: '🏆',
  },
  {
    title: 'Meta Hacker Cup — Top 12% toàn cầu',
    organization: 'Meta',
    year: '2024',
    description: 'Vượt qua Round 2, xếp top 12% trong số hàng chục nghìn thí sinh trên thế giới.',
    category: 'competitive-programming',
    icon: '🥇',
  },
  {
    title: 'MBA — Đại học Kinh tế TP.HCM',
    organization: 'UEH',
    year: '2025 – Hiện tại',
    description: 'Thạc sĩ Quản trị Kinh doanh — networking và định hướng leadership.',
    category: 'education',
    icon: '🎓',
  },
  {
    title: 'Kỹ sư Phần mềm — Đại học FPT',
    organization: 'FPT University',
    year: '2018 – 2022',
    description: 'Cử nhân Kỹ thuật Phần mềm, chuyên ngành Trí tuệ Nhân tạo.',
    category: 'education',
    icon: '🎓',
  },
];
