export const STACK: { category: string; note: string; items: string[] }[] = [
  {
    category: "Cloud and IaC",
    note: "Where things run",
    items: ["AWS", "Terraform", "Cloudflare"],
  },
  {
    category: "Kubernetes and GitOps",
    note: "How things ship",
    items: [
      "Kubernetes",
      "Helm",
      "Argo CD",
      "Docker",
      "Docker Compose",
      "Ansible",
    ],
  },
  {
    category: "Observability",
    note: "How I know it works",
    items: ["Prometheus", "Grafana", "Loki", "OpenTelemetry"],
  },
  {
    category: "CI/CD",
    note: "Getting code out",
    items: ["GitHub Actions", "Jenkins", "Nginx", "Traefik"],
  },
  {
    category: "Backend",
    note: "What I build",
    items: ["Node.js", "NestJS", "Hono", "FastAPI", "Express"],
  },
  {
    category: "Databases",
    note: "Where data lives",
    items: ["PostgreSQL", "Redis", "MongoDB", "Prisma", "MySQL", "SQLite"],
  },
  {
    category: "Languages",
    note: "What I write",
    items: ["Python", "Go", "Bash", "TypeScript", "SQL", "Java"],
  },
  {
    category: "Frontend",
    note: "When I need a face",
    items: ["React", "Next.js", "TailwindCSS", "shadcn/ui"],
  },
  {
    category: "Tools",
    note: "Every day",
    items: ["Linux", "Git", "Neovim", "Wezterm", "Postman"],
  },
];

const ICONS: Record<string, string> = {
  AWS: "amazonwebservices",
  Terraform: "terraform",
  Cloudflare: "cloudflare",
  Kubernetes: "kubernetes",
  Helm: "helm",
  "Argo CD": "argo",
  Docker: "docker",
  "Docker Compose": "docker",
  Ansible: "ansible",
  Prometheus: "prometheus",
  Grafana: "grafana",
  Loki: "grafana",
  OpenTelemetry: "opentelemetry",
  "GitHub Actions": "githubactions",
  Jenkins: "jenkins",
  Nginx: "nginx",
  Traefik: "traefikproxy",
  "Node.js": "nodedotjs",
  NestJS: "nestjs",
  Hono: "hono",
  FastAPI: "fastapi",
  Express: "express",
  PostgreSQL: "postgresql",
  Redis: "redis",
  MongoDB: "mongodb",
  Prisma: "prisma",
  MySQL: "mysql",
  SQLite: "sqlite",
  Python: "python",
  Go: "go",
  Bash: "gnubash",
  TypeScript: "typescript",
  Java: "openjdk",
  React: "react",
  "Next.js": "nextdotjs",
  TailwindCSS: "tailwindcss",
  "shadcn/ui": "shadcnui",
  Linux: "linux",
  Git: "git",
  Neovim: "neovim",
  Wezterm: "wezterm",
  Postman: "postman",
};

export function iconUrl(name: string): string | null {
  const slug = ICONS[name];
  return slug
    ? `https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/${slug}.svg`
    : null;
}
