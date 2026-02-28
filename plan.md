# HUNG'S PORTFOLIO-BLOG: Complete Implementation Plan

## 🎯 PROJECT OVERVIEW

**Goal:** Build a personal portfolio + blog website using Astro (Devosfera theme base) that:
- Showcases all aspects of Hung's career & life
- Publishes articles written in Obsidian
- Deploys automatically via GitHub Pages (free)
- Has world-class minimalist cyberpunk UI

**Live URL:** `https://<username>.github.io` (later: custom domain)

---

## 📁 REPO STRATEGY: Solving the Obsidian + Code Problem

### The Problem
- Obsidian vault is a private repo with nested personal notes
- Astro code in same folder = Obsidian shows `.astro`, `node_modules`, etc.
- GitHub Pages free tier requires PUBLIC repo

### The Solution: 2-Repo Approach (Simplest for this case)

```
REPO 1: obsidian-vault (PRIVATE) ← existing repo, unchanged
├── .obsidian/
├── daily-notes/
├── personal/
├── article/           ← blog posts written here
│   ├── my-first-post.md
│   ├── java-spring-tips.md
│   └── images/
├── projects/          ← project descriptions
└── ... (all your other notes)

REPO 2: hungng-blog (PUBLIC) ← new repo, the Astro website
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── components/
│   │   ├── sections/      # Portfolio homepage sections
│   │   │   ├── Hero.astro
│   │   │   ├── About.astro
│   │   │   ├── Skills.astro
│   │   │   ├── Experience.astro
│   │   │   ├── Projects.astro
│   │   │   ├── Achievements.astro
│   │   │   ├── Business.astro
│   │   │   ├── BlogPreview.astro
│   │   │   └── Contact.astro
│   │   ├── blog/          # Blog-specific components
│   │   │   ├── PostCard.astro
│   │   │   ├── TagBadge.astro
│   │   │   └── TableOfContents.astro
│   │   └── ui/            # Shared UI primitives
│   │       ├── CursorGlow.astro
│   │       ├── GlassCard.astro
│   │       ├── ThemeToggle.astro
│   │       └── CommandPalette.astro
│   ├── content/
│   │   └── blog/          ← articles copied/synced from vault
│   │       ├── my-first-post.md
│   │       ├── java-spring-tips.md
│   │       └── images/
│   ├── data/              # Static data for portfolio sections
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   └── achievements.ts
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── BlogPostLayout.astro
│   │   └── PortfolioLayout.astro
│   ├── pages/
│   │   ├── index.astro        # Homepage (portfolio + blog preview)
│   │   ├── about.astro        # Detailed about page
│   │   ├── blog/
│   │   │   ├── index.astro    # Blog listing
│   │   │   └── [...slug].astro
│   │   ├── tags/
│   │   │   └── [tag].astro
│   │   ├── projects/
│   │   │   └── index.astro
│   │   ├── archives.astro
│   │   └── search.astro
│   ├── styles/
│   │   ├── global.css         # Tailwind + custom properties
│   │   ├── aurora.css         # Aurora/glow effects
│   │   ├── glassmorphism.css  # Glass card styles
│   │   └── typography.css     # Blog post typography
│   ├── lib/
│   │   ├── content.ts         # getPublishedPosts() helper
│   │   ├── reading-time.ts
│   │   └── utils.ts
│   ├── config.ts              # Site configuration
│   └── constants.ts           # Social links, metadata
├── public/
│   ├── fonts/                 # Custom fonts (Wotfard, Cascadia Code)
│   ├── images/
│   │   ├── avatar.jpg
│   │   └── og-default.png
│   ├── CNAME                  # For future custom domain
│   └── .nojekyll              # Prevent GitHub Jekyll processing
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

### Publishing Workflow (Obsidian → Live Site)

```
Step 1: Write article in Obsidian (REPO 1: ./article/)
Step 2: When ready to publish, copy/move .md to REPO 2: src/content/blog/
Step 3: Add frontmatter if missing (or use Obsidian template)
Step 4: git add, commit, push to REPO 2
Step 5: GitHub Actions auto-builds → live on GitHub Pages
```

**Why 2 repos instead of monorepo?**
- Private vault stays 100% private (no risk of leaking notes)
- Website repo is public = GitHub Pages FREE
- No Obsidian showing code files
- Clean separation of concerns
- Later can switch to Vercel with the website repo (private or public)

**Automation option (later):** A simple shell script or Obsidian plugin
that syncs `./article/` → `REPO 2/src/content/blog/` automatically.

---

## 🛠 TECH STACK

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Astro | 5.x | Static site generation |
| **Base Theme** | Devosfera | latest | Blog engine, search, UI effects |
| **CSS** | Tailwind CSS | v4 | Utility-first styling |
| **Search** | Pagefind | latest | Full-text static search |
| **Code Highlight** | Shiki | built-in | Syntax highlighting |
| **TOC** | remark-toc | latest | Auto table of contents |
| **Math** | remark-math + rehype-katex | latest | LaTeX rendering |
| **Callouts** | rehype-callouts | latest | Obsidian-style callouts |
| **Mermaid** | rehype-mermaid or client-side | latest | Diagrams |
| **OG Images** | Satori | built-in | Dynamic social cards |
| **Icons** | Lucide or Phosphor | latest | UI icons |
| **Fonts** | Wotfard + Cascadia Code | - | Body + monospace |
| **Deploy** | GitHub Actions + Pages | - | Auto deploy on push |
| **Package Manager** | pnpm | latest | Fast, disk-efficient |

---

## 📄 CONTENT SCHEMA

### Blog Post Frontmatter (Obsidian Template)

```yaml
---
title: "Article Title"
pubDatetime: 2026-02-28T10:00:00Z
modDatetime: 2026-02-28T10:00:00Z
description: "Brief description for SEO and card preview"
tags:
  - java
  - spring-boot
  - backend
