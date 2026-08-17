import type { StrapiApp } from '@strapi/strapi/admin';
import AuthLogo from './assets/logo.svg';
import MenuLogo from './assets/icon.svg';
import Favicon from './assets/icon.svg';

export default {
  config: {
    // Replace Auth screen (login / register) logo
    auth: {
      logo: AuthLogo,
    },
    // Replace Sidebar menu top-left logo
    menu: {
      logo: MenuLogo,
    },
    // Replace admin favicon
    head: {
      favicon: Favicon,
    },
    // Custom brand text overrides
    translations: {
      en: {
        'Auth.form.welcome.title': 'Welcome to Saratoga Ascend!',
        'Auth.form.welcome.subtitle': 'Log in to your Saratoga Ascend account',
        'app.components.LeftMenu.navbrand.title': 'Saratoga Ascend',
        'app.components.LeftMenu.navbrand.workplace': 'Admin Console',
        'HomePage.welcome': 'Welcome to Saratoga Ascend Admin',
      },
    },
    // Disable Strapi defaults tutorial links & releases banner
    tutorials: false,
    notifications: {
      releases: false,
    },
  },
  bootstrap(app: StrapiApp) {
    console.log('Saratoga Ascend Admin initialized');
  },
};
