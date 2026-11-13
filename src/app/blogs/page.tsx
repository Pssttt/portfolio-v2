import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { formatMonth, getPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Writing | Pyae Sone Shin Thant",
  description:
    "Notes on infrastructure, my homelab, leading teams and the odd book.",
};

export default function BlogsPage() {
  const posts = getPosts();
  return (
    <div className="wrap">
      <SiteHeader />
      <main>
        <header className="page-head">
          <h1 className="page-title">Writing</h1>
          <p
            className="muted"
            style={{ margin: 0, fontSize: 19, lineHeight: 1.55 }}
          >
            Notes on infrastructure, my homelab, leading teams and the odd book.
          </p>
        </header>
        <div>
          {posts.map((p) => (
            <Link key={p.slug} href={`/blogs/${p.slug}`} className="index-row">
              <span className="index-title">{p.title}</span>
              <span className="index-meta muted">{formatMonth(p.date)}</span>
              {p.excerpt && <p className="index-sub muted">{p.excerpt}</p>}
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
