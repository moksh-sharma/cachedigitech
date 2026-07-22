import type { LucideIcon } from "lucide-react";

export type ServiceListSection = {
  title: string;
  items: string[];
  /** Optional lead-in text above the pointer list. */
  intro?: string;
  /** Optional note below the pointer list. */
  footnote?: string;
};

export type ServiceSubPageDef = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  heroImage: string;
  bodyImage: string;
  intro: string;
  /** Optional extra overview paragraphs after `intro`. */
  introParagraphs?: string[];
  highlights: string[];
  offerings: { title: string; description: string; icon: LucideIcon }[];
  /** Optional pointer sections (capabilities, benefits, etc.). */
  listSections?: ServiceListSection[];
};

export type SectionConfig = {
  overviewRoute: string;
  sectionTitle: string;
  badgeLabel: string;
  overviewLabel: string;
  pages: ServiceSubPageDef[];
};

export function pageBySlug(config: SectionConfig): Record<string, ServiceSubPageDef> {
  return Object.fromEntries(config.pages.map((p) => [p.slug, p]));
}

export function isSlugValid(config: SectionConfig, slug: string): boolean {
  return config.pages.some((p) => p.slug === slug);
}
