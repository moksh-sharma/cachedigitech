import type { SectionConfig } from "./serviceSubPageTypes";
import { cybersecuritySubPages } from "./cybersecuritySubPages";
import { dataAnalyticsSubPages } from "./dataAnalyticsSubPages";
import { infrastructureSubPages } from "./infrastructureSubPages";
import { consultingSubPages } from "./consultingSubPages";
import { managedServicesSubPages } from "./managedServicesSubPages";

export type SectionKey =
  | "cybersecurity"
  | "data-analytics"
  | "infrastructure"
  | "consulting"
  | "managed-services";

export const sectionRegistry: Record<SectionKey, SectionConfig> = {
  cybersecurity: cybersecuritySubPages,
  "data-analytics": dataAnalyticsSubPages,
  infrastructure: infrastructureSubPages,
  consulting: consultingSubPages,
  "managed-services": managedServicesSubPages,
};

export function getSectionConfig(section: string): SectionConfig | null {
  return sectionRegistry[section] ?? null;
}

export function isSectionKey(s: string): s is SectionKey {
  return s in sectionRegistry;
}
