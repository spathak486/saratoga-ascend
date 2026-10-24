/**
 * contact-submission router
 *
 * Only POST /api/contact-submissions is exposed publicly so that the FE
 * Next.js proxy can submit leads without an API token.
 * All other CRUD operations (find, findOne, update, delete) require a
 * full-access API token and are used only by the Strapi Admin panel.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  'api::contact-submission.contact-submission',
  {
    config: {
      // Allow unauthenticated POST from the FE proxy (no token required)
      create: {
        auth: false,
        policies: [],
        middlewares: [],
      },
      // Everything else stays protected (default = requires auth)
      find: {
        policies: [],
        middlewares: [],
      },
      findOne: {
        policies: [],
        middlewares: [],
      },
      update: {
        policies: [],
        middlewares: [],
      },
      delete: {
        policies: [],
        middlewares: [],
      },
    },
  }
);