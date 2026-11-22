'use client';

import React, { useId, useState } from 'react';

export interface NeedHelpFormProps {
  buttonLabel?: string;
  buttonHref?: string;
  className?: string;
}

type SubmitState =
  | { status: 'idle' | 'submitting' | 'success' }
  | { status: 'error'; message: string };

const fieldClass =
  'w-full max-w-[33.75rem] border-0 border-b border-white/40 bg-transparent pb-2 font-sans text-[1.125rem] leading-[150%] font-normal text-white placeholder:text-white/50 focus:border-white focus:outline-none transition-colors';

const buttonClass =
  'inline-flex h-[3.75rem] w-[11.25rem] shrink-0 cursor-pointer items-center justify-center rounded-[62.4375rem] bg-white px-6 py-4 font-sans text-[1.25rem] font-bold leading-none text-[#2B88D9] shadow-button transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70';

/**
 * Name / email capture on the Need Help card (Figma node 2448:6829).
 * - Inputs: width up to 540px, 18px text, placeholder 50% white, border 1px solid rgba(255, 255, 255, 0.4)
 * - Button: 180x60px, rounded-full (rx 30px), #FFFFFF background, #2B88D9 20px bold text
 */
export const NeedHelpForm: React.FC<NeedHelpFormProps> = ({
  buttonLabel = 'Know More',
  buttonHref,
  className = '',
}) => {
  const nameId = useId();
  const emailId = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmitState>({ status: 'idle' });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState({ status: 'submitting' });

    try {
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, source: 'cta' }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        setState({
          status: 'error',
          message: payload?.error ?? 'Something went wrong. Please try again.',
        });
        return;
      }

      if (buttonHref) {
        window.location.href = buttonHref;
        return;
      }

      setState({ status: 'success' });
    } catch {
      setState({
        status: 'error',
        message: 'Could not reach the server. Please try again.',
      });
    }
  };

  if (state.status === 'success') {
    return (
      <div
        role="status"
        className={`flex w-full max-w-[33.75rem] flex-col gap-6 text-white ${className}`.trim()}
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-white/15">
          <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="font-sans text-[1.25rem] font-bold leading-[150%]">Thank you{name ? `, ${name}` : ''}!</p>
          <p className="mt-1 font-sans text-[1rem] leading-[150%] text-white/70">
            Your details have been received. Our team will get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-6 sm:gap-7 ${className}`.trim()}
    >
      <div className="flex w-full flex-col gap-5 sm:gap-6">
        <div>
          <label htmlFor={nameId} className="sr-only">
            Name
          </label>
          <input
            id={nameId}
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={state.status === 'submitting'}
            placeholder="Name"
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
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state.status === 'submitting'}
            placeholder="Email"
            className={fieldClass}
          />
        </div>
      </div>

      {state.status === 'error' ? (
        <p role="alert" className="font-sans text-sm text-red-200">
          {state.message}
        </p>
      ) : null}

      <div className="pt-4 sm:pt-6">
        <button
          type="submit"
          disabled={state.status === 'submitting'}
          className={buttonClass}
        >
          {state.status === 'submitting' ? 'Submitting...' : (buttonLabel || 'Know More')}
        </button>
      </div>
    </form>
  );
};
