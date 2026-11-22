import { stripHtml } from '@/lib/utils/text';
import React from 'react';
import { Container, Heading, Section } from '../atoms';
import { ArrowUpRightIcon } from '../atoms/icons';
import { ContactInquiryForm, type ContactInquiryFormProps } from '../molecules/ContactInquiryForm';

type DetailIcon = 'location' | 'mail' | 'phone';

export interface ContactDetail {
  icon: DetailIcon;
  label: string;
  value: string;
  href?: string;
}

export interface ContactInquirySectionProps {
  titleLead?: string;
  titleAccent?: string;
  titleClose?: string;
  description?: string;
  details?: ContactDetail[];
  options?: ContactInquiryFormProps['options'];
  submitLabel?: ContactInquiryFormProps['submitLabel'];
  /** Capability-statement file. The frame has the label; it does not include a file URL. */
  statementHref?: string;
  statementLabel?: string;
}

const DETAIL_ICONS: Record<DetailIcon, { src: string; width: number; height: number }> = {
  location: { src: '/images/contact/location-v2.svg', width: 56, height: 56 },
  mail: { src: '/images/contact/mail-v2.svg', width: 56, height: 56 },
  phone: { src: '/images/contact/headphones-v2.svg', width: 56, height: 56 },
};

const DEFAULT_DETAILS: ContactDetail[] = [
  {
    icon: 'location',
    label: 'Address',
    value: '12 East 32nd Street, 7th Floor New York, NY 10016',
  },
  {
    icon: 'mail',
    label: 'Email',
    value: 'careers@saratogaascend.com',
    href: 'mailto:careers@saratogaascend.com',
  },
  {
    icon: 'phone',
    label: 'Contact',
    value: '+1 (212) 213-2520',
    href: 'tel:+12122132520',
  },
];

/**
 * Contact inquiry section (Figma 2448:6844).
 * Layout: 2-column grid.
 * Left: Heading ("Let's Start a <Conversation> About Your Mission."), description, and 3 contact pills.
 * Right: Inquiry Form card + Submit CTA button.
 */
export const ContactInquirySection: React.FC<ContactInquirySectionProps> = ({
  titleLead = 'Let’s Start a',
  titleAccent = 'Conversation',
  titleClose = 'About Your Mission.',
  description = 'Whether you are exploring a new requirement, discussing a contract opportunity, seeking a qualified delivery partner, or looking for career information, our team is ready to connect.',
  details = DEFAULT_DETAILS,
  options,
  submitLabel = 'Submit',
  statementHref,
  statementLabel,
}) => (
  <Section
    aria-labelledby="contact-inquiry-heading"
    tone="surface"
    spacing="none"
    bleed
    className="bg-white py-[clamp(2.5rem,5.2vw,6.25rem)]"
  >
    <Container>
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,44rem)] lg:gap-16 xl:gap-24">
        {/* Left Column: Heading + Description + 3 Contact Pills */}
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col gap-5 md:gap-6">
            <Heading
              id="contact-inquiry-heading"
              level={2}
              tone="ink"
              className="font-serif text-[clamp(2.5rem,4.6875vw,5.625rem)] font-normal tracking-normal text-ink"
              style={{ lineHeight: '120%' }}
            >
              {titleLead}
              <br />
              <span className="text-[#F01424]">{titleAccent}</span>
              <br />
              {titleClose}
            </Heading>
            {description ? (
              <p className="max-w-[40.625rem] font-sans text-[clamp(1rem,1.15vw,1.25rem)] font-normal leading-relaxed text-ink/90">
                {stripHtml(description)}
              </p>
            ) : null}
          </div>

          {/* 3 Contact Pills matching Figma node 2448:6844 */}
          <ul className="flex flex-col gap-5 max-w-[40.625rem]">
            {details.map((detail) => {
              const icon = DETAIL_ICONS[detail.icon];
              const valueContent = detail.href ? (
                <a
                  href={detail.href}
                  className="font-sans text-[1.125rem] font-normal text-ink transition-colors hover:text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                >
                  {detail.value}
                </a>
              ) : (
                <span className="font-sans text-[1.125rem] font-normal text-ink">{detail.value}</span>
              );

              return (
                <li
                  key={detail.label}
                  className="flex items-center gap-5 rounded-[0.9688rem] border border-[#E0E0E0] bg-[#E4EBF1]/50 px-6 py-4 shadow-[0_0_15px_rgba(0,0,0,0.09)] transition-transform duration-200 hover:shadow-md"
                >
                  <div className="relative flex size-14 shrink-0 items-center justify-center">
                    <img
                      src={icon.src}
                      alt={detail.label}
                      width={icon.width}
                      height={icon.height}
                      className="size-14 shrink-0 drop-shadow-[0_0_11px_rgba(0,0,0,0.29)]"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-serif text-[1.25rem] font-medium leading-snug text-ink">{detail.label}</h3>
                    {valueContent}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="flex justify-center lg:justify-end">
          <ContactInquiryForm options={options} submitLabel={submitLabel} />
        </div>
      </div>

      {statementLabel ? (
        <div className="mt-12 flex justify-center">
          {statementHref ? (
            <a
              href={statementHref}
              className="inline-flex min-h-[3.75rem] w-full max-w-[44rem] cursor-pointer items-center justify-center gap-3 rounded-[0.5rem] bg-cta-gradient px-6 py-3 text-center font-sans text-[1.125rem] font-bold text-white uppercase shadow-button transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
            >
              {statementLabel}
              <ArrowUpRightIcon className="size-5 shrink-0" />
            </a>
          ) : (
            <button
              type="button"
              className="inline-flex min-h-[3.75rem] w-full max-w-[44rem] cursor-pointer items-center justify-center gap-3 rounded-[0.5rem] bg-cta-gradient px-6 py-3 text-center font-sans text-[1.125rem] font-bold text-white uppercase shadow-button transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
            >
              {statementLabel}
              <ArrowUpRightIcon className="size-5 shrink-0" />
            </button>
          )}
        </div>
      ) : null}
    </Container>
  </Section>
);
