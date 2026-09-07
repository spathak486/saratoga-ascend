'use client';

import React, { useId, useState } from 'react';

export interface NeedHelpFormProps {
  onSubmit?: (values: { name: string; email: string }) => void;
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
}

const fieldClass =
  'w-full border-0 border-b border-white/40 bg-transparent pb-2.5 text-[18px] leading-[150%] font-normal text-white placeholder:text-white/50 focus:border-white focus:outline-none';

/**
 * Name / email capture on the Need Help card. Fields are underline-only,
 * matching the exact Figma artboard:
 * - Inputs: 540px wide, 18px text (50% white), border 1px solid rgba(255, 255, 255, 0.4)
 * - Button: 180x60px, rounded-full, #FFFFFF background, #2B88D9 20px bold text
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
      <div className="flex w-full max-w-[540px] flex-col gap-[30px]">
        <div className="relative">
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

        <div className="relative">
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
        className="mt-[clamp(2rem,4.5vw,135px)] inline-flex h-[60px] w-[180px] shrink-0 cursor-pointer items-center justify-center self-start rounded-[999px] bg-white px-6 py-4 text-[20px] font-bold leading-[150%] text-[#2B88D9] shadow-button transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {buttonLabel || 'Know More'}
      </button>
    </form>
  );
};
