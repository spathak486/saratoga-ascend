'use client';

import React from 'react';

export interface CriticalMissionCard {
  id?: string | number | null;
  documentId?: string | null;
  number?: string | null;
  title: string;
  description: string;
  isHighlighted?: boolean | null;
  icon?: {
    url?: string | null;
    alternativeText?: string | null;
  } | null;
}

export interface CriticalMissionsSectionProps {
  title?: string | null;
  highlightTitle?: string | null;
  description?: string | null;
  cards?: CriticalMissionCard[] | null;
}

// Default 6 items matching exact Figma Frame 2147226540 specs
const DEFAULT_MISSIONS: CriticalMissionCard[] = [
  {
    number: '01',
    title: 'Workforce shortages',
    description: 'Address gaps in qualified healthcare professionals across clinical, public health, and specialized environments.',
  },
  {
    number: '02',
    title: 'Coverage continuity',
    description: 'Maintain seamless care delivery during transitions, leave periods, seasonal fluctuations, and unexpected staffing disruptions.',
  },
  {
    number: '03',
    title: 'Specialized expertise',
    description: 'Access hard-to-find clinical and administrative skill sets required for niche programs, patient populations, and compliance needs.',
  },
  {
    number: '04',
    title: 'Surge requirements',
    description: 'Quickly mobilize personnel and resources to address sudden spikes in patient volume, public health emergencies, or mission shifts.',
  },
  {
    number: '05',
    title: 'Operational complexity',
    description: 'Navigate strict federal and clinical regulations, credentialing standards, multi-facility coordination, and reporting demands.',
  },
  {
    number: '06',
    title: 'Mission readiness',
    description: 'Ensure healthcare teams are fully vetted, trained, and prepared to deliver uninterrupted care in high-stakes environments.',
  },
];

