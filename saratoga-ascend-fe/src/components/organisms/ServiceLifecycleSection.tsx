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
      className="relative mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-hidden bg-[#FAFAFA] px-4 py-12 sm:px-8 sm:py-14 xl:px-[120px] xl:py-[80px]"
    >
      <div className="mx-auto mb-8 flex w-full max-w-[1141px] flex-col items-center text-center xl:mb-10">
        <h2
          className="max-w-[1109px] font-serif text-[clamp(2.25rem,1.4rem+2.8vw,4.5rem)] font-normal leading-[1.15] tracking-tight text-[#F01424]"
          style={{ fontFamily: "'DM Serif Text', serif" }}
        >
          {stripHtml(title)}
        </h2>
        {subtitle ? (
          <h3
            className="max-w-[1109px] font-serif text-[clamp(2rem,1.3rem+2.6vw,4.5rem)] font-normal leading-[1.15] tracking-tight text-[#000000]"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            {stripHtml(subtitle)}
          </h3>
        ) : null}
        {description ? (
          <p
            className="mt-6 max-w-[1141px] font-sans text-[clamp(1rem,0.92rem+0.35vw,1.5rem)] font-normal leading-[1.55] text-[#000000] xl:mt-8 xl:text-[24px] xl:leading-[40px]"
            style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
          >
            {stripHtml(description)}
          </p>
        ) : null}
      </div>

      <div className="mx-auto flex w-full max-w-[1680px] flex-col items-center">
        <div className="mb-8 flex w-full flex-col items-center gap-4 sm:gap-5 xl:mb-10 xl:gap-[30px]">
          {[firstRow, secondRow].map((row, rowIndex) =>
            row.length > 0 ? (
              <div
                key={rowIndex}
                className="flex w-full flex-wrap items-center justify-center gap-2.5 sm:gap-3 xl:gap-[16px]"
              >
                {row.map((tab, index) => {
                  const key = tabKey(tab, rowIndex === 0 ? index : index + 5);
                  const selected = key === tabKey(active, displayTabs.indexOf(active));
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveId(key)}
                      className={`box-border flex h-auto min-h-[58px] max-w-full cursor-pointer items-center justify-center rounded-[18px] px-5 py-2 text-center text-[16px] font-semibold leading-7 text-[#2F2F2F] transition-[background-color,border-color,box-shadow] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#022542] motion-reduce:transition-none sm:h-[58px] sm:whitespace-nowrap sm:py-0 sm:text-[18px] xl:text-[22px] ${
                        selected
                          ? 'border border-[#95C3EC] bg-[#F4F9FD] shadow-[0px_0px_4px_rgba(0,0,0,0.19)]'
                          : 'border border-[#DAE5ED] bg-white hover:border-[#95C3EC] hover:bg-[#F9FBFE]'
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

        <div className="flex w-full flex-col justify-between rounded-[28px] border border-[#DAE5ED] bg-white p-5 shadow-[0px_4px_24px_rgba(0,0,0,0.04)] sm:p-8 xl:p-10">
          <div className="flex w-full flex-col items-stretch justify-between gap-8 lg:flex-row xl:gap-[50px]">
            <div className="flex w-full flex-col justify-between lg:w-[58%]">
              <div className="mb-6 xl:mb-8">
                <h3
                  className="font-serif text-[clamp(1.75rem,1.4rem+1vw,2.5rem)] font-normal leading-[34px] text-[#022542]"
                  style={{ fontFamily: "'DM Serif Text', serif" }}
                >
                  {stripHtml(active.heading)}
                </h3>
                <span className="mt-3 mb-4 block h-px w-[174px] max-w-full bg-[#022542]" aria-hidden="true" />
                <p
                  className="max-w-[891px] font-sans text-[16px] font-normal leading-[26px] text-[#000000] sm:text-[20px] sm:leading-[30px] xl:text-[24px] xl:leading-[34px]"
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  {stripHtml(active.subheading)}
                </p>
              </div>
              <div className="mb-4 flex items-center gap-2 xl:mb-6">
                <span className="h-6 w-1.5 rounded-[6px] bg-[#006CAF]" />
                <h4
                  className="font-sans text-[18px] font-semibold leading-[28px] text-[#000000] sm:text-[20px] xl:text-[22px]"
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  {stripHtml(active.categoriesLabel) || 'Workforce categories'}
                </h4>
              </div>
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:gap-[16px]">
                {categories.map((category, index) => (
                  <div
                    key={category.documentId || category.id || `cat-${index}`}
                    className="box-border flex min-h-[7.5rem] flex-col gap-1.5 rounded-[16px] border border-[#D7E2EB] bg-[#F2F7FA] p-4 transition-[border-color] duration-200 ease-out hover:border-[#95C3EC] motion-reduce:transition-none sm:p-5 xl:min-h-[8.75rem]"
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className="shrink-0 font-sans text-[18px] font-semibold leading-7 text-[#2B88D9] xl:text-[22px]"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        {category.number || `0${index + 1}`}
                      </span>
                      <h5
                        className="font-sans text-[18px] font-semibold leading-7 text-[#2B88D9] xl:text-[22px]"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        {stripHtml(category.title)}
                      </h5>
                    </div>
                    <p
                      className="pl-7 font-sans text-[14px] font-normal leading-snug text-[#000000] sm:text-[16px] xl:text-[20px] xl:leading-normal"
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {stripHtml(category.description)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex min-h-[460px] w-full flex-col justify-end overflow-hidden rounded-[20px] border border-[#006CAF] p-4 sm:min-h-[520px] sm:p-6 lg:w-[42%] xl:min-h-[640px] xl:p-[20px]">
              {imageSrc ? (
                <img src={imageSrc} alt={active.heading || active.label} className="absolute inset-0 z-0 h-full w-full object-cover" />
              ) : null}
              <div className="relative z-10 w-full rounded-[20px] border border-[#006CAF] bg-white/80 p-5 backdrop-blur-[7px] sm:p-6 xl:p-[24px]">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-6 w-1.5 rounded-[6px] bg-[#006CAF]" />
                  <h4
                    className="font-sans text-[18px] font-semibold leading-[28px] text-[#000000] sm:text-[20px] xl:text-[22px]"
                    style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                  >
                    {stripHtml(active.supportAreasLabel) || 'Support areas'}
                  </h4>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                  {supportAreas.map((area, index) => (
                    <div key={`${stripHtml(area)}-${index}`} className="flex items-center gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#006CAF] xl:h-[22px] xl:w-[22px]">
                        <svg className="h-3 w-3 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M3.5 8.5L6.5 11.5L12.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span
                        className="font-sans text-[13px] font-normal leading-[18px] text-[#000000] sm:text-[14px]"
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
              className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-[8px] border border-[#0C2A4F] px-6 py-4 text-[18px] font-medium leading-[30px] text-[#0C2A4F] transition-all duration-300 hover:bg-[#0C2A4F] hover:text-white active:scale-95 sm:text-[20px]"
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
