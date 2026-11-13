import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blogs";
import { projects } from "@/lib/projects";

const base = "https://psstee.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/blogs", "/stack", "/contact"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const posts = getPosts().map((p) => ({
    url: `${base}/blogs/${p.slug}`,
    lastModified: new Date(p.date),
    priority: 0.7,
  }));
  const work = projects
    .filter((p) => p.slug)
    .map((p) => ({ url: `${base}/projects/${p.slug}`, priority: 0.7 }));
  return [...pages, ...posts, ...work];
}
