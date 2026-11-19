'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
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
  'w-full border-0 border-b-[1.91px] border-[#DADADA] bg-transparent pb-2.5 font-sans text-[1.125rem] font-light text-ink placeholder:font-light placeholder:text-[#B8B8B8] focus:border-ink focus-visible:outline-none disabled:opacity-60 transition-colors';

const labelClass = 'font-sans text-[1.25rem] font-medium leading-normal text-ink';

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
          value ? 'text-ink' : 'text-[#B8B8B8]'
        }`}
      >
        <span className="min-w-0 truncate">{value || 'Select Inquiry Type'}</span>
      </button>
      <svg
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pointer-events-none absolute right-1 bottom-3 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
      >
        <path d="M1 1.5L7 7.5L13 1.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          tabIndex={-1}
          className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-brand-line bg-white py-2 shadow-card focus:outline-none"
        >
          {options.map((option) => (
            <li
              key={option}
              role="option"
              aria-selected={value === option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 font-sans text-body transition-colors hover:bg-brand-surface ${
                value === option ? 'bg-brand-surface font-medium text-brand-navy' : 'text-ink'
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

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

  const [inquiryType, setInquiryType] = useState<string>('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState<SubmitState>({ status: 'idle' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inquiryType) {
      setState({ status: 'error', message: 'Please select an inquiry type.' });
      return;
    }

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
      <div role="status" className={`rounded-[25.5px] border-2 border-[#212121]/50 bg-white p-[clamp(1.5rem,3.125vw,3.1875rem)] ${className}`.trim()}>
        <p className="font-serif text-subtitle text-ink">Thank you{firstName ? `, ${firstName}` : ''}.</p>
        <p className="mt-3 font-sans text-body-lg font-light text-ink">
          Your details have been received. Our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form className={`flex flex-col gap-[1.875rem] w-full max-w-[44rem] ${className}`.trim()} onSubmit={handleSubmit}>
      {/* Form Card: Figma node 2448:6844 rect w:704px h:776px, rounded 25.5px, border 2px #212121/50, bg white */}
      <div className="flex flex-col gap-8 rounded-[25.5px] border-2 border-[#212121]/50 bg-white px-[clamp(1.25rem,3.1875vw,3.1875rem)] py-[clamp(1.5rem,3.25vw,3.25rem)] shadow-sm">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={inquiryId} className={labelClass}>
            Inquiry Type<span className="text-[#CD1C1C]">*</span>
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

        <div className="flex flex-col gap-1.5">
          <label htmlFor={firstNameId} className={labelClass}>
            First Name<span className="text-[#CD1C1C]">*</span>
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

        <div className="flex flex-col gap-1.5">
          <label htmlFor={lastNameId} className={labelClass}>
            Last Name<span className="text-[#CD1C1C]">*</span>
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

        <div className="flex flex-col gap-1.5">
          <label htmlFor={emailId} className={labelClass}>
            Business Email<span className="text-[#CD1C1C]">*</span>
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

        <div className="flex flex-col gap-1.5">
          <label htmlFor={organizationId} className={labelClass}>
            Organization<span className="text-[#CD1C1C]">*</span>
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

        <div className="flex flex-col gap-1.5">
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
            className={`${controlClass} min-h-[4.5rem] resize-y`}
          />
        </div>
      </div>

      {state.status === 'error' ? (
        <p role="alert" className="font-sans text-body text-[#CD1C1C]">
          {state.message}
        </p>
      ) : null}

      {/* Submit Button: Figma node 2448:6844 rect w:704px h:60px, rounded 8px, gradient #D31E2D to #2A91DC */}
      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className="group flex h-[3.75rem] w-full items-center justify-center gap-3 rounded-[8px] bg-cta-gradient px-6 py-4 font-sans text-[1.125rem] font-bold text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-opacity duration-200 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B88D9] disabled:opacity-60 cursor-pointer"
      >
        <span>{state.status === 'submitting' ? 'Submitting...' : submitLabel}</span>
        <ArrowUpRightIcon className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </form>
  );
};