featured: false
draft: false
ogImage: "" # optional, auto-generated if empty
canonicalURL: "" # optional, for cross-posting
lang: "vi" # or "en" for bilingual support
---
```

### Content Collection Config (src/content.config.ts)

```typescript
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDatetime: z.date(),
    modDatetime: z.date().optional(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
    lang: z.enum(['vi', 'en']).default('vi'),
  }),
});

export const collections = {
  blog: blogCollection,
};
```

---

## 🎨 DESIGN SPECIFICATION

### Visual Identity (Devosfera-based, customized)

**Color System:**
```css
/* Dark Mode (Primary) */
--bg-primary: #0a0a0f;       /* Deep dark navy-black */
--bg-secondary: #12121a;     /* Card backgrounds */
--bg-glass: rgba(18, 18, 26, 0.7); /* Glassmorphism */
--text-primary: #e4e4e7;     /* Light gray text */
--text-secondary: #a1a1aa;   /* Muted text */
--accent-primary: #00ff88;   /* Neon green (terminal feel) */
--accent-secondary: #00ccff; /* Cyan glow */
--accent-hover: #ff6b35;     /* Warm orange for hover states */
--border-glow: rgba(0, 255, 136, 0.15); /* Subtle green glow */

/* Light Mode */
--bg-primary: #fafaf9;
--bg-secondary: #ffffff;
--text-primary: #1c1917;
--text-secondary: #57534e;
--accent-primary: #059669;   /* Emerald */
--accent-secondary: #0891b2; /* Teal */
```

**Typography:**
- Headings: Wotfard (or fallback: Satoshi, General Sans)
- Body: Wotfard Regular
- Code: Cascadia Code (or JetBrains Mono)
- Vietnamese support: Ensure font supports Vietnamese diacritics

**Effects (from Devosfera):**
- Cursor-following radial glow on dark mode
- Glassmorphism cards with backdrop-blur
- Animated CSS grid lines in background
- Aurora gradient effects on hero section
- Noise texture overlay for depth
- Smooth page transitions (View Transitions API)

### Homepage Sections Layout

```
┌─────────────────────────────────────────────┐
│  NAVIGATION BAR                              │
│  [Logo/Name] [Blog] [Projects] [About] [🔍] │
├─────────────────────────────────────────────┤
│                                              │
│  ╔═══════════════════════════════════════╗   │
│  ║  HERO SECTION                         ║   │
│  ║                                       ║   │
│  ║  Nguyễn Hưng                         ║   │
│  ║  Senior Backend Engineer              ║   │
│  ║  @ Nokia FNMS | Ho Chi Minh City     ║   │
│  ║                                       ║   │
│  ║  "Building systems that scale,        ║   │
│  ║   teaching what I learn"              ║   │
│  ║                                       ║   │
│  ║  [GitHub] [LinkedIn] [Email] [Blog]   ║   │
│  ╚═══════════════════════════════════════╝   │
│                                              │
│  ┌─ ABOUT ─────────────────────────────┐    │
│  │ Brief bio, career philosophy,        │    │
│  │ "Technical Leader who teaches"       │    │
│  │ FPT University → Nokia → Future      │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ┌─ TECHNICAL SKILLS ──────────────────┐    │
│  │ ┌──────┐ ┌──────┐ ┌──────┐        │    │
│  │ │ Java │ │Spring│ │Docker│ ...     │    │
│  │ │ Boot │ │ Boot │ │      │         │    │
│  │ └──────┘ └──────┘ └──────┘        │    │
│  │ Categories:                         │    │
│  │ Backend | DevOps | AI/ML | Frontend │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ┌─ EXPERIENCE ────────────────────────┐    │
│  │ ── 2024-now ── Nokia FNMS           │    │
│  │    Sr. Backend Engineer              │    │
│  │    NETCONF/YANG, CI/CD, Spring Boot  │    │
│  │                                      │    │
│  │ ── 2022-2024 ── Previous roles...   │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ┌─ PROJECTS ──────────────────────────┐    │
│  │ ┌─────────────┐ ┌─────────────┐    │    │
│  │ │ AI Content  │ │ Badminton   │    │    │
│  │ │ Factory     │ │ Score App   │    │    │
│  │ │ ComfyUI +   │ │ Flutter +   │    │    │
│  │ │ Multi-plat  │ │ Voice Ctrl  │    │    │
│  │ └─────────────┘ └─────────────┘    │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ┌─ ACHIEVEMENTS ──────────────────────┐    │
│  │ 🏆 ICPC Medals                      │    │
│  │ 🏆 Meta Hacker Cup - Top 12%       │    │
│  │ 🏆 MBA @ UEH (In Progress)         │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ┌─ LATEST ARTICLES ──────────────────┐    │
│  │ ┌──────┐ ┌──────┐ ┌──────┐       │    │
│  │ │Post 1│ │Post 2│ │Post 3│       │    │
│  │ └──────┘ └──────┘ └──────┘       │    │
│  │              [View All →]          │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ┌─ CONTACT & LINKS ──────────────────┐    │
│  │ GitHub | LinkedIn | Email | Zalo    │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  FOOTER: © 2026 Nguyễn Hưng               │
│  Built with Astro 🚀 | Source on GitHub     │
└─────────────────────────────────────────────┘
```

---

## 📊 DATA FILES (src/data/)

### skills.ts
```typescript
export interface Skill {
  name: string;
  icon: string; // lucide icon name or custom SVG
  level: 'expert' | 'advanced' | 'intermediate';
  category: 'backend' | 'devops' | 'ai-ml' | 'frontend' | 'tools';
}

