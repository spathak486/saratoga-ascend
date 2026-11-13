'use client';

import React, { useState } from 'react';
import { CtaButton } from '../molecules/CtaButton';
import { cleanHeadingHtml } from '@/lib/utils/text';

export interface ProcurementContractItem {
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

export interface ProcurementPathwayCard {
  id?: string | number | null;
  documentId?: string | null;
  cardTitle: string;
  cardSubtitle?: string | null;
  description?: string | null;
  cta?: {
    label?: string | null;
    href?: string | null;
    target?: string | null;
    isExternal?: boolean | null;
  } | null;
  items?: ProcurementContractItem[] | null;
}

export interface FederalProcurementPathwaysSectionProps {
  title?: string | null;
  description?: string | null;
  cards?: ProcurementPathwayCard[] | null;
}

const DEFAULT_TIMELINE_ITEMS_1: ProcurementContractItem[] = [
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

const DEFAULT_CARDS: ProcurementPathwayCard[] = [
  {
    cardTitle: 'How buyers may engage',
    cardSubtitle: 'Direct agency procurement, schedule orders & task order contracting',
    description:
      'Start with the mission requirement and procurement strategy. We can review capability alignment, clarify the relevant contract record, and discuss whether a direct opportunity or a partner-led route is appropriate.',
    cta: {
      label: 'Start a Conversation',
      href: '/contact',
      target: '_self',
      isExternal: false,
    },
    items: DEFAULT_TIMELINE_ITEMS_1,
  },
  {
    cardTitle: 'Agency-Specific IDIQs, BPAs & Teaming Vehicles',
    cardSubtitle: 'Flexible contracting pathways designed for planned growth and surge requirements',
    description:
      'Federal and civilian healthcare programs can leverage Saratoga Ascend through dedicated blanket purchase agreements, indefinite delivery contracts, and established subcontracting arrangements.',
    cta: {
      label: 'Discuss Teaming & Vehicles',
      href: '/contact',
      target: '_self',
      isExternal: false,
    },
    items: [
      {
        title: 'Veterans Health Administration & Military Health Systems',
        contractNumber: 'VA-DHA-PATHWAY-01',
        subtitle: 'Clinical Surge Deployment & Credentialed Healthcare Delivery',
        categoryLabel: 'Covered Specializations & Clinical Areas:',
        categories:
          'Physicians, Nurse Practitioners & Specialized Nursing\nBehavioral Health & Clinical Psychology\nAllied Health, Pharmacy & Laboratory Operations',
        link: {
          label: 'Inquire about VHA/DHA Support',
          href: '/contact',
          target: '_self',
        },
      },
      {
        title: 'State & Local Public Health Cooperative Agreements',
        contractNumber: 'SLED-COOP-02',
        subtitle: 'Cooperative purchasing schedules and emergency workforce response',
        categoryLabel: 'Service Scope:',
        categories:
          'Epidemiological Monitoring & Public Health Outreach\nState Hospital System Augmentation\nCommunity Health Clinic Staffing',
        link: {
          label: 'Explore State/Local Pathways',
          href: '/contact',
          target: '_self',
        },
      },
    ],
  },
];

export function FederalProcurementPathwaysSection({
  title = 'Federal procurement pathways aligned to agency requirements',
  description = 'Federal agencies may acquire services through open-market solicitations, agency-specific IDIQs and BPAs, governmentwide acquisition contracts, or existing contract holders. Saratoga Ascend can discuss direct opportunities and teaming arrangements where scope and eligibility align.',
  cards,
}: FederalProcurementPathwaysSectionProps) {
  const displayCards = cards && cards.length > 0 ? cards : DEFAULT_CARDS;

  // Accordion state: by default, the first card is expanded
  const [expandedCardIndices, setExpandedCardIndices] = useState<number[]>([0]);

  const toggleCardAccordion = (index: number) => {
    setExpandedCardIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const cleanTitle = title?.trim() || 'Federal procurement pathways aligned to agency requirements';
  const cleanDesc = description?.trim() || '';

  return (
    <section
      aria-label="Federal Procurement Pathways"
      className="relative mx-auto w-full max-w-[1920px] overflow-hidden bg-[#FAFAFA] px-4 py-12 sm:px-8 sm:py-16 md:px-12 xl:px-[118px] xl:py-[80px]"
    >
      {/* Group 2085665802: Top Header Area (CKEditor Title & Description) */}
      <div className="mx-auto mb-10 flex w-full max-w-[1680px] flex-col items-start xl:mb-14">
        {cleanTitle ? (
          <div
            className="ck-content max-w-[1512px] font-serif text-[clamp(2.25rem,1.5rem+3vw,4.5rem)] font-normal leading-[1.15] tracking-tight text-[#000000] [&_p]:m-0 [&_p]:font-inherit [&_p]:text-inherit [&_p]:leading-inherit [&_h1]:m-0 [&_h1]:font-inherit [&_h1]:text-inherit [&_h1]:leading-inherit [&_h2]:m-0 [&_h2]:font-inherit [&_h2]:text-inherit [&_h2]:leading-inherit [&_h3]:m-0 [&_h3]:font-inherit [&_h3]:text-inherit [&_h3]:leading-inherit"
            style={{ fontFamily: "'DM Serif Text', serif" }}
            dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(cleanTitle) }}
          />
        ) : null}

        {cleanDesc ? (
          <div
            className="ck-content mt-6 max-w-[1449px] font-sans text-[clamp(1.125rem,1rem+0.5vw,1.5rem)] font-normal leading-[1.65] text-[#000000] xl:mt-7 xl:text-[24px] xl:leading-[40px] [&_p]:m-0 [&_p]:font-inherit [&_p]:text-inherit [&_p]:leading-inherit"
            style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
            dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(cleanDesc) }}
          />
        ) : null}
      </div>

