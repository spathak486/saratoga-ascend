'use client';

import React, { useState } from 'react';
import { CtaButton } from '../molecules/CtaButton';

export interface ProcurementPathwayItem {
  id?: string | number | null;
  documentId?: string | null;
  title: string;
  contractNumber?: string | null;
  subtitle?: string | null;
  categoryLabel?: string | null;
  categories?: string | null;
  description?: string | null;
  link?: {
    label?: string | null;
    href?: string | null;
    target?: string | null;
    isExternal?: boolean | null;
  } | null;
}

export interface FederalProcurementPathwaysSectionProps {
  title?: string | null;
  description?: string | null;
  cardTitle?: string | null;
  cardDescription?: string | null;
  cta?: {
    label?: string | null;
    href?: string | null;
    target?: string | null;
    isExternal?: boolean | null;
  } | null;
  cards?: ProcurementPathwayItem[] | null;
}

const DEFAULT_CARDS: ProcurementPathwayItem[] = [
  {
    title: 'GSA Alliant 2 Governmentwide Acquisition Contract (GWAC)',
    contractNumber: '47QTCK18D0044',
    subtitle: 'Contract Number: 47QTCK18D0044 Learn more about Alliant 2',
    categoryLabel: 'GSA Multiple Award Schedule (MAS) Category:',
    categories:
      '54151HEAL: Health Information Technology Services\n54151S: Information Technology Professional Services\n541611: Administrative Management & General Management Consulting Services\n561422: Automated Contact Center Solutions (ACCS)\n54151HACS: Highly Adaptive Cybersecurity Services\n518210C: Cloud and Cloud-Related IT Professional Services',
    link: {
      label: 'Learn more about Alliant 2',
      href: '/contact',
      target: '_self',
    },
  },
  {
    title: 'GSA Multiple Award Schedule (MAS)',
    contractNumber: '47QTCK18D0044',
    subtitle: 'Contract Number: 47QTCK18D0044 Learn more about MAS',
    categoryLabel: 'GSA Multiple Award Schedule (MAS) Category:',
    categories:
      '54151HEAL: Health Information Technology Services\n54151S: Information Technology Professional Services\n541611: Administrative Management & General Management Consulting Services\n561422: Automated Contact Center Solutions (ACCS)',
    link: {
      label: 'Learn more about MAS',
      href: '/contact',
      target: '_self',
    },
  },
  {
    title: 'GSA Alliant 3 Governmentwide Acquisition Contract (GWAC)',
    contractNumber: '47QTCK18D0044',
    subtitle: 'Contract Number: 47QTCK18D0044 Learn more about Alliant 3',
    categoryLabel: 'GSA Multiple Award Schedule (MAS) Category:',
    categories:
      '54151HEAL: Health Information Technology Services\n54151S: Information Technology Professional Services\n541611: Administrative Management & General Management Consulting Services',
    link: {
      label: 'Learn more about Alliant 3',
      href: '/contact',
      target: '_self',
    },
  },
  {
    title: 'GSA One Acquisition Solution for Integrated Services + (OASIS+) Governmentwide Multi Award Contract (MAC)',
    contractNumber: '47QTCK18D0044',
    subtitle: 'Contract Number: 47QTCK18D0044 Learn more about OASIS+',
    categoryLabel: 'Scope & Specialized Domains:',
    categories:
      'Program Management Services\nManagement and Advisory Services\nTechnical and Engineering Services\nSpecialized Healthcare Operational Support',
    link: {
      label: 'Learn more about OASIS+',
      href: '/contact',
      target: '_self',
    },
  },
];

