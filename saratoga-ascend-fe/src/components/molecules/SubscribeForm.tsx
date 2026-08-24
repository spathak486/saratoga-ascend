'use client';

import React, { useId, useState } from 'react';
import { SendIcon } from '../atoms/icons';
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
 * Footer newsletter capture: a white pill field with a circular submit, plus the
 * required privacy acknowledgement from the homepage artboard.
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

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        if (!consented) return;
        onSubmit?.(email);
      }}
    >
      <div className="relative flex h-[56px] w-full max-w-[402px] items-center rounded-full bg-white pl-6 pr-[56px] has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-brand-sky">
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
          className="min-w-0 flex-1 bg-transparent text-[16px] leading-[20px] text-[#0A0A0A] placeholder:text-[#64748B] focus:outline-none font-sans"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute top-1/2 right-[6px] flex size-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[#0066CC] text-white hover:bg-[#0052A3] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
        >
          <SendIcon className="size-5 text-white" />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2.5">
        <input
          id={consentId}
          type="checkbox"
          required
          checked={consented}
          onChange={(event) => setConsented(event.target.checked)}
          className="size-[18px] shrink-0 cursor-pointer rounded border-[#94A3B8] accent-[#0066CC]"
        />
        <label htmlFor={consentId} className="text-[14px] leading-[18px] text-[#94A3B8] font-sans">
          {privacyConsentText || 'I agree to the'}{' '}
          <GeneralLink
            href={privacyConsentLink?.href || '/privacy'}
            variant="unstyled"
            target={(privacyConsentLink?.target as '_self' | '_blank') || '_self'}
            className="font-bold text-white underline underline-offset-2 hover:text-[#26E0F5]"
          >
            {privacyConsentLink?.label || 'Privacy Policy'}
          </GeneralLink>
        </label>
      </div>
    </form>
  );
};
