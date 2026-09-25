'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { LegalTocHeading } from '@/lib/legalToc';

export interface LegalTocProps {
  headings: readonly LegalTocHeading[];
  className?: string;
}

/**
 * Table-of-contents navigation for legal documents, styled as the site's navy
 * panel card. The list is derived from the h2/h3 headings of the CKEditor body
 * authored in Strapi (see the `scanLegalHeadings` helper), so content editors
 * control the sidebar simply by writing headings in the admin — no separate
 * BE schema is required.
 *
 * Desktop: sticky sidebar column with a scroll-spy highlight. Mobile: a
 * collapsible "On this page" disclosure above the body, mirroring the OneTrust
 * notice pattern.
 */
export const LegalToc: React.FC<LegalTocProps> = ({
  headings,
  className = '',
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const tocId = useMemo(
    () => `legal-toc-${headings.map((h) => h.id).join('-')}`,
    [headings],
  );

  useEffect(() => {
    if (headings.length === 0) return;

    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings, tocId]);

  if (headings.length === 0) return null;

  const toLink = (heading: LegalTocHeading) => (
    <li key={heading.id} className="m-0">
      <a
        href={`#${heading.id}`}
        className={`legal-toc-link focus-brand ${
          heading.level === 3 ? 'legal-toc-link--nested' : ''
        } ${activeId === heading.id ? 'is-active' : ''}`}
      >
        {heading.text}
      </a>
    </li>
  );

  const list = <ul className="legal-toc-list">{headings.map(toLink)}</ul>;

  return (
    <nav
      className={`legal-toc-panel ${className}`.trim()}
      aria-label="In this policy"
      id={tocId}
    >
      <div className="hidden lg:block">
        <h2 className="legal-toc-label">In this policy</h2>
        {list}
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls={`${tocId}-mobile`}
          className="legal-toc-toggle"
        >
          <span aria-hidden="true" className="legal-toc-label">
            In this policy
          </span>
          <span
            aria-hidden="true"
            className="mt-1 mb-2 text-left text-brand-navy"
          >
            {open ? '−' : '+'}
          </span>
        </button>
        {open ? (
          <ul id={`${tocId}-mobile`} className="legal-toc-list">
            {headings.map(toLink)}
          </ul>
        ) : null}
      </div>
    </nav>
  );
};