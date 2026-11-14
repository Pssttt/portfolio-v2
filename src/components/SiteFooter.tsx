import { links } from "@/lib/content";

export function SiteFooter() {
  const sha = process.env.GIT_SHA;
  return (
    <footer className="site-footer">
      <p className="footer-line">
        Write to me at{" "}
        <a
          href={`mailto:${links.email}`}
          className="link"
          style={{ color: "var(--accent)" }}
        >
          {links.email}
        </a>
      </p>
      <div className="footer-links">
        {sha && sha !== "dev" && (
          <a
            href={`https://github.com/Pssttt/portfolio-v2/commit/${sha}`}
            className="link link-quiet muted"
            title="The commit this page was built from. CI builds the image and Argo CD rolls it out."
          >
            Built from {sha.slice(0, 7)}
          </a>
        )}
        <a href={links.terminal} className="link link-quiet muted">
          Terminal version
        </a>
        <a href={links.github} className="link link-quiet muted">
          GitHub
        </a>
        <a href={links.linkedin} className="link link-quiet muted">
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
