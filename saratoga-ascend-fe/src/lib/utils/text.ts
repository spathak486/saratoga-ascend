/**
 * Global text cleaning utility for titles and text coming from CMS / CKEditor.
 * Removes outer HTML tags like <p>, <h2>, <h3>, <span>, unescapes entities,
 * and strips HTML tags cleanly so titles render as clean text without visible tags
 * in headings or alt attributes. Accepts any ReactNode / unknown safely.
 */

export function stripHtml(html?: any): any {
  if (html == null) return '';
  if (typeof html !== 'string') {
    // If it's a number or boolean, return as-is or string
    if (typeof html === 'number' || typeof html === 'boolean') return html;
    // If it's a React element or object, return as-is
    return html;
  }
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
export function cleanHeadingHtml(html?: any): string {
  if (html == null) return '';
  if (typeof html !== 'string') return String(html);
  let str = html.trim();
  // Transform paragraph breaks into line breaks if multiple paragraphs entered
  str = str.replace(/<\/\s*p\s*>\s*<\s*p(\s+[^>]*)?>/gi, '<br/>');
  // Strip opening outer block tag
  str = str.replace(/^<\s*(p|div|h[1-6])(\s+[^>]*)?>/i, '');
  // Strip closing outer block tag
  str = str.replace(/<\/\s*(p|div|h[1-6])\s*>$/i, '');
  return str.trim();
}
