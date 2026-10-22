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
  location: { src: '/images/contact/location.svg', width: 28.695, height: 31.6338 },
  mail: { src: '/images/contact/mail.svg', width: 31.6338, height: 27.2198 },
  phone: { src: '/images/contact/headphones.svg', width: 31.6338, height: 27.2204 },
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
 * Contact inquiry band (Figma 2219:1584). Copy and contact rows are props so a
 * later CMS section can supply them. There is no matching section type yet.
 */
export const ContactInquirySection: React.FC<ContactInquirySectionProps> = ({
  titleLead = 'Let’s Start a',
  titleAccent = 'Conversation',
  titleClose = 'About Your Mission.',
  description = 'Whether you are exploring a new requirement, discussing a contract opportunity, seeking a qualified delivery partner, or looking for career information, our team is ready to connect.',
  details = DEFAULT_DETAILS,
  options,
  submitLabel,
  statementHref,
  statementLabel = 'Download SMC Capability Statement',
}) => (
  <Section
    aria-labelledby="contact-inquiry-heading"
    tone="surface"
    spacing="none"
    bleed
    className="py-[clamp(2.5rem,4.167vw,5rem)]"
  >
    <Container>
      {/* #F2F8FD and the 25px radius are local to this frame. */}
      <div className="rounded-[1.592rem] border-2 border-ink bg-[#f2f8fd] px-[clamp(1.25rem,4.635vw,5.5625rem)] py-[clamp(2rem,3.385vw,4.0625rem)]">
        {/* Title column sizes to the three lines. The form uses the space that remains. */}
        <div className="grid items-start gap-10 min-[72rem]:grid-cols-[max-content_minmax(16rem,44rem)] min-[72rem]:gap-x-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <Heading
                id="contact-inquiry-heading"
                level={2}
                size="hero"
                tone="ink"
                className="tracking-normal min-[72rem]:w-max min-[72rem]:whitespace-nowrap"
                style={{ lineHeight: 1.2 }}
              >
                {titleLead}
                <br />
                <span className="text-brand-red">{titleAccent}</span>
                <br />
                {titleClose}
              </Heading>
              {description ? (
                <p className="max-w-[50.4375rem] font-sans text-body-lg font-normal text-ink">
                  {description}
                </p>
              ) : null}
            </div>

            <ul className="flex flex-col gap-10">
              {details.map((detail) => {
                const icon = DETAIL_ICONS[detail.icon];
                const value = detail.href ? (
                  <a
                    href={detail.href}
                    className="font-sans text-body-lg font-light text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="font-sans text-body-lg font-light text-ink">{detail.value}</p>
                );

                return (
                  <li key={detail.label} className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center">
                        <img src={icon.src} alt="" width={icon.width} height={icon.height} />
                      </span>
                      <p className="font-serif text-card-copy text-ink">{detail.label}</p>
                    </div>
                    {value}
                  </li>
                );
              })}
            </ul>
          </div>

          <ContactInquiryForm options={options} submitLabel={submitLabel} />
        </div>
      </div>
      <div className="mt-[clamp(1.5rem,3.125vw,3.75rem)] flex justify-center">
        {statementHref ? (
          <a
            href={statementHref}
            className="inline-flex min-h-[3.75rem] w-full max-w-[70.625rem] cursor-pointer items-center justify-center gap-3 rounded-[0.875rem] bg-cta-gradient px-6 py-3 text-center font-sans text-[clamp(0.875rem,1.25vw,1.5rem)] font-bold leading-[1.5] text-white uppercase shadow-button transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            {statementLabel}
            <ArrowUpRightIcon className="size-6 shrink-0" />
          </a>
        ) : (
          <button
            type="button"
            className="inline-flex min-h-[3.75rem] w-full max-w-[70.625rem] cursor-pointer items-center justify-center gap-3 rounded-[0.875rem] bg-cta-gradient px-6 py-3 text-center font-sans text-[clamp(0.875rem,1.25vw,1.5rem)] font-bold leading-[1.5] text-white uppercase shadow-button transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            {statementLabel}
            <ArrowUpRightIcon className="size-6 shrink-0" />
          </button>
        )}
      </div>
    </Container>
  </Section>
);
