import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap() {
    // All CMS data access is authenticated via Strapi API tokens
    // (STRAPI_API_TOKEN from the FE). No permissions are seeded to the
    // Public role — content is never exposed to unauthenticated requests.
  },
};