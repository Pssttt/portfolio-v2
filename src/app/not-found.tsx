import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="wrap">
      <SiteHeader />
      <main className="page-head">
        <h1 className="page-title">Nothing here</h1>
        <p className="muted" style={{ margin: 0, fontSize: 19 }}>
          This page doesn't exist. Try the{" "}
          <Link href="/" className="link">
            home page
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
