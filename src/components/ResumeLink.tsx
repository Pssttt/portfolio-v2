"use client";

import type { ReactNode } from "react";
import { links } from "@/lib/content";

/** Opens the resume PDF and records the download without blocking the click. */
export function ResumeLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={links.resume}
      className={className}
      target="_blank"
      rel="noopener"
      onClick={() => {
        fetch("/api/resume", { keepalive: true }).catch(() => {});
      }}
    >
      {children}
    </a>
  );
}
