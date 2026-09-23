import React from 'react';
import { Container } from '../atoms';
import { LegalToc } from '../molecules';
import { scanLegalHeadings } from '@/lib/legalToc';

export interface LegalPolicySectionProps {
  title?: string;
  content?: string;
  /** Show the sticky table-of-contents sidebar. Defaults to on; statement
   *  pages like Terms & Conditions turn it off from the CMS. */
  showToc?: boolean;
  /** Optional title colour override (e.g. "#0F3D60"). Falls back to the
   *  legal navy token. */
  titleColor?: string;
  /** Optional body (paragraph) colour override (e.g. "#000000"). */
  bodyColor?: string;
}

/**
 * Legal document band (Privacy Policy / Terms). Renders the CMS-authored
 * title centred per the Figma legal artboard — Cardo serif in the legal navy
 * with a soft drop shadow — above the CKEditor rich text typed in Strapi.
 *
 * Two layouts, both driven from the CMS:
 *  - `showToc: true` (Privacy Policy): a sticky table-of-contents sidebar
 *    beside the body, derived from the h2/h3 headings in that body (see
 *    `scanLegalHeadings`) — the same way OneTrust builds its notice menu.
 *  - `showToc: false` (Terms & Conditions): a simple centred statement with
 *    no sidebar.
 *
 * Both honour `titleColor` / `bodyColor` overrides via CSS variables so a
 * page can carry its own theme without touching the design tokens.
 */
export const LegalPolicySection: React.FC<LegalPolicySectionProps> = ({
  title,
  content,
  showToc = true,
  titleColor,
  bodyColor,
}) => {
  const { html, headings } = scanLegalHeadings(content ?? '');

  const themeStyle = {
    ...(titleColor ? { '--color-brand-navy-legal': titleColor } : {}),
    ...(bodyColor ? { '--color-legal-body': bodyColor } : {}),
  } as React.CSSProperties;

  return (
    <div className="bg-brand-surface text-brand-navy" style={themeStyle}>
      <Container className="mx-auto max-w-[103.6875rem] py-section">
        {title ? (
          <>
            <h1
              className="font-serif text-center text-legal-title text-brand-navy-legal"
              style={{ textShadow: '0 4px 4px rgb(0 0 0 / 0.25)' }}
            >
              {title}
            </h1>
            {/* Divider below the title — Figma "Line 23": 1px solid black,
                ~1635px wide, centred on the 1920 artboard. */}
            <hr
              className="mx-auto mt-8 mb-block h-px max-w-[102.1875rem] border-0 bg-black"
              aria-hidden="true"
            />
          </>
        ) : null}

        {html ? (
          headings.length > 0 && showToc ? (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-start lg:gap-24">
              <LegalToc
                className="lg:top-[calc(var(--spacing-utility-h)+var(--spacing-nav-h)+1rem)] lg:sticky"
                headings={headings}
              />
              <div
                className="legal-body min-w-0 max-w-[63.5625rem]"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          ) : (
            <div
              className="legal-body max-w-[63.5625rem]"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )
        ) : null}
      </Container>
    </div>
  );
};