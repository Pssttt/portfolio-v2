import type { Metadata } from "next";
import { AdminPanel } from "@/components/AdminPanel";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="wrap">
      <SiteHeader />
      <main style={{ paddingBottom: 96 }}>
        <header className="page-head">
          <h1 className="page-title">Admin</h1>
        </header>
        <AdminPanel />
      </main>
    </div>
  );
}
