'use client';

import React, { useState } from 'react';
import { GeneralLink } from '../atoms';
import { stripHtml } from '@/lib/utils/text';

export interface ServiceLifecycleCategory {
  id?: string | null;
  documentId?: string | null;
  number?: string | null;
  title: string;
  description?: string | null;
}

export interface ServiceLifecycleTab {
  id?: string | null;
  documentId?: string | null;
  tabId?: string | null;
  label: string;
  heading?: string | null;
  subheading?: string | null;
  categoriesLabel?: string | null;
  supportAreasLabel?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  cta?: {
    label?: string | null;
    href?: string | null;
    target?: string | null;
    isExternal?: boolean | null;
  } | null;
  image?: { url?: string | null; alternativeText?: string | null } | string | null;
  supportAreas?: Array<string | { text?: string | null }> | null;
  categories?: ServiceLifecycleCategory[] | null;
}

export interface ServiceLifecycleSectionProps {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  tabs?: ServiceLifecycleTab[] | null;
}

const DEFAULT_TABS: ServiceLifecycleTab[] = [
  {
    tabId: 'Physician-Staffing',
    label: 'Physician Staffing',
    heading: 'Physician Staffing',
    subheading:
      'Saratoga Ascend supports healthcare and public-sector organizations with qualified physicians for planned staffing needs, specialized programs, temporary coverage, and mission-critical healthcare delivery.',
    categoriesLabel: 'Workforce categories test',
    supportAreasLabel: ' Support areas test',
    cta: { label: 'Discuss this workforce requirement', href: '/', target: '_self' },
    image: { url: '/uploads/Frame_2147226432_424e20f10b.png', alternativeText: 'Physician Staffing' },
    supportAreas: Array.from({ length: 7 }, () => ({ text: 'Support areas' })),
    categories: [
      { documentId: 'ydq8oe1zmh0ogor4e56unqaj', number: '2', title: 't1', description: 't2' },
      {
        documentId: 'suy8slot3021zf7e82acrdh8',
        number: '1',
        title: 'UNDERSTAND',
        description:
          'Clarify objectives, requirements, stakeholders, operating conditions, risks, and desired outcomes.',
      },
      {
        documentId: 'zstqkipqmo6ogmu3k1zs21j1',
        number: '01',
        title: 'Understand the Requirement',
        description: 'Clarify mission context, scope, and desired outcomes.',
      },
    ],
  },
];

function mediaUrl(src?: string | null): string {
  if (!src) return '';
  if (src.startsWith('/uploads/')) {
    const base = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://cms.saratogaascend.com';
    return `${base.replace(/\/+$/, '')}${src}`;
  }
  return src;
}

function tabKey(tab: ServiceLifecycleTab, index: number): string {
  return tab.tabId || tab.id || tab.documentId || `tab-${index}`;
}

