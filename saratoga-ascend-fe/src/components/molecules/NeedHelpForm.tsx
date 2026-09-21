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
  'w-full border-0 border-b border-white/40 bg-transparent pb-2.5 text-[18px] leading-[150%] font-normal text-white placeholder:text-white/50 focus:border-white focus:outline-none';

const buttonClass =
  'mt-[clamp(2rem,4.5vw,135px)] inline-flex h-[60px] w-[180px] shrink-0 cursor-pointer items-center justify-center self-start rounded-[999px] bg-white px-6 py-4 text-[20px] font-bold leading-[150%] text-[#2B88D9] shadow-button transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70';

/**
 * Name / email capture on the Need Help card. Submits to the same-origin
 * `/api/contact-submissions` proxy which forwards to the Strapi CMS. Fields are
 * underline-only, matching the exact Figma artboard:
 * - Inputs: 540px wide, 18px text (50% white), border 1px solid rgba(255, 255, 255, 0.4)
 * - Button: 180x60px, rounded-full, #FFFFFF background, #2B88D9 20px bold text
 */
export const NeedHelpForm: React.FC<NeedHelpFormProps> = ({
  buttonLabel,
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
        className={`flex w-full max-w-[540px] flex-col gap-6 text-white ${className}`.trim()}
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-white/15">
          <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-[20px] font-bold leading-[150%]">Thank you{name ? `, ${name}` : ''}!</p>
          <p className="mt-1 text-[16px] leading-[150%] text-white/60">
            Your details have been received. Our team will get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      className={`flex flex-col ${className}`.trim()}
      onSubmit={handleSubmit}
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
            disabled={state.status === 'submitting'}
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
            disabled={state.status === 'submitting'}
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {state.status === 'error' && (
        <p role="alert" className="mt-4 max-w-[540px] text-[14px] leading-[150%] text-red-300">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className={buttonClass}
      >
        {state.status === 'submitting' ? 'Submitting...' : buttonLabel || 'Know More'}
      </button>
    </form>
  );
};