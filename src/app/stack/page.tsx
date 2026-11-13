import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TiltCard } from "@/components/TiltCard";
import { iconUrl, STACK } from "@/lib/stack";

export const metadata: Metadata = {
  title: "Stack | Pyae Sone Shin Thant",
  description: "The tools I use to build, ship and watch infrastructure.",
};

export default function StackPage() {
  return (
    <div className="wrap">
      <SiteHeader />
      <main>
        <header className="page-head">
          <h1 className="page-title">Stack</h1>
          <p
            className="muted"
            style={{ margin: 0, fontSize: 19, lineHeight: 1.55 }}
          >
            What I reach for, grouped by the job it does. Terraform, Kubernetes
            and Argo CD are the ones I use most.
          </p>
        </header>
        <div className="card-grid">
          {STACK.map((group) => (
            <TiltCard key={group.category}>
              <span
                style={{ display: "flex", flexDirection: "column", gap: 4 }}
              >
                <span className="tcard-title">{group.category}</span>
                <span className="muted" style={{ fontSize: 15 }}>
                  {group.note}
                </span>
              </span>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "grid",
                  gap: 10,
                }}
              >
                {group.items.map((item) => {
                  const src = iconUrl(item);
                  return (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 16,
                      }}
                    >
                      {src ? (
                        <span
                          className="icon"
                          aria-hidden="true"
                          style={
                            {
                              "--src": `url(${src})`,
                              color: "var(--accent)",
                            } as React.CSSProperties
                          }
                        />
                      ) : (
                        <span aria-hidden="true" style={{ width: 18 }} />
                      )}
                      {item}
                    </li>
                  );
                })}
              </ul>
            </TiltCard>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
