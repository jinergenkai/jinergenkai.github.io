# Claude Code Prompts — Mở rộng Devosfera
---

## PROMPT 1: Thêm Poetry collection

```
Thêm content collection "poetry" vào site hiện tại.

Yêu cầu:
- Tạo folder `src/data/poetry/` chứa .md files
- Mỗi bài thơ có frontmatter: title, pubDatetime, description, tags, lang ("vi"/"en"), poemType ("luc-bat"/"tu-do"/"free-verse"), audioUrl (optional), draft, featured
- Update content.config.ts thêm poetry collection schema
- Tạo page `/poetry` listing tất cả bài thơ, filter được theo poemType và lang
- Tạo page `/poetry/[slug]` cho từng bài, dùng typography serif (font Vietnamese-friendly), line-height rộng hơn blog thường, text-align center cho lục bát
- Nếu có audioUrl, hiện audio player inline (tham khảo audio player đã có trong hero section)
- Thêm link "Poetry" vào navbar
- Tạo 1 bài mẫu lục bát và 1 bài thơ tự do để test
- Style: giữ glassmorphism + dark mode của Devosfera, nhưng typography riêng cho thơ — serif font, spacing thở hơn
```

---

## PROMPT 2: Thêm Notes collection (shareable study notes)

```
Thêm content collection "notes" vào site hiện tại.

Yêu cầu:
- Tạo folder `src/data/notes/` chứa .md files
- Frontmatter: title, pubDatetime, description, tags, lang, subject ("gmat"/"english"/"java"/"other"), difficulty ("beginner"/"intermediate"/"advanced"), draft, featured
- Update content.config.ts thêm notes collection schema
- Tạo page `/notes` listing, filter được theo subject và difficulty
- Tạo page `/notes/[slug]` cho từng note, layout giống blog nhưng có sidebar TOC luôn hiện (sticky)
- Thêm link "Notes" vào navbar
- Tạo 1 note mẫu "GMAT UEH Tips" để test
- Notes page nên có notice nhỏ: "These notes are shared for learning purposes"
```

---

## PROMPT 3: Thêm Thoughts/Life collection

```
Thêm content collection "thoughts" vào site hiện tại.

Yêu cầu:
- Tạo folder `src/data/thoughts/` chứa .md files
- Frontmatter: title, pubDatetime, description, tags, lang, draft, featured
- Schema giống blog nhưng không cần tags bắt buộc
- Update content.config.ts
- Tạo page `/thoughts` listing
- Tạo page `/thoughts/[slug]`
- Thêm link "Thoughts" vào navbar
- Tạo 1 bài mẫu về career reflection
- Style: softer tone hơn blog tech — có thể dùng accent color khác (warm tone)
```

---

## PROMPT 4: Language filter (i18n đơn giản)

```
Thêm language filter cho toàn bộ content collections (blog, poetry, notes, thoughts).

Yêu cầu:
- Mỗi collection đã có field `lang: "vi" | "en"` trong frontmatter
- Thêm language toggle/filter trên mỗi listing page: [All] [Tiếng Việt] [English]
- Filter bằng client-side JS đơn giản (không cần SSR)
- Nhớ trạng thái filter qua URL param: /blog?lang=vi
- Default: hiện tất cả (All)
- Không cần i18n routing phức tạp (/vi/blog, /en/blog) — chỉ cần filter
```

---

## PROMPT 5: Unified navigation update

```
Update navbar để accommodate tất cả sections mới.

Yêu cầu:
- Navbar items: Blog | Poetry | Notes | Thoughts | Projects | Gallery | About
- Trên mobile: hamburger menu hoặc horizontal scroll
- Active state highlight cho current section
- Giữ ⌘K search hoạt động cho TẤT CẢ collections (blog + poetry + notes + thoughts)
- Đảm bảo Pagefind index tất cả content types
```

---

## Thứ tự chạy: 1 → 2 → 3 → 4 → 5

Mỗi prompt xong, test local (`pnpm dev`) rồi mới chạy prompt tiếp.