export const skills: Skill[] = [
  // Backend
  { name: 'Java', icon: 'coffee', level: 'expert', category: 'backend' },
  { name: 'Spring Boot', icon: 'leaf', level: 'expert', category: 'backend' },
  { name: 'NETCONF/YANG', icon: 'network', level: 'advanced', category: 'backend' },
  { name: 'REST API Design', icon: 'globe', level: 'expert', category: 'backend' },
  { name: 'C#/.NET', icon: 'hash', level: 'advanced', category: 'backend' },
  // DevOps
  { name: 'Docker', icon: 'container', level: 'advanced', category: 'devops' },
  { name: 'Jenkins', icon: 'workflow', level: 'advanced', category: 'devops' },
  { name: 'CI/CD Pipelines', icon: 'git-branch', level: 'expert', category: 'devops' },
  { name: 'Linux/Ubuntu', icon: 'terminal', level: 'advanced', category: 'devops' },
  // AI/ML
  { name: 'ComfyUI', icon: 'brain', level: 'advanced', category: 'ai-ml' },
  { name: 'XGBoost', icon: 'bar-chart', level: 'intermediate', category: 'ai-ml' },
  { name: 'Local LLM Deploy', icon: 'cpu', level: 'advanced', category: 'ai-ml' },
  { name: 'Prompt Engineering', icon: 'message-square', level: 'advanced', category: 'ai-ml' },
  // Frontend
  { name: 'Flutter', icon: 'smartphone', level: 'intermediate', category: 'frontend' },
  { name: 'Astro', icon: 'rocket', level: 'intermediate', category: 'frontend' },
  // Tools
  { name: 'Git', icon: 'git-merge', level: 'expert', category: 'tools' },
  { name: 'Obsidian', icon: 'file-text', level: 'advanced', category: 'tools' },
];
```

### experience.ts
```typescript
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    company: 'Nokia',
    role: 'Senior Backend Engineer',
    period: '2024 - Present',
    location: 'Ho Chi Minh City',
    description: 'Fixed Network Management System (FNMS) - Enterprise telecom software',
    technologies: ['Java', 'Spring Boot', 'NETCONF/YANG', 'Jenkins', 'Docker'],
    highlights: [
      'Lead API documentation and system design decisions',
      'Mentor junior developers on enterprise development practices',
      'Own CI/CD pipeline management and device upgrade automation',
      'Implement XGBoost models for test failure prediction',
    ],
  },
  // ... previous roles
];
```

### projects.ts
```typescript
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
    description: 'Model-agnostic content generation pipeline using ComfyUI with multi-platform distribution and AI chatbot engagement',
    technologies: ['ComfyUI', 'Python', 'Zalo OA', 'LLM'],
    status: 'active',
    links: { github: '#', article: '/blog/ai-content-factory' },
    featured: true,
  },
  {
    title: 'Badminton Score App',
    description: 'Voice-controlled scoring app for badminton matches with real-time recognition',
    technologies: ['Flutter', 'Voice Recognition', 'Dart'],
    status: 'in-progress',
    links: { github: '#' },
    featured: true,
  },
  // ... more projects
];
```

### achievements.ts
```typescript
export interface Achievement {
  title: string;
  organization: string;
  year: string;
  description: string;
  category: 'competitive-programming' | 'education' | 'professional';
}

