import { z } from 'zod';
import { StrapiImageSchema, GeneralLinkSchema } from './common';

export const LinkColumnSchema = z.object({
  heading: z.string(),
  links: z.array(GeneralLinkSchema).optional().nullable(),
});

export type LinkColumn = z.infer<typeof LinkColumnSchema>;

export const FooterDataSchema = z.object({
  headline: z.string().nullable().optional(),
  newsletterHeading: z.string().nullable().optional(),
  privacyConsentText: z.string().nullable().optional(),
  privacyConsentLink: GeneralLinkSchema.nullable().optional(),
  linkColumns: z.array(LinkColumnSchema).nullable().optional(),
  contactHeading: z.string().nullable().optional(),
  contactEmail: z.string().nullable().optional(),
  contactPhone: z.string().nullable().optional(),
  copyrightText: z.string().nullable().optional(),
  legalLinks: z.array(GeneralLinkSchema).nullable().optional(),
  logo: StrapiImageSchema.nullable().optional(),
});

export type FooterData = z.infer<typeof FooterDataSchema>;
