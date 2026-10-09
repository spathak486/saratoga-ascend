'use client';

import React, { useId, useState } from 'react';
import { GeneralLink } from '../atoms/GeneralLink';
import type { GeneralLink as GeneralLinkType } from '@/lib/schemas';

export interface SubscribeFormProps {
  /**
   * Wire this to the newsletter endpoint. Until it is supplied the form
   * validates and then does nothing, so hook it up before shipping.
   */
  onSubmit?: (email: string) => void;
  className?: string;
  privacyConsentText?: string | null;
  privacyConsentLink?: GeneralLinkType | null;
}

/**
 * Footer newsletter capture: a white pill with a circular send control, plus
 * the required privacy acknowledgement from the homepage artboard.
 */
export const SubscribeForm: React.FC<SubscribeFormProps> = ({
  onSubmit,
  className = '',
  privacyConsentText,
  privacyConsentLink,
}) => {
  const fieldId = useId();
  const consentId = useId();
  const [email, setEmail] = useState('');
  const [consented, setConsented] = useState(false);
  const [consentError, setConsentError] = useState(false);

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        const mobile = window.matchMedia('(max-width: 1279.98px)').matches;
        if (!mobile && !consented) {
          setConsentError(true);
          return;
        }
        setConsentError(false);
        onSubmit?.(email);
      }}
    >
      <div className="relative flex h-14 items-center rounded-pill bg-brand-surface pl-6 pr-16 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-brand-sky xl:pl-5">
        <label htmlFor={fieldId} className="sr-only">
          Email address
        </label>
        <input
          id={fieldId}
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-base leading-5 text-brand-navy placeholder:text-slate-body focus:outline-none xl:text-caption"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute top-1/2 right-1.5 size-11 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
        >
          <img
            src="/images/footer/send.svg"
            alt=""
            width={44}
            height={44}
            className="size-11"
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="mt-[clamp(1rem,1.2vw,1.5rem)] hidden items-start gap-3 xl:flex">
        <input
          id={consentId}
          type="checkbox"
          checked={consented}
          aria-invalid={consentError || undefined}
          aria-describedby={consentError ? `${consentId}-error` : undefined}
          onChange={(event) => {
            setConsented(event.target.checked);
            if (event.target.checked) setConsentError(false);
          }}
          className="mt-0.5 size-4 shrink-0 cursor-pointer rounded-[0.25rem] accent-brand-link"
        />
        <label htmlFor={consentId} className="text-eyebrow text-slate-muted">
          {privacyConsentText || 'I agree to the'}{' '}
          <GeneralLink
            href={privacyConsentLink?.href || '/privacy-policy'}
            variant="unstyled"
            target={(privacyConsentLink?.target as '_self' | '_blank') || '_self'}
            className="font-bold text-brand-on-dark underline underline-offset-2 hover:text-brand-on-dark"
          >
            {privacyConsentLink?.label || 'Privacy Policy'}
          </GeneralLink>
          .
        </label>
      </div>
      {consentError ? (
        <p id={`${consentId}-error`} className="mt-2 hidden text-eyebrow text-brand-red xl:block">
          Please agree to the Privacy Policy before subscribing.
        </p>
      ) : null}
    </form>
  );
};
