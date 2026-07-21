export interface Skill {
  name: string;
  level: 'expert' | 'advanced' | 'intermediate';
  category: 'core' | 'infra' | 'data' | 'ai' | 'languages';
}

export const skills: Skill[] = [
  // Core / Backend
  { name: 'Java', level: 'expert', category: 'core' },
  { name: 'Spring Boot', level: 'expert', category: 'core' },
  { name: 'Kafka', level: 'expert', category: 'core' },
  { name: 'Microservices', level: 'expert', category: 'core' },
  { name: 'Distributed Systems', level: 'expert', category: 'core' },
  { name: 'REST API', level: 'advanced', category: 'core' },
  { name: 'NETCONF/YANG', level: 'advanced', category: 'core' },
  // Infrastructure
  { name: 'Kubernetes', level: 'advanced', category: 'infra' },
  { name: 'Helm', level: 'advanced', category: 'infra' },
  { name: 'Docker', level: 'advanced', category: 'infra' },
  { name: 'Jenkins CI/CD', level: 'advanced', category: 'infra' },
  { name: 'Prometheus', level: 'advanced', category: 'infra' },
  { name: 'Grafana', level: 'advanced', category: 'infra' },
  { name: 'Linux', level: 'advanced', category: 'infra' },
  // Data
  { name: 'PostgreSQL', level: 'advanced', category: 'data' },
  { name: 'MariaDB', level: 'advanced', category: 'data' },
  { name: 'Redis', level: 'advanced', category: 'data' },
  { name: 'Elasticsearch', level: 'advanced', category: 'data' },
  // AI Integration
  { name: 'FastAPI', level: 'advanced', category: 'ai' },
  { name: 'OpenAI API', level: 'advanced', category: 'ai' },
  { name: 'RAG', level: 'intermediate', category: 'ai' },
  { name: 'On-premise GPU Inference', level: 'intermediate', category: 'ai' },
  // Languages
  { name: 'Python', level: 'advanced', category: 'languages' },
  { name: 'Go', level: 'advanced', category: 'languages' },
  { name: 'TypeScript / React', level: 'intermediate', category: 'languages' },
  { name: 'Dart / Flutter', level: 'intermediate', category: 'languages' },
];

export const categoryLabels: Record<Skill['category'], string> = {
  core: 'Core / Backend',
  infra: 'Infrastructure',
  data: 'Data',
  ai: 'AI Integration',
  languages: 'Languages',
};
