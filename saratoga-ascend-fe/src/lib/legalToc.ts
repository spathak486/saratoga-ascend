export interface LegalTocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface LegalHeadingScan {
  html: string;
  headings: LegalTocHeading[];
}

const HEADING_RE = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gim;

function stripTags(input: string): string {
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function decodeEntities(input: string): string {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function slugify(text: string): string {
  return decodeEntities(text)
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Scans a CKEditor rich-text body for h2/h3 headings. Each heading gets a
 * stable slug id (deduplicated with numeric suffixes) injected into the
 * markup so sidebar links can deep-link to sections even before hydration,
 * and returns the list of headings for the table-of-contents sidebar.
 */
export function scanLegalHeadings(html: string): LegalHeadingScan {
  const headings: LegalTocHeading[] = [];
  const used = new Map<string, number>();

  const nextId = (base: string): string => {
    const count = (used.get(base) ?? 0) + 1;
    used.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  };

  const htmlWithIds = html.replace(HEADING_RE, (match, level, attrs, inner) => {
    const levelNum = Number(level) as 2 | 3;
    const text = stripTags(inner);

    if (/\bid\s*=/i.test(attrs)) {
      const existing = attrs.match(/id\s*=\s*["']([^"']+)["']/i);
      if (existing && text) {
        headings.push({ id: existing[1], text, level: levelNum });
        return match;
      }
    }

    if (!text) return match;

    const base = slugify(text) || 'section';
    const id = nextId(base);
    headings.push({ id, text, level: levelNum });

    const opening = `<h${levelNum} id="${id}"${attrs}>`;
    return `${opening}${inner}</h${levelNum}>`;
  });

  return { html: htmlWithIds, headings };
}