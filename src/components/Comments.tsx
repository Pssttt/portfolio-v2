"use client";

import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

const currentTheme = () =>
  document.documentElement.dataset.theme === "dark" ? "dark_dimmed" : "light";

/** GitHub Discussions comments. Points at the old repo so existing threads carry over. */
export function Comments({ title }: { title: string }) {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
    const obs = new MutationObserver(() => setTheme(currentTheme()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  return (
    <section
      style={{
        marginTop: 72,
        paddingTop: 32,
        borderTop: "1px solid var(--line)",
        maxWidth: "42rem",
      }}
    >
      <h2
        style={{
          margin: "0 0 20px",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "-0.015em",
        }}
      >
        Comments
      </h2>
      {theme && (
        <Giscus
          repo="Pssttt/portfolio-next"
          repoId="R_kgDOQiN-nA"
          category="General"
          categoryId="DIC_kwDOQiN-nM4C1isK"
          mapping="specific"
          term={title}
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme={theme}
          lang="en"
          loading="lazy"
        />
      )}
    </section>
  );
}
