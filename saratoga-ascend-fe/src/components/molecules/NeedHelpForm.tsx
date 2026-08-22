'use client';

import React, { useId, useState } from 'react';

export interface NeedHelpFormProps {
  onSubmit?: (values: { name: string; email: string }) => void;
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
}

const fieldClass =
  'w-full border-0 border-b border-white/40 bg-transparent pb-2 pt-3 text-base text-white placeholder:text-white/60 focus:border-white focus:outline-none transition-colors';

export const NeedHelpForm: React.FC<NeedHelpFormProps> = ({
  onSubmit,
  buttonLabel = 'Know More',
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
      <div className="flex w-full max-w-[22rem] flex-col gap-6">
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
        className="mt-10 flex h-12 w-[160px] cursor-pointer items-center justify-center rounded-full bg-white text-sm font-bold text-[#0088ce] shadow-button transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {buttonLabel || 'Know More'}
      </button>
    </form>
  );
};
