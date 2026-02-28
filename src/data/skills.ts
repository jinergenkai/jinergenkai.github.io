export interface Skill {
  name: string;
  level: 'expert' | 'advanced' | 'intermediate';
  category: 'backend' | 'devops' | 'ai-ml' | 'frontend' | 'tools';
}

export const skills: Skill[] = [
  // Backend
  { name: 'Java', level: 'expert', category: 'backend' },
  { name: 'Spring Boot', level: 'expert', category: 'backend' },
  { name: 'NETCONF/YANG', level: 'advanced', category: 'backend' },
  { name: 'REST API', level: 'expert', category: 'backend' },
  { name: 'C#/.NET', level: 'advanced', category: 'backend' },
  { name: 'PostgreSQL', level: 'advanced', category: 'backend' },
  // DevOps
  { name: 'Docker', level: 'advanced', category: 'devops' },
  { name: 'Jenkins', level: 'advanced', category: 'devops' },
  { name: 'CI/CD', level: 'expert', category: 'devops' },
  { name: 'Linux', level: 'advanced', category: 'devops' },
  { name: 'Kubernetes', level: 'intermediate', category: 'devops' },
  // AI/ML
  { name: 'ComfyUI', level: 'advanced', category: 'ai-ml' },
  { name: 'XGBoost', level: 'intermediate', category: 'ai-ml' },
  { name: 'Local LLM', level: 'advanced', category: 'ai-ml' },
  { name: 'Prompt Engineering', level: 'advanced', category: 'ai-ml' },
  // Frontend
  { name: 'Flutter', level: 'intermediate', category: 'frontend' },
  { name: 'Astro', level: 'intermediate', category: 'frontend' },
  // Tools
  { name: 'Git', level: 'expert', category: 'tools' },
  { name: 'Obsidian', level: 'advanced', category: 'tools' },
];

export const categoryLabels: Record<Skill['category'], string> = {
  backend: 'Backend',
  devops: 'DevOps',
  'ai-ml': 'AI / ML',
  frontend: 'Frontend',
  tools: 'Tools',
};
