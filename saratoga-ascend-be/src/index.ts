import type { Core } from '@strapi/strapi';
import { syncMediaLibrary } from './media-sync';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // All CMS data access is authenticated via Strapi API tokens
    // (STRAPI_API_TOKEN from the FE). No permissions are seeded to the
    // Public role — content is never exposed to unauthenticated requests.

    // Auto-register committed uploads whenever Strapi boots. Disable with
    // MEDIA_SYNC_ON_BOOT=false (e.g. for the standalone scripts/import-media.js).
    const enabled = process.env.MEDIA_SYNC_ON_BOOT !== 'false';
    if (enabled) {
      const removeSource = process.env.MEDIA_SYNC_CLEAN === 'true';
      await syncMediaLibrary(strapi, { clean: removeSource });
    }
  },
};