import type { NotFoundData } from '@/lib/schemas';

export const mockNotFoundData: NotFoundData = {
  title: 'Oops! Page not found',
  description:
    "The page you're looking for has moved, been removed, or never existed. Let's get you back on mission.",
  primaryCta: { label: 'Get in Touch', href: '/contact', target: '_self', isExternal: false },
  secondaryCta: { label: 'Go Home', href: '/', target: '_self', isExternal: false },
  graphic: {
    url: '/images/404-graphics.jpg',
    width: 1920,
    height: 776,
    alternativeText: '404 — Page not found',
    mime: 'image/jpeg',
  },
};