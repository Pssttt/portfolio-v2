import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

const dir = path.join(process.cwd(), "content/blogs");

export function getPosts(): PostMeta[] {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(dir, file), "utf-8"));
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title ?? ""),
        date: String(data.date ?? ""),
        excerpt: String(data.excerpt ?? ""),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatMonth(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export function getPost(slug: string): (PostMeta & { body: string }) | null {
  const file = path.join(dir, `${slug}.mdx`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  return {
    slug,
    title: String(data.title ?? ""),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    body: content,
  };
}

export function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}
