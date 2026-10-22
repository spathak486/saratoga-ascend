import React from 'react';
import { Container, Heading, Section } from '../atoms';
import { CaretDownIcon } from '../atoms/icons';

type ActionTone = 'sky' | 'red';

export interface ContactPathway {
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  actionTone: ActionTone;
  iconSrc: string;
  swooshSrc: string;
}

export interface ContactPathwaysSectionProps {
  titleLead?: string;
  titleClose?: string;
  description?: string;
  pathways?: ContactPathway[];
}

const DEFAULT_PATHWAYS: ContactPathway[] = [
  {
    title: 'Government Buyers',
    description:
      'Explore contracts, procurement pathways, capabilities, and buyer information.',
    actionLabel: 'Explore Contracts',
    href: '/government-buyers',
    actionTone: 'sky',
    iconSrc: '/images/contact/pathways/buyers.svg',
    swooshSrc: '/images/contact/pathways/swoosh-blue.svg',
  },
  {
    title: 'Solutions & Capabilities',
    description: 'Solutions & CapabilitiesSolutions & Capabilities',
    actionLabel: 'Explore What We Do',
    href: '/what-we-do',
    actionTone: 'red',
    iconSrc: '/images/contact/pathways/solutions.svg',
    swooshSrc: '/images/contact/pathways/swoosh-pink.svg',
  },
  {
    title: 'Career Opportunities',
    description:
      'Find open positions across healthcare, IT, allied healthcare, and mission-support functions.',
    actionLabel: 'Explore Careers',
    href: '/careers',
    actionTone: 'sky',
    iconSrc: '/images/contact/pathways/careers.svg',
    swooshSrc: '/images/contact/pathways/swoosh-blue.svg',
  },
];

const toneClass: Record<ActionTone, string> = {
  sky: 'border-brand-sky text-brand-sky',
  red: 'border-brand-red text-brand-red',
};

/**
 * Contact pathways (Figma 2219:1636). Copy is props with the frame as the
 * fallback. The middle card body is the placeholder text in the file.
 */
export const ContactPathwaysSection: React.FC<ContactPathwaysSectionProps> = ({
  titleLead = 'Connect with the right part',
  titleClose = 'of Saratoga Ascend.',
  description = 'Different needs call for different conversations. Use these pathways to reach the information or team most relevant to your objective.',
  pathways = DEFAULT_PATHWAYS,
}) => (
  <Section
    aria-labelledby="contact-pathways-heading"
    tone="surface"
    spacing="none"
    bleed
    className="bg-section-wash py-[clamp(2.5rem,4.167vw,5rem)]"
  >
    <Container className="flex flex-col gap-10">
      <div className="flex max-w-[57.3125rem] flex-col gap-3">
        <Heading
          id="contact-pathways-heading"
          level={2}
          size="section"
          tone="ink"
          style={{ lineHeight: 1.2 }}
        >
          <span className="text-brand-red">{titleLead}</span>
          <br />
          {titleClose}
        </Heading>
        {description ? (
          <p className="font-sans text-section-lead text-ink">{description}</p>
        ) : null}
      </div>

      <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {pathways.map((pathway) => (
          <li key={pathway.title} className="min-w-0">
            <article className="relative flex h-full min-h-[21.375rem] flex-col overflow-hidden rounded-media border border-slate-line bg-white p-[clamp(1.25rem,1.5vw,1.5625rem)]">
              <img
                src={pathway.swooshSrc}
                alt=""
                width={333.333}
                height={186.667}
                className="pointer-events-none absolute top-0 right-0 h-auto w-[62.5%]"
              />
              <div
                className={`relative inline-flex size-[4.1875rem] items-center justify-center rounded-full border-2 bg-white ${toneClass[pathway.actionTone]}`}
              >
                <img src={pathway.iconSrc} alt="" width={34} height={34} />
              </div>
              <h3 className="relative mt-4 font-serif text-card-copy text-ink">{pathway.title}</h3>
              <p className="relative mt-3 font-sans text-body-lg text-ink">{pathway.description}</p>
              <div className="relative mt-auto flex items-center justify-between gap-4 border-t border-slate-line pt-4">
                <a
                  href={pathway.href}
                  className={`font-serif text-body hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${toneClass[pathway.actionTone]}`}
                >
                  {pathway.actionLabel}
                </a>
                <a
                  href={pathway.href}
                  aria-label={pathway.actionLabel}
                  className="inline-flex size-[1.875rem] shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink bg-white text-ink transition-colors duration-300 ease-out motion-reduce:transition-none hover:border-transparent hover:text-white hover:[background-image:linear-gradient(91.647deg,var(--color-brand-cta-from)_0.475%,var(--color-brand-cta-to)_102.45%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                >
                  <CaretDownIcon className="size-3.5 -rotate-90" />
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Container>
  </Section>
);
