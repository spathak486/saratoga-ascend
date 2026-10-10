export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) {
    return null;
  }
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL ?? process.env.STRAPI_API_URL ?? 'http://localhost:1337'}${url}`;
}
