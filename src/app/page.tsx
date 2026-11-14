import Image from "next/image";
import { Replay } from "@/components/Replay";
import { ResumeLink } from "@/components/ResumeLink";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StoryHand } from "@/components/StoryHand";
import { formatMonth, getPosts } from "@/lib/blogs";
import { links, stories } from "@/lib/content";

const h2 = {
  margin: 0,
  letterSpacing: "-0.03em",
  fontWeight: 650,
} as const;

export default function Home() {
  const posts = getPosts().slice(0, 4);

  return (
    <div className="wrap">
      <SiteHeader />

      <main>
        <section
          className="grid12 g-end"
          style={{ padding: "var(--s-hero) 0 var(--s-xl)" }}
        >
          <div style={{ gridColumn: "span 4" }}>
            <Image
              className="photo"
              src="/me.jpg"
              alt="Pyae Sone Shin Thant, smiling, in front of a wall of painted enamel plates"
              width={1024}
              height={1024}
              priority
              sizes="(max-width: 700px) 168px, (max-width: 860px) 220px, 340px"
            />
          </div>
          <div
            style={{
              gridColumn: "span 8",
              display: "flex",
              flexDirection: "column",
              gap: 28,
              paddingBottom: 32,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(34px, max(7vw, min(10.5vw, 44px)), 76px)",
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
                fontWeight: 650,
              }}
            >
              <span className="reveal">
                <span>Hi, I'm Pyae Sone Shin Thant.</span>
              </span>
              <span className="reveal">
                <span>I fix the things that look slightly wrong.</span>
              </span>
            </h1>
            <p
              className="muted"
              style={{
                margin: 0,
                fontSize: "clamp(17px, 4.8vw, 20px)",
                lineHeight: 1.55,
                maxWidth: "36em",
              }}
            >
              I study computer science at KMUTT and spent six months on the
              platform team at social.plus, working on AWS, Terraform and
              Kubernetes. At home I run about 30 apps on my own cluster. I'm
              looking for platform, DevOps or SRE work.
            </p>
            <div className="hero-links">
              <a href={`mailto:${links.email}`} className="link">
                {links.email}
              </a>
              <a href={links.github} className="link">
                GitHub
              </a>
              <a href={links.linkedin} className="link">
                LinkedIn
              </a>
              <ResumeLink className="link">Resume</ResumeLink>
            </div>
          </div>
        </section>

        <section id="work" style={{ paddingBottom: "var(--s-lg)" }}>
          <h2
            style={{
              ...h2,
              fontSize: "clamp(30px, 8.5vw, 40px)",
              lineHeight: 1.05,
              maxWidth: "16em",
            }}
          >
            Things I noticed, and what I did about them
          </h2>
          <StoryHand stories={stories} />
        </section>

        <section
          className="grid12 g-start"
          style={{ paddingBottom: "var(--s-xl)" }}
        >
          <div
            style={{
              gridColumn: "span 4",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <h2
              style={{
                ...h2,
                fontSize: "clamp(26px, 7.5vw, 32px)",
                lineHeight: 1.08,
              }}
            >
              Watch the first one happen
            </h2>
            <p
              className="muted"
              style={{ margin: 0, fontSize: 16, lineHeight: 1.65 }}
            >
              Kinesis shard count during the load test.
            </p>
          </div>
          <div style={{ gridColumn: "span 8" }}>
            <Replay />
          </div>
        </section>

        <section className="grid12" style={{ paddingBottom: "var(--s-lg)" }}>
          <h2 style={{ ...h2, gridColumn: "span 4", fontSize: 24 }}>
            Also built
          </h2>
          <p
            style={{
              gridColumn: "span 8",
              margin: 0,
              fontSize: "clamp(17px, 4.8vw, 20px)",
              lineHeight: 1.6,
              maxWidth: "34em",
            }}
          >
            An OIDC sign-in shared by three of my apps. Reconcile, hands-on labs
            for databases. Doohickey. The backend for MyChatterBox, a freelance
            mentor-booking app. And I was dev lead for KMUTT's Smart City
            project, across 16 student teams.{" "}
            <a
              href="/projects"
              className="link"
              style={{ color: "var(--accent)" }}
            >
              All projects
            </a>
          </p>
        </section>

        <section id="writing" className="grid12">
          <h2 style={{ ...h2, gridColumn: "span 4", fontSize: 24 }}>Writing</h2>
          <div
            style={{
              gridColumn: "span 8",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {posts.map((p) => (
              <a
                key={p.slug}
                href={`/blogs/${p.slug}`}
                className="link link-quiet post-row"
              >
                <span>{p.title}</span>
                <span className="muted post-date">{formatMonth(p.date)}</span>
              </a>
            ))}
            <a
              href="/blogs"
              className="link"
              style={{ color: "var(--accent)", fontSize: 17 }}
            >
              All writing
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
