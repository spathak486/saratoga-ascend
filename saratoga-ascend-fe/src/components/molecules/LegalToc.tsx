'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { LegalTocHeading } from '@/lib/legalToc';

export interface LegalTocProps {
  headings: readonly LegalTocHeading[];
  className?: string;
}

/**
 * Blog-details table of contents (Figma 2131:641). Shown only when the CMS
 * Legal Content `showToc` flag is on and the body has h2/h3 headings.
 */
export const LegalToc: React.FC<LegalTocProps> = ({
  headings,
  className = '',
}) => {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  );
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
        onClick={() => setOpen(false)}
        className={`legal-toc-link ${
          heading.level === 3 ? 'legal-toc-link--nested' : ''
        } ${activeId === heading.id ? 'is-active' : ''}`}
      >
        {heading.text}
      </a>
    </li>
  );

  const backToTop = (
    <a
      href="#main"
      className="legal-toc-top"
      onClick={() => setOpen(false)}
    >
      <span className="legal-toc-top-icon" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 16.25V8.75M12 8.75L8.5 12.25M12 8.75L15.5 12.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      Back to top
    </a>
  );

  const frame = (listId?: string) => (
    <div className="legal-toc-frame">
      <ul id={listId} className="legal-toc-list">
        {headings.map(toLink)}
      </ul>
      {backToTop}
    </div>
  );

  return (
    <nav
      className={`legal-toc-panel ${className}`.trim()}
      aria-label="Table of contents"
      id={tocId}
    >
      <div className="hidden lg:block">
        <h2 className="legal-toc-label">Table of contents</h2>
        {frame()}
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls={`${tocId}-mobile`}
          className="legal-toc-toggle"
        >
          <span className="legal-toc-label">Table of contents</span>
          <span aria-hidden="true" className="legal-toc-toggle-icon">
            {open ? '−' : '+'}
          </span>
        </button>
        {open ? frame(`${tocId}-mobile`) : null}
      </div>
    </nav>
  );
};
