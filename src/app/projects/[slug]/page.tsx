import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { projects } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

const find = (slug: string) => projects.find((p) => p.slug === slug);

export function generateStaticParams() {
  return projects
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug as string }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title} | Pyae Sone Shin Thant`,
    description: p.description,
  };
}

const label = {
  margin: 0,
  fontSize: 24,
  letterSpacing: "-0.015em",
  fontWeight: 600,
} as const;
const body = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.7,
  maxWidth: "40em",
} as const;

export default async function ProjectPage({ params }: Params) {
  const p = find((await params).slug);
  if (!p) notFound();

  return (
    <div className="wrap">
      <SiteHeader />
      <main>
        <header className="page-head" style={{ gap: 20 }}>
          <Link
            href="/projects"
            className="link link-quiet muted"
            style={{ fontSize: 16 }}
          >
            Projects
          </Link>
          <h1
            className="page-title"
            style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05 }}
          >
            {p.title}
          </h1>
          <p
            className="muted"
            style={{ margin: 0, fontSize: 19, lineHeight: 1.55 }}
          >
            {p.description}
          </p>
          <div
            style={{
              display: "flex",
              gap: 22,
              flexWrap: "wrap",
              fontSize: 17,
              fontWeight: 500,
            }}
          >
            {p.repoUrl && (
              <a href={p.repoUrl} className="link">
                Source
              </a>
            )}
            {p.demoUrl && (
              <a href={p.demoUrl} className="link">
                Live site
              </a>
            )}
            {(p.status || p.timeline) && (
              <span className="muted" style={{ fontWeight: 400 }}>
                {[p.status, p.timeline].filter(Boolean).join(", ")}
              </span>
            )}
          </div>
        </header>

        {p.metrics.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              paddingBottom: 72,
            }}
          >
            {p.metrics.map((m) => (
              <div
                key={m}
                style={{
                  padding: 20,
                  borderRadius: 14,
                  background: "var(--panel)",
                  fontSize: 17,
                  lineHeight: 1.45,
                }}
              >
                {m}
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          {p.fullDescription && (
            <section className="grid12">
              <h2 style={{ ...label, gridColumn: "span 4" }}>Overview</h2>
              <p style={{ ...body, gridColumn: "span 8" }}>
                {p.fullDescription}
              </p>
            </section>
          )}
          {p.challenge && (
            <section className="grid12">
              <h2 style={{ ...label, gridColumn: "span 4" }}>The problem</h2>
              <p style={{ ...body, gridColumn: "span 8" }}>{p.challenge}</p>
            </section>
          )}
          {p.solution && (
            <section className="grid12">
              <h2 style={{ ...label, gridColumn: "span 4" }}>What I did</h2>
              <p style={{ ...body, gridColumn: "span 8" }}>{p.solution}</p>
            </section>
          )}
          {p.highlights.length > 0 && (
            <section className="grid12">
              <h2 style={{ ...label, gridColumn: "span 4" }}>Details</h2>
              <ul style={{ ...body, gridColumn: "span 8", paddingLeft: 20 }}>
                {p.highlights.map((h) => (
                  <li key={h} style={{ marginBottom: 8 }}>
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="grid12">
            <h2 style={{ ...label, gridColumn: "span 4" }}>Built with</h2>
            <p className="muted" style={{ ...body, gridColumn: "span 8" }}>
              {p.technologies.join(", ")}
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
