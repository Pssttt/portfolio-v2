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
          className="grid12"
          style={{ padding: "88px 0 112px", alignItems: "end" }}
        >
          <div style={{ gridColumn: "span 4" }}>
            <Image
              className="photo"
              src="/me.jpg"
              alt="Pyae Sone, smiling, in front of a wall of painted enamel plates"
              width={1024}
              height={1024}
              priority
              sizes="(max-width: 860px) 220px, 340px"
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                objectPosition: "55% 50%",
                borderRadius: 14,
                display: "block",
              }}
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
                fontSize: "clamp(44px, 7vw, 76px)",
                lineHeight: 0.98,
                letterSpacing: "-0.045em",
                fontWeight: 650,
              }}
            >
              <span className="reveal">
                <span>Hi, I'm Pyae Sone.</span>
              </span>
              <span className="reveal">
                <span>I fix the things that look slightly wrong.</span>
              </span>
            </h1>
            <p
              className="muted"
              style={{
                margin: 0,
                fontSize: 20,
                lineHeight: 1.55,
                maxWidth: "36em",
              }}
            >
              I study computer science at KMUTT and spent six months on the
              platform team at social.plus, working on AWS, Terraform and
              Kubernetes. At home I run about 30 apps on my own cluster. I'm
              looking for platform, DevOps or SRE work.
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

        <section id="work" style={{ paddingBottom: 104 }}>
          <h2
            style={{ ...h2, fontSize: 40, lineHeight: 1.05, maxWidth: "16em" }}
          >
            Things I noticed, and what I did about them
          </h2>
          <StoryHand stories={stories} />
        </section>

        <section
          className="grid12"
          style={{ paddingBottom: 112, alignItems: "start" }}
        >
          <div
            style={{
              gridColumn: "span 4",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <h2 style={{ ...h2, fontSize: 32, lineHeight: 1.08 }}>
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

        <section className="grid12" style={{ paddingBottom: 104 }}>
          <h2 style={{ ...h2, gridColumn: "span 4", fontSize: 24 }}>
            Also built
          </h2>
          <p
            style={{
              gridColumn: "span 8",
              margin: 0,
              fontSize: 20,
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
                className="link link-quiet"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 24,
                  fontSize: 20,
                }}
              >
                <span>{p.title}</span>
                <span
                  className="muted"
                  style={{ fontSize: 16, whiteSpace: "nowrap" }}
                >
                  {formatMonth(p.date)}
                </span>
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
