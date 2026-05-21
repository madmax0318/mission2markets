"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { LeadStatus } from "@/types/database";

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error("Failed to update lead status");
  }

  revalidatePath("/admin/leads");
}
