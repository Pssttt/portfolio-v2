import { ogImage, ogSize } from "@/lib/og";
import { projects } from "@/lib/projects";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Project preview";

export function generateStaticParams() {
  return projects
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug as string }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return ogImage(p?.title ?? "Projects", "Project");
}