export function ServiceLifecycleSection({
  title = 'Healthcare Workforce Solutions',
  subtitle = 'Across the Service Lifecycle',
  description = 'From physicians and nurses to allied health, behavioral health, laboratory, and scientific professionals, Saratoga Ascend supports workforce needs through flexible engagement and delivery models.',
  tabs,
}: ServiceLifecycleSectionProps) {
  const displayTabs = tabs && tabs.length > 0 ? tabs : DEFAULT_TABS;
  const [activeId, setActiveId] = useState(tabKey(displayTabs[0], 0));
  const active = displayTabs.find((tab, index) => tabKey(tab, index) === activeId) ?? displayTabs[0];
  const imageSrc = mediaUrl(
    typeof active.image === 'string' ? active.image : active.image?.url,
  );
  const supportAreas = (active.supportAreas ?? [])
    .map((area) => (typeof area === 'string' ? area : area.text))
    .filter((area): area is string => Boolean(area));
  const categories = active.categories ?? [];
  const ctaLabel = active.cta?.label || active.ctaLabel || 'Discuss this workforce requirement';
  const ctaHref = active.cta?.href || active.ctaHref || '/contact';
  const firstRow = displayTabs.slice(0, 5);
  const secondRow = displayTabs.slice(5);

  return (
    <section
      aria-label={`${title || 'Healthcare Workforce Solutions'} ${subtitle || 'Across the Service Lifecycle'}`.trim()}
      className="relative mx-auto flex w-full max-w-[120rem] flex-col items-center overflow-hidden bg-[#FAFAFA] px-6 py-12 sm:px-8 sm:py-16 xl:px-[7.5rem] xl:py-[6.25rem]"
    >
      <div className="mx-auto mb-8 flex w-full max-w-[71.3125rem] flex-col items-center text-center xl:mb-12">
        <h2
          className="max-w-[69.3125rem] font-serif text-[clamp(2.5rem,1.8rem+2.8vw,72px)] font-normal leading-[1.15] tracking-[0%] text-[#F01424]"
          style={{ fontFamily: "'DM Serif Text', serif" }}
        >
          {stripHtml(title)}
        </h2>
        {subtitle ? (
          <h3
            className="mt-1 max-w-[69.3125rem] font-serif text-[clamp(2rem,1.5rem+2.5vw,64px)] font-normal leading-[1.15] tracking-[0%] text-[#000000]"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            {stripHtml(subtitle)}
          </h3>
        ) : null}
        {description ? (
          <p
            className="mt-5 max-w-[71.3125rem] font-sans text-[clamp(1rem,0.92rem+0.35vw,1.25rem)] font-normal leading-[1.6] text-[#212121] xl:mt-6 xl:text-[1.25rem] xl:leading-[2rem]"
            style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
          >
            {stripHtml(description)}
          </p>
        ) : null}
      </div>

      <div className="mx-auto flex w-full max-w-[105rem] flex-col items-center">
        <div className="mb-8 flex w-full flex-col items-center gap-3 sm:gap-4 xl:mb-12 xl:gap-[1rem]">
          {[firstRow, secondRow].map((row, rowIndex) =>
            row.length > 0 ? (
              <div
                key={rowIndex}
                className="flex w-full flex-wrap items-center justify-center gap-2.5 sm:gap-3 xl:gap-[1rem]"
              >
                {row.map((tab, index) => {
                  const key = tabKey(tab, rowIndex === 0 ? index : index + 5);
                  const selected = key === tabKey(active, displayTabs.indexOf(active));
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveId(key)}
                      className={`box-border flex h-auto min-h-[3.25rem] max-w-full cursor-pointer items-center justify-center rounded-[1rem] px-6 py-2.5 text-center text-[1rem] font-medium leading-none transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#022542] motion-reduce:transition-none sm:h-[3.5rem] sm:whitespace-nowrap sm:text-[1.125rem] xl:text-[1.25rem] ${
                        selected
                          ? 'border-2 border-[#2B88D9] bg-[#EEF7FE] text-[#2B88D9] font-bold shadow-[0px_4px_12px_rgba(43,136,217,0.12)]'
                          : 'border border-[#DAE5ED] bg-white text-[#2F2F2F] hover:border-[#95C3EC] hover:bg-[#F9FBFE]'
                      }`}
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {stripHtml(tab.label)}
                    </button>
                  );
                })}
              </div>
            ) : null,
          )}
        </div>

        <div className="flex w-full flex-col justify-between rounded-[clamp(1.25rem,1rem+0.8vw,1.75rem)] border border-[#DAE5ED] bg-white p-5 shadow-[0px_8px_30px_rgba(0,0,0,0.04)] sm:p-7 xl:p-[clamp(1.75rem,1.2rem+1vw,2.3125rem)]">
          <div className="flex w-full flex-col items-start justify-between gap-8 xl:flex-row xl:gap-[clamp(1.5rem,1rem+1vw,2.4375rem)]">
            {/* Left Content Column */}
            <div className="flex w-full min-w-0 flex-1 flex-col">
              <div className="mb-6 xl:mb-[clamp(1.25rem,1rem+0.5vw,1.75rem)]">
                <h3
                  className="font-serif text-[clamp(1.75rem,1.3rem+1.2vw,2.5rem)] font-normal leading-[1.15] text-[#022542]"
                  style={{ fontFamily: "'DM Serif Text', serif" }}
                >
                  {stripHtml(active.heading)}
                </h3>
                <span className="mt-3 mb-4 block h-[1px] w-[10.9rem] max-w-full bg-[#022542]" aria-hidden="true" />
                <p
                  className="max-w-[55.6875rem] font-sans text-[clamp(1rem,0.85rem+0.4vw,1.5rem)] font-normal leading-[1.45] text-[#000000]"
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  {stripHtml(active.subheading)}
                </p>
              </div>
              <div className="mb-4 flex items-center gap-2 xl:mb-[clamp(0.875rem,0.75rem+0.25vw,1rem)]">
                <span className="h-[1.4375rem] w-[0.375rem] rounded-[0.375rem] bg-[#006CAF]" />
                <h4
                  className="font-sans text-[clamp(1.125rem,0.95rem+0.35vw,1.375rem)] font-semibold leading-[1.3] text-[#000000]"
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  {stripHtml(active.categoriesLabel) || 'Workforce categories'}
                </h4>
              </div>
              {/* Figma node 2633:9041 — Grid: col gap 14px, row gap 14px, width 440px each card */}
              <div className="grid w-full grid-cols-1 gap-3.5 sm:grid-cols-2 xl:gap-[0.875rem]">
                {categories.map((category, index) => (
                  <div
                    key={category.documentId || category.id || `cat-${index}`}
                    className="box-border flex min-h-[9.875rem] flex-col justify-start rounded-[1rem] border border-[#D7E2EB] bg-[#F2F7FA] p-4.5 transition-[border-color] duration-200 ease-out hover:border-[#95C3EC] motion-reduce:transition-none sm:p-5 xl:p-[clamp(1rem,0.85rem+0.3vw,1.25rem)]"
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className="shrink-0 font-sans text-[clamp(1.125rem,0.95rem+0.35vw,1.375rem)] font-semibold leading-[1.3] text-[#2B88D9]"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        {category.number || (index < 9 ? `0${index + 1}` : `${index + 1}`)}
                      </span>
                      <h5
                        className="font-sans text-[clamp(1.125rem,0.95rem+0.35vw,1.375rem)] font-semibold leading-[1.3] text-[#2B88D9]"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        {stripHtml(category.title)}
                      </h5>
                    </div>
                    <p
                      className="mt-2.5 font-sans text-[clamp(0.875rem,0.78rem+0.3vw,1.25rem)] font-normal leading-[1.35] text-[#000000]"
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {stripHtml(category.description)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Showcase Card: exact Figma node 2633:9082 (w=670px, h=760px, rounded=20px, border=1px #006CAF) */}
            <div className="relative flex min-h-[28.75rem] w-full min-w-0 flex-1 flex-col justify-end overflow-hidden rounded-[1.25rem] border border-[#006CAF] p-3 sm:min-h-[32.5rem] sm:p-4 xl:sticky xl:top-24 xl:h-[47.5rem] xl:min-h-[47.5rem] xl:w-[min(41.875rem,45%)] xl:max-w-[41.875rem] xl:shrink-0 xl:p-[0.875rem] 2xl:w-[41.875rem]">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={active.heading || active.label}
                  className="absolute inset-0 z-0 h-full w-full object-cover object-center"
                />
              ) : null}
              {/* Floating Support Areas Badge: exact Figma node 2633:9084 (w=642px, h=222px, rounded=20px, bg white/80, blur 14px) */}
              <div className="relative z-10 w-full rounded-[1.25rem] border border-[#006CAF] bg-white/80 p-4.5 backdrop-blur-[0.875rem] sm:p-5 xl:h-[13.875rem] xl:w-full xl:max-w-[40.125rem] xl:p-[clamp(1rem,0.85rem+0.4vw,1.5rem)]">
                <div className="mb-3.5 flex items-center gap-2 xl:mb-4">
                  <span className="h-[1.4375rem] w-[0.375rem] rounded-[0.375rem] bg-[#006CAF]" />
                  <h4
                    className="font-sans text-[clamp(1.125rem,0.95rem+0.35vw,1.375rem)] font-semibold leading-[1.3] text-[#000000]"
                    style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                  >
                    {stripHtml(active.supportAreasLabel) || 'Support areas'}
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2 xl:gap-y-3">
                  {supportAreas.map((area, index) => (
                    <div key={`${stripHtml(area)}-${index}`} className="flex items-center gap-2.5">
                      <span className="flex size-[1.25rem] shrink-0 items-center justify-center rounded-full bg-[#006CAF] xl:size-[1.375rem]">
                        <svg className="h-3 w-3 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M3.5 8.5L6.5 11.5L12.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span
                        className="font-sans text-[clamp(0.8125rem,0.75rem+0.15vw,0.875rem)] font-normal leading-[1.3] text-[#000000]"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        {area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full border-t border-[#DAE5ED] pt-6 xl:mt-10 xl:pt-8">
            <GeneralLink
              href={ctaHref}
              variant="unstyled"
              target={active.cta?.target === '_blank' || active.cta?.isExternal ? '_blank' : '_self'}
              isExternal={Boolean(active.cta?.isExternal)}
              className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-[0.5rem] border border-[#0C2A4F] px-6 py-4 text-[1.125rem] font-medium leading-[1.875rem] text-[#0C2A4F] transition-all duration-300 hover:bg-[#0C2A4F] hover:text-white active:scale-95 sm:text-[1.25rem]"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
              rightIcon={
                <svg
                  className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              }
            >
              {ctaLabel}
            </GeneralLink>
          </div>
        </div>
      </div>
    </section>
  );
}
