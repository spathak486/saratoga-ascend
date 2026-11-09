/**
 * Global text cleaning utility for titles and text coming from CMS / CKEditor.
 * Removes outer HTML tags like <p>, <h2>, <h3>, <span>, unescapes entities,
 * and strips HTML tags cleanly so titles render as clean text without visible tags
 * in headings or alt attributes.
 */

export function stripHtml(html?: string | null): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * For rich titles where inline styling (like bold, colored spans, br) should be preserved,
 * but outer block wrappers (<p>, <h2>, <h3>, <div>) that cause nesting/hydration errors
 * and visual tag leaks are cleanly unwrapped.
 */
export function cleanHeadingHtml(html?: string | null): string {
  if (!html) return '';
  let str = html.trim();
  // Transform paragraph breaks into line breaks if multiple paragraphs entered
  str = str.replace(/<\/\s*p\s*>\s*<\s*p(\s+[^>]*)?>/gi, '<br/>');
  // Strip opening outer block tag
  str = str.replace(/^<\s*(p|div|h[1-6])(\s+[^>]*)?>/i, '');
  // Strip closing outer block tag
  str = str.replace(/<\/\s*(p|div|h[1-6])\s*>$/i, '');
  return str.trim();
}

