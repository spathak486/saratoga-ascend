'use client';

import React, { useId, useState } from 'react';
import { ArrowUpRightIcon } from '../atoms/icons';
import { GeneralLink } from '../atoms/GeneralLink';

export interface SubscribeFormProps {
  /**
   * Wire this to the newsletter endpoint. Until it is supplied the form
   * validates and then does nothing, so hook it up before shipping.
   */
  onSubmit?: (email: string) => void;
  className?: string;
}

/**
 * Footer newsletter capture: a white field with a circular submit, plus the
 * required privacy acknowledgement from the homepage artboard.
 */
export const SubscribeForm: React.FC<SubscribeFormProps> = ({
  onSubmit,
  className = '',
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
      <div className="relative flex h-[clamp(3rem,3.85vw,3.5rem)] items-center rounded-card bg-brand-surface pl-5 pr-[clamp(3.25rem,4vw,3.75rem)] has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-brand-sky">
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
          className="min-w-0 flex-1 bg-transparent text-caption text-brand-navy placeholder:text-slate-body focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="absolute top-1/2 right-1 flex size-[clamp(2.5rem,2.9vw,2.75rem)] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-cta-gradient text-brand-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
        >
          <ArrowUpRightIcon className="size-[1.15em]" />
        </button>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <input
          id={consentId}
          type="checkbox"
          required
          checked={consented}
          onChange={(event) => setConsented(event.target.checked)}
          className="mt-0.5 size-4 shrink-0 cursor-pointer accent-brand-sky"
        />
        <label htmlFor={consentId} className="text-eyebrow text-slate-muted">
          I agree to the{' '}
          <GeneralLink
            href="/privacy"
            variant="unstyled"
            className="font-bold text-brand-on-dark underline underline-offset-2 hover:text-brand-on-dark"
          >
            Privacy Policy
          </GeneralLink>
        </label>
      </div>
    </form>
  );
};
