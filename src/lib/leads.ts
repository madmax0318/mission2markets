import type { LeadStatus } from "@/types/database";

export const LEAD_STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "New", label: "New" },
  { value: "Contacted", label: "Contacted" },
  { value: "In Progress", label: "In Progress" },
  { value: "Closed", label: "Closed" },
];

export function formatLeadStatus(status: LeadStatus): string {
  return LEAD_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}
