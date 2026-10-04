import React from 'react';
import { Container } from '../atoms';
import { LegalToc } from '../molecules';
import { scanLegalHeadings } from '@/lib/legalToc';

export interface LegalPolicySectionProps {
  title?: string;
  content?: string;
  /** CMS `showToc`. When false the sidebar is omitted and the article is full width. */
  showToc?: boolean;
  titleColor?: string;
  bodyColor?: string;
}

/**
 * Privacy / terms: blog-listing gradient header (Figma 2131:1035) plus
 * blog-details TOC column (Figma 2131:641). `showToc` comes from the CMS.
 */
export const LegalPolicySection: React.FC<LegalPolicySectionProps> = ({
  title,
  content,
  showToc = true,
  titleColor,
  bodyColor,
}) => {
  const { html, headings } = scanLegalHeadings(content ?? '');
  const withToc = Boolean(showToc && headings.length > 0);

  const themeStyle = {
    ...(titleColor ? { '--color-legal-heading': titleColor } : {}),
    ...(bodyColor ? { '--color-legal-body': bodyColor } : {}),
  } as React.CSSProperties;

  return (
    <section className="bg-white text-ink" style={themeStyle}>
      {title ? (
        <div className="bg-cta-gradient px-page pt-[7.25rem] pb-10 text-center min-[90rem]:py-20">
          <h1 className="mx-auto max-w-[68.75rem] text-balance font-serif text-[clamp(2rem,1.2rem+3.4vw,5.625rem)] leading-[1.15] text-white">
            {title}
          </h1>
        </div>
      ) : null}

      <Container className="mx-auto max-w-home py-10 xl:py-[3.75rem]">
        {html ? (
          withToc ? (
            <div className="grid items-start gap-10 lg:grid-cols-[minmax(16rem,32.75rem)_minmax(0,1fr)] lg:gap-16 xl:gap-[6.5rem]">
              <LegalToc
                className="lg:top-[calc(var(--spacing-utility-h)+var(--spacing-nav-h)+1rem)] lg:sticky"
                headings={headings}
              />
              <div
                className="legal-body min-w-0 w-full"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          ) : (
            <div
              className="legal-body w-full"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )
        ) : null}
      </Container>
    </section>
  );
};