export const achievements: Achievement[] = [
  {
    title: 'ICPC Regional Medals',
    organization: 'ICPC',
    year: '2019-2021',
    description: 'Multiple medals in ACM-ICPC Asia Regional contests',
    category: 'competitive-programming',
  },
  {
    title: 'Meta Hacker Cup - Top 12% Globally',
    organization: 'Meta',
    year: '2024',
    description: 'Advanced to Round 2, placing in top 12% of global participants',
    category: 'competitive-programming',
  },
  {
    title: 'MBA - University of Economics HCMC',
    organization: 'UEH',
    year: '2025 - Present',
    description: 'Master of Business Administration for networking and business leadership',
    category: 'education',
  },
  {
    title: 'Software Engineering - FPT University',
    organization: 'FPT University',
    year: '2018 - 2022',
    description: 'Bachelor of Software Engineering',
    category: 'education',
  },
];
```

---

## ⚙️ CONFIGURATION FILES

### astro.config.mjs
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkToc from 'remark-toc';
import remarkCollapse from 'remark-collapse';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeCallouts from 'rehype-callouts';

export default defineConfig({
  site: 'https://<username>.github.io',
  // base: '/repo-name',  ← only if NOT using username.github.io
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [remarkCollapse, { test: 'Table of Contents' }],
      remarkMath,
    ],
    rehypePlugins: [
      rehypeKatex,
      [rehypeCallouts, { theme: 'obsidian' }],
    ],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'tokyo-night',
      },
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js'],
    },
  },
});
```

### package.json (key dependencies)
```json
{
  "name": "hung-portfolio-blog",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build && pagefind --site dist",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/mdx": "^4.x",
    "@astrojs/sitemap": "^4.x",
    "@astrojs/tailwind": "^6.x",
    "tailwindcss": "^4.x"
  },
  "devDependencies": {
    "pagefind": "^1.x",
    "remark-toc": "^9.x",
    "remark-collapse": "^0.x",
    "remark-math": "^6.x",
    "rehype-katex": "^7.x",
    "rehype-callouts": "^1.x",
    "sharp": "^0.33.x",
    "satori": "^0.x",
    "@resvg/resvg-js": "^2.x"
  }
}
```

### .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build Astro site
        run: pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🔄 OBSIDIAN ARTICLE TEMPLATE

Save this as a template in your Obsidian vault for consistent blog posts:

```markdown
---
title: "{{title}}"
pubDatetime: {{date}}T{{time}}:00.000+07:00
description: ""
tags: []
featured: false
draft: false
lang: "vi"
---

## Table of Contents

## Introduction

<!-- Write your article content here -->

## Conclusion

<!-- Summary and call to action -->
```

---

## 🚀 DEPLOYMENT STEPS (First Time Setup)

### Step 1: Create the website repo
```bash
# Clone Devosfera as starting point
git clone https://github.com/0xdres/astro-devosfera.git hung-portfolio-blog
cd hung-portfolio-blog

# Remove original git history, start fresh
rm -rf .git
git init
git add .
git commit -m "Initial commit: Devosfera base"

# Create public repo on GitHub, then:
git remote add origin https://github.com/<username>/hung-portfolio-blog.git
git branch -M main
git push -u origin main
```

