---
title: "Writing Guide — Tất cả tính năng Markdown trong blog này"
pubDatetime: 2026-03-17T10:00:00.000+07:00
description: "Hướng dẫn đầy đủ cách viết post trong blog: frontmatter, TOC, code block với file name / diff / highlight, GalleryEmbed, và mọi tính năng markdown được hỗ trợ."
tags: [guide, markdown, blog]
lang: "vi"
subject: "other"
difficulty: "beginner"
draft: false
featured: false
---

## Table of contents

---

## 1. Frontmatter

### thoughts (bài viết)

```yaml
---
title: "Tiêu đề bài viết"           # bắt buộc
pubDatetime: 2026-03-17T09:00:00.000+07:00  # bắt buộc
modDatetime: 2026-03-20T12:00:00.000+07:00  # tuỳ chọn — ngày cập nhật
description: "Mô tả ngắn, hiện ở card và SEO"  # bắt buộc
tags: [ai, startup, tech]            # tuỳ chọn, mặc định ["others"]
lang: "vi"                           # "vi" | "en", mặc định "vi"
audience: ["tech", "business"]       # ["tech"|"business"|"life"|"learning"]
featured: true                       # nổi bật trên trang chủ
draft: false                         # true = không publish
ogImage: "/images/cover.jpg"         # ảnh thumbnail OG/card
author: "tên tác giả"               # tuỳ chọn, mặc định SITE.author
hideEditPost: true                   # ẩn nút "Edit post"
timezone: "Asia/Ho_Chi_Minh"        # timezone hiển thị ngày
---
```

### notes (ghi chú / wiki)

```yaml
---
title: "Tiêu đề ghi chú"            # bắt buộc
pubDatetime: 2026-03-17T09:00:00.000+07:00  # bắt buộc
description: "Mô tả ngắn"           # bắt buộc
tags: [linux, terminal]              # tuỳ chọn
lang: "vi"                           # "vi" | "en"
subject: "other"                     # "gmat"|"english"|"java"|"other"
difficulty: "beginner"               # "beginner"|"intermediate"|"advanced"
draft: false
featured: false
---
```

### galleries

```yaml
---
title: "Tên bộ sưu tập"             # bắt buộc
description: "Mô tả"                 # bắt buộc
pubDatetime: 2026-03-17T09:00:00.000+07:00  # bắt buộc
coverImage: "/images/cover.jpg"      # bắt buộc
galleryType: "photo"                 # "poem"|"quote"|"photo"|"fun"
tags: [travel, saigon]
lang: "vi"
draft: false
featured: false
audioUrl: "/audio/ambient.mp3"       # tuỳ chọn — nhạc nền
source: "Nguồn ảnh"                  # tuỳ chọn
---
```

---

## 2. Table of Contents

Thêm heading sau vào bài — plugin `remark-toc` sẽ tự generate danh sách link, được wrap trong `<details>` collapsible:

```markdown
## Table of contents
```

> ⚠️ Phải đúng chính xác `Table of contents` (viết hoa chữ T). Heading này sẽ bị thay thế bởi danh sách TOC.

TOC tự nhận toàn bộ heading `##` trở xuống phía sau nó. Nested heading (`###`, `####`) sẽ tạo nested list.

---

## 3. Code block

### Cú pháp cơ bản

````markdown
```language
code here
```
````

Ngôn ngữ hỗ trợ highlight: `bash`, `ts`, `tsx`, `js`, `jsx`, `python`, `java`, `go`, `rust`, `sql`, `yaml`, `json`, `dockerfile`, `groovy`, `xml`, `css`, `html`, `markdown`...

### Hiện tên file

````markdown
```tsx file=profile-form.tsx
export function ProfileForm() {
  return <form>...</form>
}
```
````

Kết quả: label tên file hiện phía trên code block.

### Diff — thêm / xoá dòng

````markdown
```ts
function greet(name: string) {
  console.log("Hello " + name) // [!code --]
  console.log(`Hello ${name}`) // [!code ++]
}
```
````

- `// [!code --]` → highlight đỏ (dòng bị xoá)
- `// [!code ++]` → highlight xanh lá (dòng được thêm)

