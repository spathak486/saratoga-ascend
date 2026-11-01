'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { Button } from '../atoms';
import { ArrowUpRightIcon } from '../atoms/icons';

export const CONTACT_INQUIRY_OPTIONS = [
  'Government / Contracting Opportunity',
  'Healthcare Services',
  'Workforce Solutions',
  'IT & Digital Solutions',
  'Contact Center Solutions',
  'Program & Administrative Support',
  'Partnership / Business Development',
  'Media / General Inquiry',
] as const;

export interface ContactInquiryFormProps {
  options?: readonly string[];
  submitLabel?: string;
  className?: string;
}

type SubmitState =
  | { status: 'idle' | 'submitting' | 'success' }
  | { status: 'error'; message: string };

const controlClass =
  'w-full border-0 border-b border-brand-line bg-transparent pb-2 font-sans text-body font-light text-ink placeholder:font-light placeholder:text-slate-muted focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy disabled:opacity-60';

/** 20px serif labels are local to this frame. No type token is 20px at every width. */
const labelClass = 'font-serif text-[1.25rem] leading-normal text-ink';

/** 25px radius, local to Figma 2219:1584. The shared panel token is 32px. */
const cardRadius = 'rounded-[1.592rem]';

function InquiryTypeSelect({
  id,
  name,
  value,
  options,
  disabled,
  required,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  options: readonly string[];
  disabled?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = `${id}-listbox`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((prev) => !prev)}
        className={`${controlClass} flex appearance-none items-center justify-between gap-3 pr-8 text-left ${
          value ? '' : 'text-slate-muted'
        }`}
      >
        <span className="min-w-0 truncate">{value || 'Select Inquiry Type'}</span>
      </button>
      <img
        src="/images/contact/caret.svg"
        alt=""
        width={13.5}
        height={7.5}
        className={`pointer-events-none absolute right-1 bottom-3 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
      />
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="absolute inset-x-0 top-[calc(100%+0.25rem)] z-50 max-h-60 overflow-y-auto rounded-frame border border-brand-line bg-white py-1 shadow-button"
        >
          {options.map((option) => {
            const selected = option === value;
            return (
              <li key={option} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`w-full px-4 py-2.5 text-left font-sans text-body font-light text-ink transition-colors hover:bg-brand-surface-muted focus-visible:bg-brand-surface-muted focus-visible:outline-none ${
                    selected ? 'bg-brand-surface-muted' : ''
                  }`}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * Contact inquiry fields from Figma 2219:1584. The live submission endpoint
 * stores name, email, and source only, so first and last name are joined into
 * `name` and sent with source `contact`.
 */
export const ContactInquiryForm: React.FC<ContactInquiryFormProps> = ({
  options = CONTACT_INQUIRY_OPTIONS,
  submitLabel = 'Submit',
  className = '',
}) => {
  const inquiryId = useId();
  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const organizationId = useId();
  const descriptionId = useId();

  const [inquiryType, setInquiryType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState<SubmitState>({ status: 'idle' });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setState({ status: 'submitting' });

    try {
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          organization: organization.trim(),
          inquiryType,
          description: description.trim(),
          source: 'contact',
        }),
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setState({
          status: 'error',
          message: payload?.error ?? 'Something went wrong. Please try again.',
        });
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
      <div role="status" className={`${cardRadius} border-2 border-ink/50 bg-white p-[clamp(1.25rem,2.66vw,3.1875rem)] ${className}`.trim()}>
        <p className="font-serif text-subtitle text-ink">Thank you{firstName ? `, ${firstName}` : ''}.</p>
        <p className="mt-3 font-sans text-body-lg font-light text-ink">
          Your details have been received. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form className={`flex flex-col gap-[1.875rem] ${className}`.trim()} onSubmit={handleSubmit}>
      <div className={`flex flex-col gap-9 border-2 border-ink/50 bg-white p-[clamp(1.25rem,2.66vw,3.1875rem)] ${cardRadius}`}>
        <div className="flex flex-col gap-2">
          <label htmlFor={inquiryId} className={labelClass}>
            Inquiry Type<span className="text-brand-red">*</span>
          </label>
          <InquiryTypeSelect
            id={inquiryId}
            name="inquiryType"
            required
            disabled={state.status === 'submitting'}
            value={inquiryType}
            options={options}
            onChange={setInquiryType}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={firstNameId} className={labelClass}>
            First Name<span className="text-brand-red">*</span>
          </label>
          <input
            id={firstNameId}
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            disabled={state.status === 'submitting'}
            placeholder="Enter First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className={controlClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={lastNameId} className={labelClass}>
            Last Name<span className="text-brand-red">*</span>
          </label>
          <input
            id={lastNameId}
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            disabled={state.status === 'submitting'}
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className={controlClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={emailId} className={labelClass}>
            Business Email<span className="text-brand-red">*</span>
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={state.status === 'submitting'}
            placeholder="Enter Your Business Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={controlClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={organizationId} className={labelClass}>
            Organization<span className="text-brand-red">*</span>
          </label>
          <input
            id={organizationId}
            name="organization"
            type="text"
            autoComplete="organization"
            required
            disabled={state.status === 'submitting'}
            placeholder="Enter Organization"
            value={organization}
            onChange={(event) => setOrganization(event.target.value)}
            className={controlClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={descriptionId} className={labelClass}>
            Description
          </label>
          <textarea
            id={descriptionId}
            name="description"
            rows={3}
            disabled={state.status === 'submitting'}
            placeholder="Tell us about your requirements."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className={`${controlClass} min-h-[6.5rem] resize-y`}
          />
        </div>
      </div>

      {state.status === 'error' ? (
        <p role="alert" className="font-sans text-body text-brand-red">
          {state.message}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="cta"
        size="cta"
        fullWidth
        isLoading={state.status === 'submitting'}
        rightIcon={<ArrowUpRightIcon className="size-[1.2em]" />}
      >
        {state.status === 'submitting' ? 'Submitting...' : submitLabel}
      </Button>
    </form>
  );
};
