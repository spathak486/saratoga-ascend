/**
 * contact-submission controller
 *
 * Overrides the default core `create` action to:
 *  1. Only accept POST (core already does this via the router).
 *  2. Validate required fields server-side (firstName, email).
 *  3. Strip any unexpected fields before persisting.
 *  4. Always set `status = "new"` on creation so admins see unread leads.
 */

import { factories } from '@strapi/strapi';

const VALID_INQUIRY_TYPES = [
  'Government / Contracting Opportunity',
  'Healthcare Services',
  'Workforce Solutions',
  'IT & Digital Solutions',
  'Contact Center Solutions',
  'Program & Administrative Support',
  'Partnership / Business Development',
  'Media / General Inquiry',
] as const;

const VALID_SOURCES = ['cta', 'need-help', 'contact'] as const;

export default factories.createCoreController(
  'api::contact-submission.contact-submission',
  ({ strapi }) => ({
    /**
     * POST /api/contact-submissions
     * Accepts: { firstName, lastName, email, organization, inquiryType, description, source }
     */
    async create(ctx) {
      const rawBody = ctx.request.body as {
        data?: {
          firstName?: unknown;
          lastName?: unknown;
          email?: unknown;
          organization?: unknown;
          inquiryType?: unknown;
          description?: unknown;
          source?: unknown;
        };
      };

      const data = rawBody?.data ?? {};

      // ── Validate ──────────────────────────────────────────────────────────
      const firstName =
        typeof data.firstName === 'string' ? data.firstName.trim() : '';
      const email =
        typeof data.email === 'string' ? data.email.trim().toLowerCase() : '';

      if (!firstName) {
        return ctx.badRequest('First name is required.');
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return ctx.badRequest('A valid email address is required.');
      }

      // ── Sanitise optional fields ───────────────────────────────────────────
      const lastName =
        typeof data.lastName === 'string' ? data.lastName.trim() : undefined;
      const organization =
        typeof data.organization === 'string' ? data.organization.trim() : undefined;
      const description =
        typeof data.description === 'string' ? data.description.trim() : undefined;

      const inquiryType =
        typeof data.inquiryType === 'string' &&
        (VALID_INQUIRY_TYPES as readonly string[]).includes(data.inquiryType)
          ? (data.inquiryType as any)
          : undefined;

      const source =
        typeof data.source === 'string' &&
        (VALID_SOURCES as readonly string[]).includes(data.source)
          ? data.source
          : 'cta';

      // ── Persist ───────────────────────────────────────────────────────────
      const entry = await strapi.entityService.create(
        'api::contact-submission.contact-submission',
        {
          data: {
            firstName,
            lastName,
            email,
            organization,
            inquiryType,
            description,
            source: source as 'cta' | 'need-help' | 'contact',
            status: 'new',
          },
        }
      );

      ctx.status = 201;
      return { data: { id: entry.id, documentId: (entry as any).documentId } };
    },
  })
);