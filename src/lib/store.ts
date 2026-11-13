import { timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");

/** Read a JSON array from data/<name>.json, creating it if missing. The data dir is a mounted volume in the cluster. */
export async function readList<T>(name: string): Promise<T[]> {
  const file = path.join(DATA_DIR, `${name}.json`);
  try {
    return JSON.parse(await fs.readFile(file, "utf-8")) as T[];
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(file, "[]");
    return [];
  }
}

export async function writeList<T>(name: string, items: T[]): Promise<void> {
  const file = path.join(DATA_DIR, `${name}.json`);
  const tmp = `${file}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(items, null, 2));
  await fs.rename(tmp, file);
}

/** Constant-time check of "Authorization: Bearer <ADMIN_TOKEN>". */
export function isAdmin(request: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  const header = request.headers.get("authorization") ?? "";
  if (!token || !header.startsWith("Bearer ")) return false;
  const a = Buffer.from(header.slice(7));
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