export function FederalProcurementPathwaysSection({
  title = 'Federal procurement pathways aligned to agency requirements',
  description = 'Federal agencies may acquire services through open-market solicitations, agency-specific IDIQs and BPAs, governmentwide acquisition contracts, or existing contract holders. Saratoga Ascend can discuss direct opportunities and teaming arrangements where scope and eligibility align.',
  cardTitle = 'How buyers may engage',
  cardDescription = 'Start with the mission requirement and procurement strategy. We can review capability alignment, clarify the relevant contract record, and discuss whether a direct opportunity or a partner-led route is appropriate.',
  cta = {
    label: 'Start a Conversation',
    href: '/contact',
  },
  cards,
}: FederalProcurementPathwaysSectionProps) {
  const displayCards = cards && cards.length > 0 ? cards : DEFAULT_CARDS;

  // Accordion state: by default, the first card is expanded
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0]);

  const toggleAccordion = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const ctaLabel = cta?.label || 'Start a Conversation';
  const ctaHref = cta?.href || '/contact';

  return (
    <section
      aria-label={title || 'Federal Procurement Pathways'}
      className="relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#FAFAFA] px-4 py-12 sm:px-8 sm:py-16 md:px-12 xl:px-[118px] xl:py-[80px]"
    >
      {/* Group 2085665802: Header Area */}
      <div className="mx-auto mb-10 flex w-full max-w-[1680px] flex-col items-start xl:mb-14">
        <h2
          className="max-w-[1512px] font-serif text-[clamp(2.25rem,1.5rem+3vw,4.5rem)] font-normal leading-[1.15] tracking-tight text-[#000000]"
          style={{ fontFamily: "'DM Serif Text', serif" }}
        >
          {title}
        </h2>
        {description ? (
          <p
            className="mt-6 max-w-[1449px] font-sans text-[clamp(1.125rem,1rem+0.5vw,1.5rem)] font-normal leading-[1.65] text-[#000000] xl:mt-7 xl:text-[24px] xl:leading-[40px]"
            style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
          >
            {description}
          </p>
        ) : null}
      </div>

      {/* Order landing: Main Card Container */}
      <div className="relative mx-auto box-border flex w-full max-w-[1680px] flex-col rounded-[24px] border border-black/80 bg-gradient-to-b from-[#F1F8FE] to-[#FFFFFF] p-6 shadow-[0px_0px_20px_rgba(0,0,0,0.12)] sm:rounded-[32px] sm:p-10 xl:p-[40px_60px]">
        {/* Group 2085665803: How buyers may engage + CTA */}
        <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-[1049px]">
            <h3
              className="font-sans text-[clamp(1.75rem,1.25rem+1.5vw,2.75rem)] font-semibold leading-[1.25] text-[#000000]"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
            >
              {cardTitle}
            </h3>
            {cardDescription ? (
              <p
                className="mt-3.5 font-sans text-[clamp(1rem,0.9rem+0.4vw,1.5rem)] font-light leading-[1.55] text-[#212121] xl:text-[24px] xl:leading-[37px]"
                style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
              >
                {cardDescription}
              </p>
            ) : null}
          </div>

          {ctaLabel ? (
            <div className="shrink-0 self-start lg:self-center">
              <CtaButton
                href={ctaHref}
                shape="square"
                buttonVariant="cta"
                className="min-h-[56px] px-6 text-[18px] sm:min-h-[60px] sm:px-7 sm:text-[20px]"
              >
                {ctaLabel}
              </CtaButton>
            </div>
          ) : null}
        </div>

        {/* Vector 7223: Divider Line */}
        <div className="my-8 w-full border-t-2 border-[#3E7DAB] xl:my-10" />

        {/* Timeline & Accordion Group 2085665801 */}
        <div className="relative flex w-full flex-col">
          {displayCards.map((item, index) => {
            const isExpanded = expandedIndices.includes(index);
            const isLast = index === displayCards.length - 1;

            // Clean lines from categories text or HTML
            const categoriesRaw = item.categories || '';
            const categoryLines = categoriesRaw
              ? categoriesRaw
                  .replace(/<[^>]*>/g, '')
                  .split(/\r?\n/)
                  .map((l) => l.trim())
                  .filter(Boolean)
              : [];

            return (
              <div key={item.documentId || item.id || `pathway-${index}`} className="relative flex w-full gap-4 sm:gap-6 xl:gap-8">
                {/* Timeline Column: indicator circle & dashed vertical line */}
                <div className="relative flex flex-col items-center">
                  {/* Circle Node (Ellipse 2548 + Ellipse 2542) */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    aria-label={`Toggle ${item.title}`}
                    className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-[1.33px] border-black bg-white transition-transform duration-200 hover:scale-110 sm:size-10"
                  >
                    <span className="size-[18px] rounded-full bg-[#2B88D9] sm:size-[21.33px]" />
                  </button>

                  {/* Dashed vertical line (Line 235) */}
                  {!isLast ? (
                    <div className="w-0 flex-1 border-r-[1.33px] border-dashed border-black/80" />
                  ) : null}
                </div>

                {/* Accordion Content Block */}
                <div className={`flex flex-1 flex-col ${isLast ? 'pb-2' : 'pb-8 sm:pb-12 xl:pb-14'}`}>
                  {/* Clickable Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isExpanded}
                    className="group flex w-full cursor-pointer items-start justify-between text-left transition-colors duration-200"
                  >
                    <div className="flex flex-col pr-4">
                      <h4
                        className="font-sans text-[clamp(1.125rem,1rem+0.6vw,1.75rem)] font-semibold leading-[1.25] text-[#212121] transition-colors group-hover:text-[#2B88D9] xl:text-[28px] xl:leading-[35px]"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        {item.title}
                      </h4>

                      {/* Subtitle / Contract Number */}
                      {item.subtitle || item.contractNumber ? (
                        <p
                          className="mt-2 font-sans text-[clamp(1rem,0.9rem+0.4vw,1.5rem)] font-light leading-[1.55] text-[#212121] xl:text-[24px] xl:leading-[37px]"
                          style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                        >
                          {item.subtitle || `Contract Number: ${item.contractNumber}`}
                        </p>
                      ) : null}
                    </div>

                    {/* Accordion Chevron Icon */}
                    <span
                      className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-[#2B88D9]/40 bg-white text-[#2B88D9] transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 bg-[#2B88D9] text-white' : ''
                      }`}
                      aria-hidden="true"
                    >
                      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  {/* Accordion Collapsible Panel */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isExpanded ? 'mt-4 grid-rows-[1fr] opacity-100 sm:mt-6' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="rounded-[16px] border border-[#DAE5ED] bg-white/70 p-4 sm:p-6 xl:p-8">
                        {item.categoryLabel ? (
                          <h5
                            className="font-sans text-[18px] font-semibold leading-[1.3] text-[#212121] sm:text-[22px] xl:text-[28px] xl:leading-[35px]"
                            style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                          >
                            {item.categoryLabel}
                          </h5>
                        ) : null}

                        {categoryLines.length > 0 ? (
                          <ul className="mt-4 flex flex-col gap-2 font-sans text-[16px] font-light leading-[1.6] text-[#212121] sm:text-[20px] xl:text-[24px] xl:leading-[46px]">
                            {categoryLines.map((line, lIdx) => (
                              <li key={lIdx} className="flex items-start gap-2.5">
                                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#2B88D9]" />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        ) : item.description ? (
                          <p className="mt-4 font-sans text-[16px] font-light leading-[1.6] text-[#212121] sm:text-[20px] xl:text-[24px]">
                            {item.description}
                          </p>
                        ) : null}

                        {item.link?.label && item.link?.href ? (
                          <div className="mt-6">
                            <a
                              href={item.link.href}
                              target={item.link.target || '_self'}
                              className="inline-flex items-center gap-2 font-sans text-[16px] font-semibold text-[#006CAF] underline transition-colors hover:text-[#022542] sm:text-[18px]"
                            >
                              <span>{item.link.label}</span>
                              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

