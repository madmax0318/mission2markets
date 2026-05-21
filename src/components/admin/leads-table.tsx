"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/actions/leads";
import { LEAD_STATUS_OPTIONS } from "@/lib/leads";
import type { Lead, LeadStatus } from "@/types/database";

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(id: string, status: LeadStatus) {
    startTransition(async () => {
      await updateLeadStatus(id, status);
    });
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-700 px-6 py-12 text-center text-sm text-zinc-500">
        No leads yet. Submissions from the contact form will appear here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="min-w-full divide-y divide-zinc-800 text-sm">
          <thead className="bg-zinc-900/80">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Name</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Email</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Phone</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Message</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Status</th>
              <th className="px-4 py-3 text-left font-medium text-zinc-400">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {leads.map((lead) => (
              <tr key={lead.id} className="align-top hover:bg-zinc-900/40">
                <td className="px-4 py-3 font-medium text-white">{lead.name}</td>
                <td className="px-4 py-3">
                  <a href={`mailto:${lead.email}`} className="text-gold hover:underline">
                    {lead.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-zinc-400">{lead.phone || "—"}</td>
                <td className="max-w-xs px-4 py-3 text-zinc-400">
                  <p className="line-clamp-3 whitespace-pre-wrap">{lead.message}</p>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={lead.status}
                    disabled={isPending}
                    onChange={(e) =>
                      handleStatusChange(lead.id, e.target.value as LeadStatus)
                    }
                    className="rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 text-sm text-white outline-none focus:border-gold disabled:opacity-50"
                    aria-label={`Status for ${lead.name}`}
                  >
                    {LEAD_STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-400">
                  {new Date(lead.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-zinc-500">
        {leads.length} lead{leads.length === 1 ? "" : "s"}
      </p>
    </div>
  );
}
