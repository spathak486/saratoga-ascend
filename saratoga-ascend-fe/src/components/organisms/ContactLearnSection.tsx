import React from 'react';
import { Container, Heading, Section } from '../atoms';

export interface ContactLearnCard {
  number: string;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  /** The centre card is taller and set one step larger. */
  featured?: boolean;
  imageSrc?: string;
}

export interface ContactLearnSectionProps {
  titleLead?: string;
  titleClose?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  cards?: ContactLearnCard[];
}

const DEFAULT_CARDS: ContactLearnCard[] = [
  {
    number: '01',
    title: 'What We Do',
    description: 'Explore six integrated solution areas.',
    actionLabel: 'View Solutions',
    href: '/what-we-do',
  },
  {
    number: '02',
    title: 'Who We Serve',
    description: 'Learn how capabilities align with Federal and SLED environments.',
    actionLabel: 'Explore Who We Serve',
    href: '/who-we-serve',
    featured: true,
  },
  {
    number: '03',
    title: 'Contracts',
    description: 'Review contract vehicles and procurement information.',
    actionLabel: 'Explore Contracts',
    href: '/contract-vehicles',
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.15em]" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Learn-more cards (Figma 2219:1688). The three photos are the same frame.
 * The centre card sits higher and uses the larger type step.
 */
export const ContactLearnSection: React.FC<ContactLearnSectionProps> = ({
  titleLead = 'Learn more',
  titleClose = 'about Saratoga Ascend.',
  description = 'If you are still evaluating your requirements, explore our solutions, who we serve, contracts, capabilities, and insights before starting a conversation.',
  imageSrc = '/images/contact/learn/team.jpg',
  imageAlt = 'Healthcare and government teams collaborating around a conference table',
  cards = DEFAULT_CARDS,
}) => (
  <Section
    aria-labelledby="contact-learn-heading"
    tone="surface"
    spacing="none"
    bleed
    className="py-[clamp(2.5rem,4.167vw,5rem)]"
  >
    <Container className="flex flex-col gap-10">
      <div className="flex max-w-[70.75rem] flex-col gap-3">
        <Heading
          id="contact-learn-heading"
          level={2}
          size="section"
          tone="ink"
          style={{ lineHeight: 1.2 }}
        >
          <span className="text-brand-red">{titleLead}</span> {titleClose}
        </Heading>
        {description ? (
          <p className="font-sans text-section-lead text-ink">{description}</p>
        ) : null}
      </div>

      <ul className="grid grid-cols-1 items-center gap-8 xl:grid-cols-[minmax(0,487fr)_minmax(0,585fr)_minmax(0,487fr)] xl:gap-x-[3.75rem]">
        {cards.map((card, index) => (
          <li key={card.number}>
            <article
              className={`flex h-full flex-col overflow-hidden border border-slate-line/90 bg-white shadow-[0_13px_39px_-13px_rgba(8,47,75,0.06)] ${
                card.featured ? 'rounded-[2.35rem]' : 'rounded-[1.956rem]'
              }`}
            >
              <div className={`relative overflow-hidden ${card.featured ? 'aspect-[5/4]' : 'aspect-[4/3]'}`}>
                <img
                  src={card.imageSrc || imageSrc}
                  alt={index === 0 ? imageAlt : ''}
                  className="absolute inset-0 size-full object-cover"
                />
                <img
                  src="/images/contact/learn/wave-fill.svg"
                  alt=""
                  width={489.569}
                  height={32.454}
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full"
                />
                <img
                  src="/images/contact/learn/wave.svg"
                  alt=""
                  width={484.688}
                  height={26.842}
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full"
                />
                <span
                  className={`absolute top-4 right-4 inline-flex items-center justify-center rounded-full bg-brand-red font-sans font-bold tracking-wide text-white ${
                    card.featured ? 'size-12 text-[1.175rem]' : 'size-10 text-[0.978rem]'
                  }`}
                >
                  {card.number}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 px-[clamp(1rem,1.5vw,1.5rem)] pt-4 pb-5">
                <h3
                  className={`font-serif text-ink ${card.featured ? 'text-subtitle' : 'text-card'}`}
                >
                  {card.title}
                </h3>
                <p className={`font-sans text-ink ${card.featured ? 'text-card-copy' : 'text-body'}`}>
                  {card.description}
                </p>
                <a
                  href={card.href}
                  className={`group mt-auto inline-flex items-center gap-2 border-t border-brand-red-wash pt-3 font-serif text-ink transition-colors duration-300 ease-out hover:text-brand-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy motion-reduce:transition-none ${
                    card.featured ? 'text-body' : 'text-nav'
                  }`}
                >
                  {card.actionLabel}
                  <span className="transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none">
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Container>
  </Section>
);
