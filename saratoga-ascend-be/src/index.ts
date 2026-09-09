import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (publicRole) {
        const permissions = [
          { action: 'api::footer.footer.find', role: publicRole.id },
          { action: 'api::client-logos-section.client-logos-section.find', role: publicRole.id },
          { action: 'api::client-logos-section.client-logos-section.findOne', role: publicRole.id },
          { action: 'api::service.service.find', role: publicRole.id },
          { action: 'api::service.service.findOne', role: publicRole.id },
          { action: 'api::mission-section.mission-section.find', role: publicRole.id },
          { action: 'api::mission-section.mission-section.findOne', role: publicRole.id },
        ];

        for (const perm of permissions) {
          const exists = await strapi
            .query('plugin::users-permissions.permission')
            .findOne({ where: perm });

          if (!exists) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: perm,
            });
          }
        }
      }
    } catch (err) {
      console.error('Failed to grant public permissions for footer:', err);
    }
  },
};
