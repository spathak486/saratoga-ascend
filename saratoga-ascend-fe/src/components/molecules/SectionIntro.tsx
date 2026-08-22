import React from 'react';
import { Heading, Text } from '../atoms';
import { CtaButton } from './CtaButton';

export interface SectionIntroProps {
  id?: string;
  title: string;
  description: React.ReactNode;
  /** Optional trailing CTA — "About us" on the What We Do band. */
  action?: {
    href: string;
    label: string;
  };
}

/**
 * Section heading block: serif title, body subtitle, and an optional gradient
 * button aligned to the opposite end on wide screens.
 */
export const SectionIntro: React.FC<SectionIntroProps> = ({
  id,
  title,
  description,
  action,
}) => (
  <div className="flex min-w-0 flex-col gap-block lg:flex-row lg:items-end lg:justify-between">
    <div className="flex min-w-0 max-w-[44rem] flex-col gap-[0.625rem]">
      <Heading id={id} level={2} size="section" tone="ink" className="text-balance">
        {title}
      </Heading>
      <Text size="body" tone="ink" className="max-w-[44rem]">
        {description}
      </Text>
    </div>

    {action && (
      <CtaButton href={action.href} className="shrink-0 self-start lg:self-auto">
        {action.label}
      </CtaButton>
    )}
  </div>
);
