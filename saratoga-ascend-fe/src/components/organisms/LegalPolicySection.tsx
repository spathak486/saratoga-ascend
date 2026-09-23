import React from 'react';
import { Container } from '../atoms';

export interface LegalPolicySectionProps {
  title?: string;
  content?: string;
}

/**
 * Legal document band (Privacy Policy / Terms). Renders the CMS-authored title
 * centred per the Figma legal artboard — Cardo serif in the legal navy with a
 * soft drop shadow — above the CKEditor body typed in Strapi. The rich text
 * (headings, lists, links) is styled by the `.legal-body` cascade in
 * globals.css, so content editors need no design knowledge to compose a page.
 */
export const LegalPolicySection: React.FC<LegalPolicySectionProps> = ({
  title,
  content,
}) => (
  <div className="bg-brand-surface text-brand-navy">
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

      {content ? (
        <div
          className="legal-body"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : null}
    </Container>
  </div>
);