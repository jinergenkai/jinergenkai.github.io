# jinergenkai.github.io — Personal Portfolio & Blog

Personal website of **Nguyễn Mạnh Hùng** (jinergenkai) — Senior Backend Engineer at Nokia FNMS.

**Live:** https://jinergenkai.github.io

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | [Astro 5](https://astro.build) |
| Base theme | [Devosfera](https://github.com/0xdres/astro-devosfera) |
| CSS | Tailwind CSS v4 |
| Search | Pagefind (static, zero JS bundle) |
| Deploy | GitHub Actions → GitHub Pages |
| Package manager | pnpm |

---

## Project Structure

```
src/
├── assets/
│   ├── fonts/          # Wotfard, Cascadia Code, Cartograph CF
│   ├── icons/          # SVG icons (GitHub, LinkedIn, Mail...)
│   └── logo/           # devosfera.svg → Jiner{·}Hung logo
├── components/
│   ├── sections/       # Portfolio sections
│   │   ├── Skills.astro
│   │   ├── Experience.astro
│   │   ├── Projects.astro
│   │   └── Achievements.astro
│   ├── Card.astro      # Blog post card (with lang badge VI/EN)
│   ├── Header.astro
│   ├── Footer.astro
│   └── IntroAudio.astro
├── data/
│   ├── blog/           # ← Blog posts go here (.md files)
│   ├── skills.ts       # Portfolio: skill list
│   ├── experience.ts   # Portfolio: work history
│   ├── projects.ts     # Portfolio: project showcase
│   └── achievements.ts # Portfolio: awards & education
├── layouts/
│   ├── Layout.astro    # Base HTML (dark mode, cursor glow, grid bg)
│   └── PostDetails.astro
├── pages/
│   ├── index.astro     # Homepage: portfolio + blog preview
│   ├── about.md        # About page
│   ├── posts/          # Blog listing + [slug] routes
│   ├── tags/           # Tag pages
│   ├── search.astro    # Pagefind full-text search
│   └── archives/       # All posts by date
├── config.ts           # ← Site metadata (name, URL, audio...)
└── constants.ts        # ← Social links (GitHub, LinkedIn, Email)
public/
├── avatar.png          # Profile photo (shown in hero)
└── audio/
    └── intro-web.mp3   # Intro audio player in hero
```

---

## Adding a Blog Post

1. Create `.md` in `src/data/blog/`
2. Add frontmatter:

```yaml
---
title: "Tiêu đề bài viết"
description: "Mô tả ngắn cho SEO và card preview"
pubDatetime: 2026-02-28T09:00:00.000+07:00
tags:
  - java
  - system-design
featured: false   # true = hiện ở section Featured trên homepage
draft: false      # true = bỏ qua khi build
lang: "vi"        # "vi" hoặc "en" — hiện badge trên card
---
```

3. Commit + push → auto deploy (~2 phút)

### Publishing from Obsidian Vault

Vault location: `D:\bestlife\article\`

Steps:
1. Copy `.md` từ vault → `src/data/blog/`
2. Đặt tên file: `ten-bai-viet-khong-dau.md` (slug)
3. Thêm frontmatter đúng format
4. `git add . && git commit -m "post: tên bài" && git push`

---

## Updating Portfolio Data

Chỉnh trực tiếp trong `src/data/*.ts`:

- **Skills:** `src/data/skills.ts`
- **Experience:** `src/data/experience.ts` — thêm job mới vào đầu mảng
- **Projects:** `src/data/projects.ts` — `featured: true` để hiện ở grid
- **Achievements:** `src/data/achievements.ts`

---

## Key Config (`src/config.ts`)

```ts
website: "https://jinergenkai.github.io/"
author: "Nguyễn Mạnh Hùng"
lang: "vi"
timezone: "Asia/Ho_Chi_Minh"
introAudio.enabled: true          // bật/tắt audio player ở hero
introAudio.src: "/audio/intro-web.mp3"
introAudio.duration: 30           // cập nhật nếu đổi file mp3
```

Social links: `src/constants.ts`

---

## Dev Commands

```bash
pnpm dev          # http://localhost:4321
pnpm build        # production build + pagefind index
pnpm astro check  # TypeScript type check
```

---

## Current Blog Posts (`src/data/blog/`)

| File | Title | Lang | Featured |
|------|-------|------|----------|
| `intelligence-triet-hoc-ve-tri-thong-minh.md` | Intelligence: Triết học về Trí thông minh | VI | ✅ |
| `ci-cd-pipeline-thuc-te-tai-nokia.md` | CI/CD Pipeline thực tế tại Nokia FNMS | VI | ✅ |
| `tra-loi-3-cau-hoi-ve-intelligence.md` | Trả lời 3 câu hỏi về Intelligence | VI | — |

---

## Vault Articles — Chưa publish (`D:\bestlife\article\`)

| File | Trạng thái |
|------|-----------|
| `CÁCH RESET LẠI TOÀN BỘ CUỘC ĐỜI TRONG 24 GIỜ.md` | Summary @thedankoe — cần thêm attribution rõ |
| `System/Tại sao Alipay không dùng Oracle...` | Scraped FB group — cần rewrite |
| `System/Tối ưu hệ thống kiểu lười...` | Viblo (Minh Monmen) — không publish |
| `# Fizz Buzz in Tensorflow.md` | Joel Grus 2016 — không publish |
| `# I'm a former CTO...` | Scraped — không publish |

---

## Deployment

Auto via `.github/workflows/deploy.yml` khi push lên `main`.

**Setup:** GitHub repo Settings → Pages → Source: **GitHub Actions**