      {/* Multiple Order Landing Cards: each one is an Accordion Card */}
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-8 xl:gap-12">
        {displayCards.map((card, cardIndex) => {
          const isCardOpen = expandedCardIndices.includes(cardIndex);
          const ctaLabel = card.cta?.label || 'Start a Conversation';
          const ctaHref = card.cta?.href || '/contact';
          const items = card.items && card.items.length > 0 ? card.items : DEFAULT_TIMELINE_ITEMS_1;

          return (
            <div
              key={card.documentId || card.id || `card-${cardIndex}`}
              className="relative box-border flex w-full flex-col rounded-[24px] border border-black/80 bg-gradient-to-b from-[#F1F8FE] to-[#FFFFFF] p-6 shadow-[0px_0px_20px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0px_4px_24px_rgba(0,0,0,0.16)] sm:rounded-[32px] sm:p-10 xl:p-[40px_60px]"
            >
              {/* Accordion Card Header: Clickable trigger with Title & Chevron */}
              <button
                type="button"
                onClick={() => toggleCardAccordion(cardIndex)}
                aria-expanded={isCardOpen}
                className="group flex w-full cursor-pointer items-start justify-between text-left transition-colors"
              >
                <div className="flex flex-col pr-4">
                  <h3
                    className="font-sans text-[clamp(1.75rem,1.25rem+1.5vw,2.75rem)] font-semibold leading-[1.25] text-[#000000] transition-colors group-hover:text-[#2B88D9]"
                    style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                  >
                    {card.cardTitle || 'How buyers may engage'}
                  </h3>

                  {card.cardSubtitle ? (
                    <p
                      className="mt-2 font-sans text-[clamp(1rem,0.9rem+0.4vw,1.35rem)] font-light leading-[1.5] text-[#616161]"
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {card.cardSubtitle}
                    </p>
                  ) : null}
                </div>

                {/* Big Accordion Chevron Toggle Node */}
                <span
                  className={`mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-[#2B88D9] bg-white text-[#2B88D9] shadow-sm transition-all duration-300 sm:size-12 ${
                    isCardOpen ? 'rotate-180 bg-[#2B88D9] text-white shadow-md' : 'hover:bg-[#F1F8FE]'
                  }`}
                  aria-hidden="true"
                >
                  <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              {/* Accordion Card Collapsible Body: Description, CTA, Divider, and Timeline inside! */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isCardOpen ? 'mt-6 grid-rows-[1fr] opacity-100 sm:mt-8' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                }`}
              >
                <div className="overflow-hidden">
                  {/* Inside: Description + CTA Button Row */}
                  <div className="flex w-full flex-col items-start justify-between gap-6 pt-2 lg:flex-row lg:items-center">
                    {card.description ? (
                      <div
                        className="ck-content max-w-[1049px] font-sans text-[clamp(1rem,0.9rem+0.4vw,1.5rem)] font-light leading-[1.55] text-[#212121] xl:text-[24px] xl:leading-[37px] [&_p]:m-0 [&_p]:font-inherit [&_p]:text-inherit [&_p]:leading-inherit"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                        dangerouslySetInnerHTML={{ __html: cleanHeadingHtml(card.description) }}
                      />
                    ) : null}

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

                  {/* Timeline & Contract Items inside Accordion */}
                  <div className="relative flex w-full flex-col">
                    {items.map((item, itemIndex) => {
                      const isLastItem = itemIndex === items.length - 1;

                      // Parse categories text lines or clean HTML
                      const categoriesRaw = item.categories || '';
                      const categoryLines = categoriesRaw
                        ? categoriesRaw
                            .replace(/<[^>]*>/g, '')
                            .split(/\r?\n/)
                            .map((l) => l.trim())
                            .filter(Boolean)
                        : [];

                      return (
                        <div key={item.documentId || item.id || `item-${itemIndex}`} className="relative flex w-full gap-4 sm:gap-6 xl:gap-8">
                          {/* Timeline Column: indicator circle & dashed vertical line */}
                          <div className="relative flex flex-col items-center">
                            {/* Circle Node (Ellipse 2548 + Ellipse 2542) */}
                            <div className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-[1.33px] border-black bg-white sm:size-10">
                              <span className="size-[18px] rounded-full bg-[#2B88D9] sm:size-[21.33px]" />
                            </div>

                            {/* Dashed vertical line (Line 235) */}
                            {!isLastItem ? (
                              <div className="w-0 flex-1 border-r-[1.33px] border-dashed border-black/80" />
                            ) : null}
                          </div>

                          {/* Item Content */}
                          <div className={`flex flex-1 flex-col ${isLastItem ? 'pb-2' : 'pb-8 sm:pb-12 xl:pb-14'}`}>
                            <div className="flex flex-col pr-4">
                              <h4
                                className="font-sans text-[clamp(1.125rem,1rem+0.6vw,1.75rem)] font-semibold leading-[1.25] text-[#212121] xl:text-[28px] xl:leading-[35px]"
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

                            {/* Details & Categories Drawer */}
                            <div className="mt-4 sm:mt-6">
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
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
