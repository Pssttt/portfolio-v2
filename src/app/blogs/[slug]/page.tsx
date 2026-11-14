import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Comments } from "@/components/Comments";
import { ReadingProgress } from "@/components/ReadingProgress";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { formatMonth, getPost, getPosts, readingMinutes } from "@/lib/blogs";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} | Pyae Sone Shin Thant`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  const newer = i > 0 ? posts[i - 1] : null;
  const older = i < posts.length - 1 ? posts[i + 1] : null;

  return (
    <div className="wrap">
      <ReadingProgress />
      <SiteHeader />
      <main>
        <article>
          <header className="page-head" style={{ gap: 20 }}>
            <Link
              href="/blogs"
              className="link link-quiet muted tap"
              style={{ fontSize: 16 }}
            >
              Writing
            </Link>
            <h1
              className="page-title"
              style={{
                fontSize: "clamp(30px, max(5vw, min(8.5vw, 36px)), 56px)",
                lineHeight: 1.05,
              }}
            >
              {post.title}
            </h1>
            <p className="muted" style={{ margin: 0, fontSize: 16 }}>
              {formatMonth(post.date)}, {readingMinutes(post.body)} min read
            </p>
          </header>
          <div className="prose">
            <MDXRemote
              source={post.body}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypePrettyCode,
                      {
                        theme: { light: "github-light", dark: "github-dark" },
                        keepBackground: true,
                      },
                    ],
                  ],
                },
              }}
            />
          </div>
          <Comments title={post.title} />
        </article>
        <nav
          aria-label="More posts"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            marginTop: 72,
            paddingTop: 28,
            borderTop: "1px solid var(--line)",
            fontSize: 17,
          }}
        >
          {older ? (
            <Link
              href={`/blogs/${older.slug}`}
              className="link link-quiet"
              style={{ maxWidth: "24em" }}
            >
              <span
                className="muted"
                style={{ display: "block", fontSize: 14 }}
              >
                Older
              </span>
              {older.title}
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              href={`/blogs/${newer.slug}`}
              className="link link-quiet"
              style={{ maxWidth: "24em", textAlign: "right" }}
            >
              <span
                className="muted"
                style={{ display: "block", fontSize: 14 }}
              >
                Newer
              </span>
              {newer.title}
            </Link>
          )}
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
