import Link from "next/link";
import { logoutAdmin } from "@/actions/auth";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata = {
  title: "Admin",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            href="/admin"
            className="text-sm font-bold uppercase tracking-[0.15em] text-primary"
          >
            M2M Admin
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground"
            >
              View site
            </Link>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-6">
          <AdminNav />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
