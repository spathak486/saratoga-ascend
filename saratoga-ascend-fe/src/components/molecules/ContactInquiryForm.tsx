'use client';

import React, { useId, useState } from 'react';
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

    const name = `${firstName.trim()} ${lastName.trim()}`.trim();

    try {
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, source: 'contact' }),
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
          <div className="relative">
            <select
              id={inquiryId}
              name="inquiryType"
              required
              disabled={state.status === 'submitting'}
              value={inquiryType}
              onChange={(event) => setInquiryType(event.target.value)}
              className={`${controlClass} appearance-none pr-8 ${inquiryType ? '' : 'text-slate-muted'}`}
            >
              <option value="" disabled>
                Select Inquiry Type
              </option>
              {options.map((option) => (
                <option key={option} value={option} className="text-ink">
                  {option}
                </option>
              ))}
            </select>
            <img
              src="/images/contact/caret.svg"
              alt=""
              width={13.5}
              height={7.5}
              className="pointer-events-none absolute right-1 bottom-3"
            />
          </div>
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
