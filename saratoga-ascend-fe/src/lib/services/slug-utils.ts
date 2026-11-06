/**
 * Centralized, dynamic slug candidate generator.
 * Automatically handles:
 * - Stripping leading/trailing slashes
 * - Extracting base slug without known section prefixes
 * - Generating variant combinations:
 *     1. Normalized request slug (e.g. "contract-vehicles/gsa-mas")
 *     2. Root base slug (e.g. "gsa-mas")
 *     3. Each configured prefix variant (e.g. "contract/gsa-mas", "contracts/gsa-mas", "contract-vehicles/gsa-mas")
 */

export function normalizeSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, '');
}

/**
 * Common prefixes used across collections and URL paths.
 */
export const SECTION_PREFIX_ALIASES: Record<string, string[]> = {
  contract: ['contract-vehicles', 'contract_vehicles', 'contracts', 'contract'],
  solution: ['solutions', 'solution', 'capabilities', 'capability'],
  service: ['who-we-serve', 'who_we_serve', 'services', 'service', 'markets', 'market'],
  blog: ['blogs', 'blog', 'news', 'articles', 'article', 'insights', 'insight'],
};

/**
 * Returns all potential candidate slugs to query CMS for a given section/collection.
 *
 * @param slug - The requested path from Next.js (e.g. "contract-vehicles/gsa-mas" or "gsa-mas")
 * @param sectionKey - Key matching SECTION_PREFIX_ALIASES (or a custom array of prefixes)
 */
export function getDynamicSlugCandidates(
  slug: string,
  sectionKeyOrPrefixes?: keyof typeof SECTION_PREFIX_ALIASES | string[],
): string[] {
  const normalized = normalizeSlug(slug);
  if (!normalized) return [''];

  const prefixes: string[] = Array.isArray(sectionKeyOrPrefixes)
    ? sectionKeyOrPrefixes
    : typeof sectionKeyOrPrefixes === 'string' && SECTION_PREFIX_ALIASES[sectionKeyOrPrefixes]
      ? SECTION_PREFIX_ALIASES[sectionKeyOrPrefixes]
      : [];

  // Strip any matching prefix from the start of the slug to get the pure base slug
  let withoutPrefix = normalized;
  for (const prefix of prefixes) {
    const regex = new RegExp(`^${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/`, 'i');
    if (regex.test(withoutPrefix)) {
      withoutPrefix = withoutPrefix.replace(regex, '');
      break;
    }
  }

  // Also extract the trailing leaf if multi-segment
  const segments = normalized.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || withoutPrefix;

  const candidates = new Set<string>();
  candidates.add(normalized);
  candidates.add(withoutPrefix);
  candidates.add(lastSegment);

  for (const prefix of prefixes) {
    if (withoutPrefix) {
      candidates.add(`${prefix}/${withoutPrefix}`);
    }
    if (lastSegment && lastSegment !== withoutPrefix) {
      candidates.add(`${prefix}/${lastSegment}`);
    }
  }

  return Array.from(candidates).filter(Boolean);
}

/**
 * Builds standard primary & altSlug variables for Strapi GraphQL queries.
 */
export function buildSlugQueryVariables(slug: string): { slug: string; altSlug: string } {
  const normalized = normalizeSlug(slug);
  return {
    slug: normalized,
    altSlug: normalized === '' ? '/' : `/${normalized}`,
  };
}

