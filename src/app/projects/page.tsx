import type { Metadata } from "next";
import { ProjectCards } from "@/components/ProjectCards";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Pyae Sone Shin Thant",
  description: "Infrastructure, backends and the apps I run on my own cluster.",
};

export default function ProjectsPage() {
  return (
    <div className="wrap">
      <SiteHeader />
      <main>
        <header className="page-head">
          <h1 className="page-title">Projects</h1>
          <p
            className="muted"
            style={{ margin: 0, fontSize: 19, lineHeight: 1.55 }}
          >
            Infrastructure, backends and the apps I run on my own cluster.
          </p>
        </header>
        <ProjectCards projects={projects.filter((p) => p.slug)} />
      </main>
      <SiteFooter />
    </div>
  );
}
