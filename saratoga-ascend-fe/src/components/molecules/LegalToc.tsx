'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const initialId = headings[0]?.id ?? null;
  const [activeId, setActiveId] = useState<string | null>(initialId);
  const [open, setOpen] = useState(false);
  const activeIdRef = useRef<string | null>(initialId);
  /** Last TOC click — kept when user scrolls back up to the TOC panel. */
  const selectedIdRef = useRef<string | null>(null);
  const clickLockUntilRef = useRef(0);

  const headingIds = useMemo(
    () => new Set(headings.map((h) => h.id)),
    [headings],
  );

  const tocId = useMemo(
    () => `legal-toc-${headings.map((h) => h.id).join('-')}`,
    [headings],
  );

  const applyActive = (id: string | null) => {
    if (!id || id === activeIdRef.current) return;
    activeIdRef.current = id;
    setActiveId(id);
  };

  useEffect(() => {
    if (headings.length === 0) return;

    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const syncActiveFromScroll = () => {
      if (Date.now() < clickLockUntilRef.current) return;

      const rem =
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const marker = rem * (3.75 + 4.5 + 1);

      let inView: string | null = null;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= marker) {
          inView = el.id;
        } else {
          break;
        }
      }

      if (inView) {
        // Reading article body — follow scroll position.
        applyActive(inView);
        return;
      }

      // No section in the marker band (e.g. scrolled back up to the TOC).
      // Keep the clicked / hashed item instead of jumping to the first link.
      const hashId = window.location.hash.replace(/^#/, '');
      const fallback =
        selectedIdRef.current && headingIds.has(selectedIdRef.current)
          ? selectedIdRef.current
          : hashId && headingIds.has(hashId)
            ? hashId
            : null;

      if (fallback) {
        applyActive(fallback);
      }
    };

    syncActiveFromScroll();
    window.addEventListener('scroll', syncActiveFromScroll, { passive: true });
    window.addEventListener('resize', syncActiveFromScroll);
    window.addEventListener('hashchange', syncActiveFromScroll);
    return () => {
      window.removeEventListener('scroll', syncActiveFromScroll);
      window.removeEventListener('resize', syncActiveFromScroll);
      window.removeEventListener('hashchange', syncActiveFromScroll);
    };
  }, [headings, headingIds, tocId]);

  if (headings.length === 0) return null;

  const toLink = (heading: LegalTocHeading) => (
    <li key={heading.id} className="m-0">
      <a
        href={`#${heading.id}`}
        onClick={(e) => {
          e.preventDefault();

          selectedIdRef.current = heading.id;
          clickLockUntilRef.current = Date.now() + 1200;
          applyActive(heading.id);

          const target = document.getElementById(heading.id);
          if (target) {
            const reduceMotion = window.matchMedia(
              '(prefers-reduced-motion: reduce)',
            ).matches;
            target.scrollIntoView({
              behavior: reduceMotion ? 'auto' : 'smooth',
              block: 'start',
            });
          }
          history.pushState(null, '', `#${heading.id}`);
        }}
        className={`legal-toc-link ${
          heading.level === 3 ? 'legal-toc-link--nested' : ''
        } ${activeId === heading.id ? 'is-active' : ''}`}
        aria-current={activeId === heading.id ? 'location' : undefined}
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
      <div className="hidden xl:block">
        <h3 className="legal-toc-label">Table of contents</h3>
        {frame()}
      </div>

      <div className="xl:hidden">
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
