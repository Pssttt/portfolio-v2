"use client";

import Link from "next/link";
import type { Project } from "@/lib/projects";
import { tilt, untilt } from "./tilt";

export function ProjectCards({ projects }: { projects: Project[] }) {
  return (
    <div className="card-grid">
      {projects.map((p) => (
        <div key={p.slug} className="gslot">
          <div className="lift">
            <Link
              href={`/projects/${p.slug}`}
              className="tcard tcard-grid"
              onMouseMove={tilt}
              onMouseLeave={untilt}
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <span className="muted" style={{ fontSize: 14 }}>
                  {p.timeline}
                </span>
                {p.status && (
                  <span
                    className={p.status === "Live" ? "tag tag-live" : "tag"}
                  >
                    {p.status}
                  </span>
                )}
              </span>
              <span
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <span className="tcard-title">{p.title}</span>
                <span
                  className="muted"
                  style={{ fontSize: 15, lineHeight: 1.5 }}
                >
                  {p.description}
                </span>
              </span>
              {p.metrics[0] && (
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--accent)",
                  }}
                >
                  {p.metrics[0]}
                </span>
              )}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