### Step 2: Configure GitHub Pages
1. Go to repo Settings → Pages
2. Source: "GitHub Actions" (NOT "Deploy from branch")
3. Done — the workflow file handles everything

### Step 3: Update site config
- Edit `src/config.ts` with your info
- Edit `src/constants.ts` with your social links
- Replace `astro.config.mjs` site URL

### Step 4: Add your first article
1. Write article in Obsidian vault (`./article/my-post.md`)
2. Copy to website repo: `src/content/blog/my-post.md`
3. Ensure frontmatter is correct
4. `git add . && git commit -m "Add first post" && git push`
5. Wait ~2 min → live!

### Step 5 (Later): Automate sync
Create a simple script `sync-articles.sh`:
```bash
#!/bin/bash
# Sync published articles from Obsidian vault to website repo
VAULT_DIR="$HOME/path/to/obsidian-vault/article"
BLOG_DIR="$HOME/path/to/hung-portfolio-blog/src/content/blog"

# Copy all .md files (only published ones based on frontmatter)
rsync -av --include="*.md" --include="images/" --include="images/**" \
  --exclude="*" "$VAULT_DIR/" "$BLOG_DIR/"

echo "Articles synced! Don't forget to git push."
```

---

## 📋 PHASE PLAN

### Phase 1: Foundation (Week 1) ← START HERE
- [ ] Clone Devosfera, set up repo
- [ ] Configure GitHub Pages deployment
- [ ] Customize colors, fonts, site metadata
- [ ] Deploy bare Devosfera → verify it works live
- [ ] Add 1-2 test blog posts

### Phase 2: Portfolio Sections (Week 2)
- [ ] Build Hero section with bio
- [ ] Build Skills grid component
- [ ] Build Experience timeline
- [ ] Build Projects showcase
- [ ] Build Achievements section
- [ ] Compose homepage from sections

### Phase 3: Polish (Week 3)
- [ ] Cursor glow effects
- [ ] Glassmorphism cards
- [ ] Page transitions (View Transitions API)
- [ ] Mobile responsive fine-tuning
- [ ] OG image generation
- [ ] RSS feed setup

### Phase 4: Content & Automation (Week 4+)
- [ ] Write 3-5 real articles
- [ ] Set up sync script
- [ ] Add Obsidian template for blog posts
- [ ] SEO optimization
- [ ] Add analytics (Umami or Plausible - privacy-friendly)
- [ ] Consider custom domain

### Phase 5: Anmol Features (Future)
- [ ] Multi-theme color switcher
- [ ] Command palette enhancement
- [ ] Neovim mode (terminal portfolio view)
- [ ] ParticleFX hover effects on project images

---

## 🔑 KEY DECISIONS SUMMARY

| Decision | Choice | Reason |
|----------|--------|--------|
| Repo strategy | 2 repos (vault private, site public) | Free GitHub Pages + no note leaks |
| Base theme | Devosfera | Best blog engine, all features built-in |
| CSS | Tailwind v4 | Comes with Devosfera |
| Search | Pagefind | Zero-config, chunked loading, best for static |
| Hosting | GitHub Pages (Phase 1), Vercel (optional later) | Free, reliable, easy upgrade path |
| Content sync | Manual copy → script → (later) auto | Progressive automation |
| Portfolio data | TypeScript files in src/data/ | Type-safe, easy to update |
| Blog content | Markdown with YAML frontmatter | Obsidian-compatible |
| Languages | Vietnamese primary, English for tech terms | Matches your audience |

---

## 💡 NOTES FOR AI CODE GENERATION

When generating code for this project, follow these guidelines:

1. **Base:** Start from Devosfera's existing codebase (Astro 5 + Tailwind v4)
2. **Don't rebuild:** Reuse Devosfera's blog engine, search, dark mode, SEO
3. **Add to homepage:** Create new Astro components for portfolio sections
4. **Data-driven:** Portfolio sections read from `src/data/*.ts` files
5. **Style consistency:** Match Devosfera's glassmorphism + cyberpunk aesthetic
6. **Vietnamese text:** Ensure all fonts support Vietnamese diacritics
7. **No React/Svelte:** Pure Astro components + vanilla JS for interactions
8. **Responsive:** Mobile-first, all sections must work on phone screens
9. **Performance:** Target 100/100 Lighthouse, zero unnecessary JS
10. **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation
