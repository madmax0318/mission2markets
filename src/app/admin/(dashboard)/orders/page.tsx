import { createClient } from "@/lib/supabase/server";

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, products(title)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin/orders]", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Purchase history from Stripe webhooks.
        </p>
      </div>

      {!orders?.length ? (
        <p className="rounded-lg border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
          No orders recorded yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => {
                const product = order.products as { title: string } | null;
                return (
                  <tr key={order.id}>
                    <td className="px-4 py-3">{order.customer_email ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {product?.title ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-primary">
                      {order.amount_total != null
                        ? `$${(order.amount_total / 100).toFixed(2)}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3">{order.status}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(order.created_at).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
