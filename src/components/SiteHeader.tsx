import Link from "next/link";
import { ResumeLink } from "@/components/ResumeLink";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <nav className="site-nav">
      <Link href="/" className="site-name">
        Pyae Sone Shin Thant
      </Link>
      <div className="site-links">
        <Link href="/projects" className="link link-quiet muted">
          Projects
        </Link>
        <Link href="/blogs" className="link link-quiet muted">
          Writing
        </Link>
        <Link href="/stack" className="link link-quiet muted">
          Stack
        </Link>
        <Link href="/contact" className="link link-quiet muted">
          Contact
        </Link>
        <ResumeLink className="link link-quiet muted">Resume</ResumeLink>
        <ThemeToggle />
      </div>
    </nav>
  );
}
