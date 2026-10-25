import { z } from 'zod';
import { StrapiImageSchema, GeneralLinkSchema } from './common';

// Mirrors Strapi's shared.nav-item component.
export const NavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  hasMenu: z.boolean().nullable().optional(),
  hasExternalIcon: z.boolean().nullable().optional(),
  links: z.array(GeneralLinkSchema).nullable().optional(),
});

export type NavItem = z.infer<typeof NavItemSchema>;

export const NavigationDataSchema = z.object({
  logo: StrapiImageSchema.nullable().optional(),
  logoAlt: z.string().nullable().optional(),
  homeHref: z.string().nullable().optional(),
  utilityLinks: z.array(NavItemSchema).nullable().optional(),
  primaryLinks: z.array(NavItemSchema).nullable().optional(),
  cta: GeneralLinkSchema.nullable().optional(),
  searchLabel: z.string().nullable().optional(),
});

export type NavigationData = z.infer<typeof NavigationDataSchema>;
