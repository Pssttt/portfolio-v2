export interface Project {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  metrics: string[];
  status?: string;
  timeline?: string;
  repoUrl?: string;
  demoUrl?: string;
  slug?: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
}

export const projects: Project[] = [
  {
    title: "Self-hosted Kubernetes Platform",
    description:
      "Single-node k3s cluster on Oracle Cloud running 30+ apps through GitOps, with full observability",
    fullDescription:
      "My own platform for everything I build: a k3s cluster on Oracle Cloud (ARM) where every workload is an Argo CD application, reconciled from 3 Git repositories. It hosts this portfolio, Unishare, uniAuth, openGym and more, with SealedSecrets, cert-manager, and Prometheus, Grafana, Loki and Tempo for monitoring.",
    challenge:
      "Run many apps on one small ARM node with production habits: nothing applied by hand, secrets safe to commit, and alerts before users notice. Then I found every app could be reached past Cloudflare Access by sending requests straight to the server.",
    solution:
      "Argo CD app-of-apps with Helm charts and SealedSecrets, and CI that commits immutable image tags back to Git. For the bypass, I first tried an IP allowlist and proved it could not work, because kube-proxy rewrites client IPs. I moved all traffic to an in-cluster Cloudflare Tunnel and dropped direct traffic with iptables.",
    technologies: [
      "Kubernetes",
      "k3s",
      "Argo CD",
      "Helm",
      "Terraform",
      "Cloudflare",
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
    ],
    metrics: [
      "30+ Argo CD applications",
      "3 GitOps repositories",
      "Alerts routed to Discord",
    ],
    highlights: [
      "Argo CD app-of-apps with Helm and SealedSecrets; nothing is applied by hand",
      "Prometheus, Grafana, Loki and Tempo (OpenTelemetry tracing via Alloy)",
      "Closed a Cloudflare Access bypass with an in-cluster tunnel and iptables drops",
      "Cloudflare DNS, tunnel and Access settings managed in Terraform with CI",
    ],
    status: "Live",
    timeline: "2026 – Present",
    repoUrl: "https://github.com/Pssttt/homelab",
    slug: "homelab",
  },
  {
    title: "Self-hosted VPN and Admin Dashboard",
    description:
      "A VPN for friends and family on restrictive networks, with a patched Go server and a self-service dashboard",
    fullDescription:
      "An Outline (Shadowsocks) VPN plus a REALITY fallback for networks that block it, running on my Kubernetes cluster. A Next.js dashboard manages per-device keys, QR sharing and usage, and talks to the Kubernetes API directly.",
    challenge:
      "Users' DNS requests over UDP sometimes vanished, and some ISPs block the VPN outright.",
    solution:
      "Backported an upstream race fix to the Outline server (Go) and wrote a second patch for NAT sessions closed by a DNS reply, each with a regression test that fails before the fix, then cross-compiled for ARM64. Added a REALITY protocol fallback and per-device Pi-hole ad blocking that toggles live.",
    technologies: [
      "Go",
      "Next.js",
      "Kubernetes",
      "Xray",
      "Pi-hole",
      "Prometheus",
    ],
    metrics: ["10+ users", "2 protocols", "30-day usage per device"],
    highlights: [
      "Patched the Outline server (Go) with regression tests and an ARM64 build",
      "Per-device keys, QR sharing and usage meters from Prometheus",
      "Kubernetes resource versions reject conflicting edits instead of losing keys",
      "Per-device ad blocking via Pi-hole, toggled without restarting the server",
    ],
    status: "Live",
    timeline: "2026 – Present",
    slug: "vpn",
  },
  {
    title: "uniAuth - Single Sign-On for UniCorp Apps",
    description:
      "OAuth 2.1 / OpenID Connect provider that signs users in once across 3 apps",
    fullDescription:
      "One account for every UniCorp app (Unishare, Unigym, Uniloom). Each app is an OpenID Connect client with its own session and checks uniAuth silently when it finds a signed-out visitor, so signing in once signs you in everywhere.",
    challenge:
      "Three separate apps each had their own sign-in, and universities needed to be first-class so users belong to the right school.",
    solution:
      "Built an OAuth 2.1 / OIDC provider with Bun, Hono, Better Auth and Drizzle, modeled universities as organizations, and documented how to integrate a new app.",
    technologies: [
      "Bun",
      "Hono",
      "Better Auth",
      "Drizzle",
      "PostgreSQL",
      "OIDC",
    ],
    metrics: ["3 apps on one sign-in", "100+ commits"],
    highlights: [
      "OAuth 2.1 / OpenID Connect provider",
      "Silent sign-in across apps",
      "Universities modeled as organizations",
    ],
    status: "Live",
    timeline: "2026 – Present",
    slug: "uniauth",
  },
  {
    title: "Reconcile - Platform Engineering Labs",
    description:
      "Hands-on Kubernetes labs that break a cluster on purpose and check your fix",
    fullDescription:
      "A personal training app for a 24-week platform engineering curriculum, plus live lab environments in GitHub Codespaces. Each Kubernetes lab builds a throwaway kind cluster, injects a failure, and checks the fix automatically.",
    challenge:
      "Reading about Kubernetes failures is not the same as fixing them, and a fixed question bank gets memorized.",
    solution:
      "Labs that create real broken state (for example, a PostgreSQL durability check that deletes a pod) and report results back to the app. The curriculum lives as typed code with integrity tests on every build, and optional AI grading scores answers against hand-written rubrics.",
    technologies: [
      "Next.js",
      "SQLite",
      "kind",
      "Go",
      "GitHub Codespaces",
      "Gemini",
    ],
    metrics: ["24-week curriculum", "Failure injection + auto-checks"],
    highlights: [
      "Throwaway kind clusters per lab",
      "Failure injection and automatic checks",
      "Content as typed code, validated on every build",
    ],
    status: "In Progress",
    timeline: "2026 – Present",
    slug: "reconcile",
  },
  {
    title: "Unishare - Student Resource Sharing Platform",
    description:
      "Full-stack platform for university students to share lecture notes, past papers, and study guides",
    fullDescription:
      "A monorepo platform built for university students to upload, discover, and share academic resources across courses and departments. Features a NestJS REST API, Next.js frontend, real-time chat, collaborative canvas, and AI-powered document summarization — all deployed via Docker and GitHub Actions CI/CD.",
    challenge:
      "Building a scalable, full-stack platform from scratch that handles file uploads, real-time features, and AI integration while maintaining clean architecture and a great developer experience across a monorepo.",
    solution:
      "Adopted a Turborepo monorepo with NestJS + Prisma backend and Next.js frontend, implemented OpenAPI-first development with Orval for type-safe API clients, added real-time chat via Socket.IO, integrated AI summarization, and automated deployment with Docker and GitHub Actions.",
    technologies: [
      "Next.js",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Socket.IO",
      "pgvector",
      "Docker",
      "Argo CD",
      "Turborepo",
      "TypeScript",
      "TanStack Query",
    ],
    metrics: [
      "Used by 40–50 students",
      "160+ API endpoints over 42 Prisma models",
      "100+ test files",
      "Lead developer: 1,200+ commits",
    ],
    highlights: [
      "NestJS REST API with Prisma ORM and PostgreSQL full-text search",
      "Real-time features: chat (Socket.IO) and collaborative canvas (Excalidraw)",
      "OpenAPI spec with Orval code generation for type-safe frontend API calls",
      "AI document summarization and Open Graph / SEO optimization",
      "Question answering over uploaded notes with pgvector embeddings and cited sources",
      "Releases via semantic-release, CodeQL scanning and path-filtered Docker builds to GHCR",
      "GitOps deploys: CI commits image tags, Argo CD syncs in waves, a failed migration blocks the rollout",
    ],
    status: "In Progress",
    timeline: "Feb 2026 – Present",
    repoUrl: "https://github.com/unishare-oss/unishare",
    demoUrl: "https://share.psstee.me",
    slug: "unishare",
  },
  {
    title: "Smart City Hub - University Integrated Project (Dev Lead)",
    description:
      "Smart city platform with OpenAPI-first architecture and enterprise standards",
    fullDescription:
      "A comprehensive smart city platform built with a focus on scalability and developer experience. Leading development practices and infrastructure setup for a 50+ developer team across 16 teams, establishing best practices in error handling, routing patterns, and CI/CD pipelines.",
    challenge:
      "Managing a large-scale university project with multiple teams required establishing clear architectural patterns and development standards to prevent conflicts and ensure consistency across 50+ developers.",
    solution:
      "Implemented OpenAPI-first architecture with Hono and Zod validation, established comprehensive development standards, and set up professional tooling including ESLint, Prettier, Husky, and lint-staged to maintain code quality.",
    technologies: [
      "React",
      "Hono",
      "Prisma",
      "PostgreSQL",
      "Zod",
      "OpenAPI",
      "Orval",
      "TanStack Query",
      "pnpm",
    ],
    metrics: [
      "50+ developers across 16 teams",
      "Top backend contributor: 227 commits among 40 contributors",
      "Typed, self-documenting API contract for every team",
    ],
    highlights: [
      "OpenAPI specification with Hono and Zod validation",
      "Development standards: error handling, routing patterns, PR workflows",
      "Professional tooling: ESLint, Prettier, Husky, lint-staged",
    ],
    status: "Completed",
    timeline: "Aug 2025 – Dec 2025",
    repoUrl: "https://github.com/orgs/CSC290-2025/repositories?type=source",
    demoUrl: "https://smartcity.sit.kmutt.ac.th/",
    slug: "smart-city-hub",
  },
  {
    title: "Student–Mentor Booking Platform (Freelance)",
    description:
      "Backend service for a one-on-one booking platform with session management (Private Repo)",
    fullDescription:
      "Built and maintained a backend service for a one-on-one booking platform, handling scheduling, availability validation, and session management. Designed for scalability and reliability with containerized deployments.",
    challenge:
      "Preventing double-bookings and ensuring reliable media uploads while managing secure session-based authentication for multiple user roles.",
    solution:
      "Implemented transactional workflows with Prisma to ensure data consistency, designed a scalable media upload flow using AWS S3 presigned URLs, and containerized services for consistent deployment.",
    technologies: [
      "NestJS",
      "Prisma",
      "Docker",
      "Stripe",
      "BullMQ",
      "AWS S3",
      "CloudFront",
      "PostgreSQL",
    ],
    metrics: [
      "50 REST endpoints over 12 data models",
      "Prevented double-bookings via transactions",
      "Automated Docker builds to GHCR",
    ],
    highlights: [
      "Stripe payments and webhooks",
      "Unpaid-booking expiry and payment reminders with BullMQ and Redis jobs",
      "Timezone-aware scheduling with availability overrides",
      "AWS S3 presigned URLs for direct client uploads",
      "Tightened endpoint authorization and closed a mentor IDOR",
    ],
    status: "Completed",
    timeline: "Dec 2025 – Mar 2026",
    slug: "mentor-booking",
  },
  {
    title: "Doohickey - Guess the Object",
    description:
      "A riddle guessing game served by a Go server as a single binary",
    fullDescription:
      "Guess an everyday object from a riddle in six tries. Every guess is graded against the hidden object on weight, length, parts, year invented, price and categories.",
    challenge:
      "Keep the game impossible to cheat from the browser's network tab while staying small enough to run without a database.",
    solution:
      "The Go server owns all game state, so the answer never reaches the browser, and the React UI is embedded into one binary. Weight, length and price are graded on a log scale, because the catalogue runs from a postage stamp to a piano.",
    technologies: ["Go", "React", "Vite", "TypeScript"],
    metrics: ["176 objects", "One binary"],
    highlights: [
      "Server-authoritative game state",
      "Log-scale grading for size and price",
      "React UI embedded into the Go binary",
    ],
    status: "Live",
    timeline: "2026",
    slug: "doohickey",
  },
  {
    title: "Automated Court Booking System",
    description:
      "Automated backend service for time-sensitive Google Form bookings",
    fullDescription:
      "Developed an automated backend service to submit time-sensitive Google Form bookings on behalf of users. Engineered for reliability with precise scheduling to handle strict timing windows.",
    challenge:
      "Handling strict timing windows for booking submissions and managing external request failures reliably.",
    solution:
      "Implemented precise scheduling and retry logic, containerized the application for predictable runtime behavior on Linux servers, and set up monitoring for execution reliability.",
    technologies: ["Python", "FastAPI", "Docker", "Linux"],
    metrics: [
      "Precise scheduling logic",
      "Automated failure handling",
      "Consistent task completion",
    ],
    highlights: [
      "Automated Google Form submission engine",
      "Retry logic for network reliability",
      "Containerized Linux deployment",
    ],
    status: "Completed",
    timeline: "Jun 2025 – Jul 2025",
    repoUrl: "https://github.com/Pssttt/court-booking",
    slug: "court-booking",
  },
  {
    title: "CS First Date - Junior-Senior Pair Matching Platform",
    description:
      "Senior-organized fresher welcome event with witch-themed matching game for CS juniors",
    fullDescription:
      "An interactive web platform designed for a university CS department event to match junior students with senior mentors. Features real-time matching, Azure AD authentication for university integration, and a witch-themed UI for an engaging user experience.",
    challenge:
      "Creating a real-time event platform that could handle 100+ concurrent users with instant matching and updates, while integrating with university Azure AD for authentication.",
    solution:
      "Built a monorepo architecture using Turbo for efficient multi-package management, implemented real-time updates with WebSockets, and integrated Azure MSAL for secure university authentication.",
    technologies: [
      "React",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Azure MSAL",
      "Cloudinary",
      "TanStack Query",
    ],
    metrics: ["100+ students registered", "Real-time event with 0 downtime"],
    highlights: [
      "Azure AD authentication for university student verification",
      "Monorepo architecture with Turbo for multi-package management",
      "Real-time countdown and live event indicators for matching",
    ],
    repoUrl: "https://github.com/KimTaeman/CSFD",
    demoUrl: "https://csfd.sit.kmutt.ac.th/",
    slug: "cs-first-date",
  },
  {
    title: "Stylofi - Fashion Social Platform",
    description:
      "Pinterest-like platform with AI-powered fashion content validation",
    fullDescription:
      "A social platform for fashion enthusiasts featuring AI-powered content validation using Google Cloud Vision API. Users can upload fashion images, share styling tips, and connect with other fashion lovers in a Pinterest-like feed interface.",
    challenge:
      "Ensuring high-quality fashion content while maintaining fast image processing times and preventing inappropriate content uploads.",
    solution:
      "Integrated Google Cloud Vision API for automated fashion image validation with >95% accuracy, implemented JWT authentication with OTP verification, and optimized image storage and processing using Cloudinary.",
    technologies: [
      "React",
      "Hono",
      "Prisma",
      "PostgreSQL",
      "Google Cloud Vision API",
      "Cloudinary",
      "JWT",
    ],
    metrics: [
      "AI validation accuracy >95%",
      "Image processing <2s per upload",
      "Built in 48-hour hackathon",
    ],
    highlights: [
      "Google Cloud Vision API for automated fashion image validation",
      "JWT authentication with OTP verification via Nodemailer",
      "Image storage and optimization pipeline using Cloudinary",
    ],
    status: "Offline",
    timeline: "April 2025 – May 2025",
    repoUrl: "https://github.com/Pssttt/stylofi",
    slug: "stylofi",
  },
  {
    title: "HuhOh - Gen Z Slang Translation Platform (Hackathon Project)",
    description:
      "Collaborative platform for translating Gen Z slang with AI assistance",
    fullDescription:
      "An interactive platform designed to bridge the generation gap by translating trendy Gen Z slang into standard language and vice versa. Powered by Google Gemini AI, it features collaborative translation submissions and comprehensive history tracking.",
    challenge:
      "Creating an AI system that understands context and nuances of slang, while allowing community contributions to expand the translation database.",
    solution:
      "Leveraged Google Gemini AI for contextual interpretation of slang, implemented a shared translation feature allowing users to contribute, and built history tracking to help users learn over time.",
    technologies: [
      "React",
      "Hono",
      "Prisma",
      "PostgreSQL",
      "Google Gemini AI",
      "Cloudinary",
      "JWT",
    ],
    metrics: ["100+ translations in database", "AI response time <3s"],
    highlights: [
      "AI-powered translation using Google Gemini for contextual interpretation",
      "Shared translation feature for collaborative learning",
      "Comprehensive history tracking for translations",
    ],
    status: "Offline",
    timeline: "May 2025 – June 2025",
    repoUrl: "https://github.com/Pssttt/huhoh",
    slug: "huhoh",
  },
];