// Inline vector fallback icons matching Figma's icon box
function MissionCardIcon({ index, iconUrl, title }: { index: number; iconUrl?: string | null; title?: string }) {
  if (iconUrl) {
    return <img src={iconUrl} alt={title || 'Icon'} className="w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] object-contain" />;
  }

  // 6 distinctive medical / operational vector designs corresponding to the 6 cards in Figma
  switch (index % 6) {
    case 0:
      return (
        <svg className="w-8 h-8 sm:w-11 sm:h-11" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 1:
      return (
        <svg className="w-8 h-8 sm:w-11 sm:h-11" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 2:
      return (
        <svg className="w-8 h-8 sm:w-11 sm:h-11" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      );
    case 3:
      return (
        <svg className="w-8 h-8 sm:w-11 sm:h-11" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 4:
      return (
        <svg className="w-8 h-8 sm:w-11 sm:h-11" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    default:
      return (
        <svg className="w-8 h-8 sm:w-11 sm:h-11" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="m9 14 2 2 4-4" />
        </svg>
      );
  }
}

export function CriticalMissionsSection({
  title = 'Supporting the people behind critical healthcare missions.',
  highlightTitle,
  description = 'Healthcare organizations need more than access to candidates. They need dependable workforce planning, qualified professionals, operational readiness, and delivery models that can adapt to changing mission requirements.',
  cards,
}: CriticalMissionsSectionProps) {
  const displayCards: CriticalMissionCard[] = cards && cards.length > 0 ? cards : DEFAULT_MISSIONS;

  // Title rendering with optional highlightTitle in Brand Red if configured
  const renderTitle = () => {
    const rawTitle = title?.trim() || 'Supporting the people behind critical healthcare missions.';
    const rawHighlight = highlightTitle?.trim() || '';

    if (!rawHighlight) {
      return <span className="text-[#000000]">{rawTitle}</span>;
    }

    const escaped = rawHighlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'i');

    if (regex.test(rawTitle)) {
      const parts = rawTitle.split(regex);
      return parts.map((part, i) =>
        part.toLowerCase() === rawHighlight.toLowerCase() ? (
          <span key={i} className="text-[#F01424]">
            {part}
          </span>
        ) : (
          <span key={i} className="text-[#000000]">
            {part}
          </span>
        )
      );
    }

    return (
      <>
        <span className="text-[#F01424]">{rawHighlight} </span>
        <span className="text-[#000000]">{rawTitle}</span>
      </>
    );
  };

  return (
    <section
      aria-label={title || 'Critical Healthcare Missions'}
      className="relative mx-auto w-full max-w-[1920px] bg-white px-4 sm:px-6 lg:px-10 2xl:px-[120px] py-10 sm:py-12 xl:py-[80px]"
    >
      <div className="mx-auto flex w-full max-w-[1680px] flex-col items-start justify-between gap-8 sm:gap-10 xl:flex-row xl:gap-8 2xl:gap-[60px]">
        {/* LEFT COLUMN: Sticky copy — fluid width so right side never cuts on 125% zoom */}
        <div className="w-full xl:flex-1 xl:max-w-[850px] 2xl:max-w-[904px] xl:sticky xl:top-[calc(var(--spacing-utility-h)+var(--spacing-nav-h)+1.5rem)]">
          <h2 className="font-serif text-[clamp(2rem,1.4rem+2.5vw,4.5rem)] font-normal leading-[1.15] tracking-tight text-[#000000]">
            {renderTitle()}
          </h2>
          {description && (
            <p className="mt-5 max-w-[820px] font-sans text-[clamp(1.05rem,0.95rem+0.45vw,1.5rem)] font-normal leading-[1.6] text-[#000000] sm:mt-6 xl:mt-8 xl:leading-10">
              {description}
            </p>
          )}
        </div>

        {/* RIGHT COLUMN: Frame 2147226326 — fluid responsive container so it fits 100% & 125% without clipping */}
        <div className="w-full xl:w-[480px] 2xl:w-[582px] shrink-0">
          <div
            tabIndex={0}
            role="region"
            aria-label="Critical Healthcare Mission Cards"
            className="flex h-auto w-full flex-col gap-5 focus:outline-none xl:h-[min(45.625rem,75vh)] xl:overflow-y-auto xl:pr-3 xl:scroll-smooth"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#95C3EC #F4F9FD',
            }}
          >
            {displayCards.map((card, idx) => {
              const stepNum = card.number || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`);

              return (
                <div
                  key={card.id ?? card.documentId ?? `mission-${idx}`}
                  className="relative flex h-auto min-h-[16rem] w-full shrink-0 flex-col justify-between overflow-hidden rounded-[20px] border border-[#95C3EC] bg-[#F4F9FD] p-6 transition-all duration-300 hover:border-[#2B88D9] hover:shadow-md sm:p-7 2xl:p-9 xl:h-[350px] xl:min-h-[350px]"
                >
                  <div className="relative z-10 flex w-full items-start justify-between gap-3">
                    <div className="flex size-14 sm:size-20 2xl:size-[104px] shrink-0 items-center justify-center rounded-[13px] border border-[#000000] bg-[#95C3EC]">
                      <MissionCardIcon index={idx} iconUrl={card.icon?.url} title={card.title} />
                    </div>

                    <span
                      className="pointer-events-none select-none font-sans text-[clamp(4.5rem,10vw,9.5rem)] font-bold leading-none tracking-tight text-[#212121]/30"
                      aria-hidden="true"
                    >
                      {stepNum}
                    </span>
                  </div>

                  <div className="relative z-10 mt-5 xl:mt-auto">
                    <h3 className="mb-2 font-serif text-[clamp(1.35rem,1.15rem+0.7vw,1.75rem)] font-normal leading-tight text-[#2F2F2F]">
                      {card.title}
                    </h3>
                    <p className="max-w-[500px] font-sans text-[clamp(0.95rem,0.88rem+0.3vw,1.1875rem)] font-light leading-[1.45] text-[#212121]">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
