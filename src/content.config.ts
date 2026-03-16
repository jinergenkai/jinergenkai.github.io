import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const THOUGHTS_PATH = "src/data/thoughts";
export const GALLERY_PATH = "src/data/galleries";

const thoughts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${THOUGHTS_PATH}` }),
  schema: () =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: z.string().optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
      lang: z.enum(["vi", "en"]).default("vi"),
      audience: z
        .array(z.enum(["tech", "business", "life", "learning"]))
        .default(["tech"]),
    }),
});

const galleries = defineCollection({
  loader: glob({ pattern: "**/index.{md,mdx}", base: `./${GALLERY_PATH}` }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDatetime: z.date(),
      draft: z.boolean().optional(),
      featured: z.boolean().optional(),
      coverImage: z.string(),
      tags: z.array(z.string()).default([]),
      lang: z.enum(["vi", "en"]).default("vi"),
      galleryType: z.enum(["poem", "quote", "photo", "fun"]).default("photo"),
      audioUrl: z.string().optional(),
      source: z.string().optional(),
    }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/data/notes" }),
  schema: () =>
    z.object({
      title: z.string(),
      pubDatetime: z.date(),
      description: z.string(),
      tags: z.array(z.string()).default([]),
      lang: z.enum(["vi", "en"]).default("vi"),
      subject: z.enum(["gmat", "english", "java", "other"]).default("other"),
      difficulty: z.enum(["beginner", "intermediate", "advanced"]).default("beginner"),
      draft: z.boolean().optional(),
      featured: z.boolean().optional(),
    }),
});

export const collections = { thoughts, galleries, notes };
