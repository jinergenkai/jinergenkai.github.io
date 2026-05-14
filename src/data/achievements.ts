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
    title: 'Học sinh giỏi Quốc gia môn Tin học',
    organization: 'Bộ Giáo dục & Đào tạo',
    year: '2020',
    description: 'Giải Khuyến khích kỳ thi Học sinh giỏi Quốc gia - vòng thi thuật toán và lập trình thi đấu quy mô toàn quốc.',
    category: 'competitive-programming',
    icon: '🏆',
  },
  {
    title: 'Học sinh chuyên Tin - THPT Nguyễn Du',
    organization: 'THPT Chuyên Nguyễn Du, Đắk Lắk',
    year: '2017 – 2020',
    description: '3 năm liên tiếp Giải Nhất tỉnh Tin học. Huy chương Vàng & Bạc Tin học 30/4.',
    category: 'education',
    icon: '🎓',
  },
  {
    title: 'Kỹ sư Phần mềm - Đại học FPT',
    organization: 'FPT University',
    year: '2020 – 2024',
    description: 'Cử nhân Công nghệ Phần mềm, học bổng toàn phần 100% suốt 4 năm.',
    category: 'education',
    icon: '🎓',
  },
  {
    title: 'ACM-ICPC Vietnam National - Giải Ba',
    organization: 'ICPC',
    year: '2021 – 2023',
    description: 'Giải Ba ICPC Vietnam National - kỳ thi lập trình thuật toán đồng đội lớn nhất khu vực.',
    category: 'competitive-programming',
    icon: '🏆',
  },
  {
    title: 'Meta Hacker Cup - Top 12% toàn cầu',
    organization: 'Meta',
    year: '2024',
    description: 'Lọt Round 2 cuộc thi lập trình thuật toán cá nhân của Meta - top 12% trong hàng chục nghìn lập trình viên toàn cầu.',
    category: 'competitive-programming',
    icon: '🥇',
  },
  // MBA for later, dont delete it.
   // {
  //   title: 'MBA - Đại học Kinh tế TP.HCM',
  //   organization: 'UEH',
  //   year: '2025 – Hiện tại',
  //   description: 'Thạc sĩ Quản trị Kinh doanh - networking và định hướng leadership.',
  //   category: 'education',
  //   icon: '🎓',
  // },
];