### Highlight dòng

````markdown
```ts
const a = 1
const b = 2 // [!code highlight]
const c = 3
```
````

Dòng có `// [!code highlight]` sẽ được highlight nền vàng/accent.

### Highlight từ cụ thể

````markdown
```ts
// [!code word:useState]
import { useState, useEffect } from 'react'
const [count, setCount] = useState(0)
```
````

Tất cả chỗ xuất hiện `useState` trong block đó sẽ được highlight.

### Kết hợp nhiều tính năng

````markdown
```tsx file=counter.tsx
// [!code word:useState]
import { useState } from 'react' // [!code highlight]

export function Counter() {
  const [count, setCount] = useState(0) // [!code ++]
  const [value, setValue] = useState(0) // [!code --]
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```
````

---

## 4. GalleryEmbed (chỉ dùng trong `.mdx`)

Nhúng gallery ảnh vào giữa bài viết. File phải đổi đuôi thành `.mdx`.

```mdx
<GalleryEmbed slug="ten-gallery" />
```

```mdx
<GalleryEmbed slug="ten-gallery" limit={6} showLink={true} cols={3} />
```

| Prop | Type | Default | Mô tả |
|---|---|---|---|
| `slug` | string | bắt buộc | Tên folder trong `src/data/galleries/` |
| `limit` | number | 6 | Số ảnh tối đa (0 = tất cả) |
| `showLink` | boolean | true | Hiện link "Xem đầy đủ" |
| `cols` | 2 \| 3 \| 4 | 3 | Số cột grid |

---

## 5. Markdown chuẩn

### Blockquote

```markdown
> Đây là blockquote bình thường.

> ⚠️ Cảnh báo — dùng emoji để phân loại.

> 💡 Tip — gợi ý hữu ích.

> 📌 Note — thông tin cần nhớ.
```

### Bảng

```markdown
| Cột 1 | Cột 2 | Cột 3 |
|---|---|---|
| A | B | C |
| D | `inline code` | **bold** |
```

### Heading

`##` đến `######` được hỗ trợ. Tất cả heading từ `##` trở xuống sẽ tự động có nút `#` anchor link ở phía trái khi hover.

> ⚠️ Không dùng `#` (H1) trong bài — title từ frontmatter đã là H1.

### Inline code

```markdown
Dùng `backtick` cho code, command, tên file, tên biến.
```

### Link

```markdown
[text hiển thị](https://url.com)
[Link nội bộ](#ten-heading)         ← anchor đến section trong bài
```

### Ảnh

```markdown
![alt text](https://url/image.jpg)
![alt text](/images/local.jpg)
```

### Horizontal rule

```markdown
---
```

---

## 6. Best practices

### Cấu trúc bài viết chuẩn

```markdown
---
# frontmatter
---

## Table of contents

## Intro / Context
Đoạn mở đầu không cần heading.

## Section 1

### Sub-section

## Section 2

---

## Kết

> Quote hoặc takeaway cuối bài.
```

### Tips

- **Dùng `---` để ngăn cách sections lớn** — tạo visual break rõ ràng
- **Blockquote + emoji** thay cho callout component: `> ⚠️`, `> 💡`, `> 📌`
- **Inline code** cho mọi thứ technical: tên file, command, biến, path
- **File name trên code block** khi code dài hoặc cần reference — giúp reader biết đang xem file nào
- **Diff annotation** khi giải thích "trước vs sau" hoặc migration
- **TOC** nên có khi bài > 5 section
- **`modDatetime`** khi update bài cũ — hiện "cập nhật lúc" trên post
- **`featured: true`** chỉ dùng cho bài thực sự tốt — hiện ở trang chủ

### Đặt tên file

```
src/data/thoughts/ten-bai-viet-bang-tieng-anh.md
src/data/notes/ten-ghi-chu.md
src/data/galleries/ten-bo-anh/
  index.md
  anh1.jpg
  anh2.jpg
```

- Dùng **kebab-case**, **tiếng Anh**, không dấu
- Tên file = slug của URL
