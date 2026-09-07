'use client';

import React, { useId, useState } from 'react';

export interface NeedHelpFormProps {
  onSubmit?: (values: { name: string; email: string }) => void;
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
}

const fieldClass =
  'w-full border-0 border-b border-brand-on-dark/50 bg-transparent pb-3 text-nav text-brand-on-dark placeholder:text-brand-on-dark/50 focus:border-brand-on-dark focus:outline-none';

/**
 * Name / email capture on the Need Help card. Fields are underline-only,
 * matching the artboard — no boxed inputs.
 */
export const NeedHelpForm: React.FC<NeedHelpFormProps> = ({
  onSubmit,
  buttonLabel,
  buttonHref,
  className = '',
}) => {
  const nameId = useId();
  const emailId = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form
      className={`flex flex-col ${className}`.trim()}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.({ name, email });
        if (buttonHref) {
          window.location.href = buttonHref;
        }
      }}
    >
      <div className="flex max-w-[33.75rem] flex-col gap-[clamp(1.75rem,3.65vw,4.375rem)]">
        <div>
          <label htmlFor={nameId} className="sr-only">
            Name
          </label>
          <input
            id={nameId}
            type="text"
            name="name"
            autoComplete="name"
            required
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor={emailId} className="sr-only">
            Email
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-[clamp(2rem,0.4375rem+6.6667vw,8.4375rem)] inline-flex h-cta min-w-cta-wide shrink-0 cursor-pointer items-center justify-center self-start rounded-pill bg-brand-surface px-cta-x text-button font-bold text-brand-sky shadow-button focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-on-dark"
      >
        {buttonLabel || 'Know More'}
      </button>
    </form>
  );
};
