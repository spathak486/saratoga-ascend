'use client';

import React, { useId, useState } from 'react';

export interface SubscribeFormProps {
  /**
   * Wire this to the newsletter endpoint. Until it is supplied the form
   * validates and then does nothing, so hook it up before shipping.
   */
  onSubmit?: (email: string) => void;
  className?: string;
}

/**
 * Email capture styled as a single pill with the submit button tucked inside,
 * rather than the generic `Input` atom, which is a labelled rectangular field
 * built for form pages.
 */
export const SubscribeForm: React.FC<SubscribeFormProps> = ({
  onSubmit,
  className = '',
}) => {
  const fieldId = useId();
  const [email, setEmail] = useState('');

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(email);
      }}
    >
      <label htmlFor={fieldId} className="text-caption text-brand-on-dark-muted">
        Get open roles and hiring news in your inbox
      </label>

      {/*
        The ring lives on the pill and is driven by the field inside it, so
        keyboard focus is visible even though the input's own outline is
        suppressed to keep the shape clean.
      */}
      <div className="mt-2 flex items-center gap-2 rounded-full bg-brand-surface p-1.5 pl-5 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-brand-sky">
        <input
          id={fieldId}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-body text-brand-navy placeholder:text-brand-muted focus:outline-none"
        />

        <button
          type="submit"
          className="shrink-0 cursor-pointer rounded-full bg-cta-gradient px-cta-x py-cta-y text-button text-brand-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-sky"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
};
