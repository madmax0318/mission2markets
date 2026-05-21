import { LeadsTable } from "@/components/admin/leads-table";
import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/types/database";

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin/leads]", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Leads CRM</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Contact form submissions and pipeline status.
        </p>
      </div>
      <LeadsTable leads={(data ?? []) as Lead[]} />
    </div>
  );
}
