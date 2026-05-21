import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [leadsRes, ordersRes, productsRes] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
  ]);

  const newLeadsRes = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("status", "New");

  const stats = [
    {
      label: "New leads",
      value: newLeadsRes.count ?? 0,
      href: "/admin/leads",
    },
    {
      label: "Total leads",
      value: leadsRes.count ?? 0,
      href: "/admin/leads",
    },
    {
      label: "Orders",
      value: ordersRes.count ?? 0,
      href: "/admin/orders",
    },
    {
      label: "Products",
      value: productsRes.count ?? 0,
      href: "/admin/products",
    },
  ];

  const { data: recentOrders } = await supabase
    .from("orders")
    .select("id, customer_email, amount_total, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Mission 2 Markets operations overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-2 font-heading text-3xl font-bold text-primary">
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      <section>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Recent orders
        </h2>
        {!recentOrders?.length ? (
          <p className="rounded-lg border border-dashed border-border px-6 py-8 text-center text-sm text-muted-foreground">
            No orders yet. Completed Stripe checkouts will appear here.
          </p>
        ) : (
          <ul className="divide-y divide-border rounded-lg border border-border">
            {recentOrders.map((order) => (
              <li
                key={order.id}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <span>{order.customer_email ?? "—"}</span>
                <span className="text-muted-foreground">
                  {order.amount_total != null
                    ? `$${(order.amount_total / 100).toFixed(2)}`
                    : "—"}{" "}
                  · {new Date(order.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
