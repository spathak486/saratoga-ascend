import React from 'react';
import { Container, Section } from '../atoms';

interface ContactDetailPart {
  text: string;
  href?: string;
}

interface ContactOfficeDetail {
  label: string;
  parts: ContactDetailPart[];
}

export interface ContactOffice {
  name: string;
  address: string;
  details: ContactOfficeDetail[];
}

export interface ContactOfficesSectionProps {
  mapSrc?: string;
  mapAlt?: string;
  markerLabel?: string;
  offices?: ContactOffice[];
}

/**
 * The Virginia card repeats the New York street. That string is the frame copy.
 */
const DEFAULT_OFFICES: ContactOffice[] = [
  {
    name: 'New York',
    address: '12 East 32nd Street, 7th Floor New York, NY 10016',
    details: [
      {
        label: 'Phone',
        parts: [{ text: '(212) 213-2520', href: 'tel:+12122132520' }],
      },
      {
        label: 'Fax',
        parts: [{ text: '(646) 914-9440' }],
      },
    ],
  },
  {
    name: 'Virginia Office - Billing Department',
    address: '12 East 32nd Street, 7th Floor New York, NY 10016',
    details: [
      {
        label: 'Phone',
        parts: [
          { text: '(347) 442-7419', href: 'tel:+13474427419' },
          { text: ' or ' },
          { text: '(212) 213-2520 Ext. 107', href: 'tel:+12122132520' },
        ],
      },
      {
        label: 'Fax',
        parts: [{ text: '(646) 914-9440' }],
      },
    ],
  },
];

function OfficeDetail({ detail }: { detail: ContactOfficeDetail }) {
  return (
    <p className="font-sans text-nav leading-8 text-brand-on-dark">
      <span className="font-medium">{detail.label}:</span>{' '}
      {detail.parts.map((part) =>
        part.href ? (
          <a
            key={part.text}
            href={part.href}
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {part.text}
          </a>
        ) : (
          <span key={part.text}>{part.text}</span>
        ),
      )}
    </p>
  );
}

/**
 * Office map (Figma 2219:1748). Static map image with the glass cards and
 * the Saratoga locator. The frame defines no motion.
 */
export const ContactOfficesSection: React.FC<ContactOfficesSectionProps> = ({
  mapSrc = '/images/contact/offices/map.png',
  mapAlt = 'Map showing the New York office',
  markerLabel = 'Saratoga ascend',
  offices = DEFAULT_OFFICES,
}) => (
  <Section
    aria-labelledby="contact-offices-heading"
    tone="surface"
    spacing="none"
    bleed
    className="overflow-hidden"
  >
    <div className="relative min-h-[42rem] xl:min-h-[calc(100vw*820/1922)]">
      <img
        src={mapSrc}
        alt={mapAlt}
        className="absolute inset-0 size-full object-cover"
      />
      <h2 id="contact-offices-heading" className="sr-only">
        Office locations
      </h2>
      <Container className="relative z-10 flex min-h-[inherit] flex-col justify-center gap-6 py-12">
        {offices.map((office) => (
          <article
            key={office.name}
            className="w-max max-w-full rounded-[1.667rem] border-2 border-ink bg-[rgb(35_35_35/0.7)] px-6 py-5 backdrop-blur-[3px] xl:px-10"
          >
            <div className="flex flex-col gap-2.5">
              <h3 className="font-serif text-card-copy leading-8 text-brand-on-dark uppercase">
                {office.name}
              </h3>
              <p className="font-sans text-nav leading-8 text-brand-on-dark">{office.address}</p>
              {office.details.map((detail) => (
                <OfficeDetail key={detail.label} detail={detail} />
              ))}
            </div>
          </article>
        ))}
      </Container>
      <div className="pointer-events-none absolute top-[32%] left-[60%] z-10 hidden flex-col items-center xl:flex">
        <p className="rounded-[1.667rem] bg-cta-gradient px-[1.3125rem] py-[0.4375rem] font-serif text-section-lead leading-none whitespace-nowrap text-brand-on-dark">
          {markerLabel}
        </p>
        <img src="/images/contact/offices/stem.svg" alt="" width={1.82413} height={65.6687} />
        <span
          className="grid place-items-center"
          style={{ width: '36.4826px', height: '36.4826px' }}
        >
          <img
            src="/images/contact/offices/pin.svg"
            alt=""
            width={36.4826}
            height={36.4826}
            className="col-start-1 row-start-1 origin-center animate-locator-pulse"
          />
          <img
            src="/images/contact/offices/pin-dot.svg"
            alt=""
            width={10.9448}
            height={10.9448}
            className="relative z-10 col-start-1 row-start-1"
          />
        </span>
      </div>
    </div>
  </Section>
);
