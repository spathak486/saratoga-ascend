import React from 'react';

export interface KeyTakeawaysSectionProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'gradient' | 'blue' | 'minimal' | string;
  className?: string;
}

/**
 * Key Takeaways / Callout component for Blog & Article detail pages (Figma Group 2085662699).
 * Features multiple styling variants for reusability.
 */
export const KeyTakeawaysSection: React.FC<KeyTakeawaysSectionProps> = ({
  title = 'Key Takeaways',
  description,
  variant = 'default',
  className = '',
}) => {
  if (!description && !title) return null;

  // Variant-based container styling
  let containerStyles = '';
  let titleStyles = 'font-serif text-[clamp(28px,2.5vw,40px)] leading-[150%] tracking-[-1px] mb-4 text-[#00162D]';
  let bodyStyles = 'font-sans font-normal text-[clamp(16px,1.25vw,24px)] leading-[160%] text-[#000000] space-y-4 [&_p]:mb-3 [&_p:last-child]:mb-0';

  switch (variant) {
    case 'article-section':
      // Figma Group 2085665614: Clean article content block with 40px DM Serif title & 24px #5A5A5A copy
      containerStyles = 'bg-transparent py-4 my-6 max-w-[1054px]';
      titleStyles = 'font-serif text-[clamp(28px,2.5vw,40px)] leading-[60px] tracking-[-1px] mb-6 text-[#00162D]';
      bodyStyles = 'font-sans font-normal text-[clamp(16px,1.25vw,24px)] leading-[160%] text-[#5A5A5A] space-y-6 [&_p]:mb-6 [&_p:last-child]:mb-0 [&_blockquote]:border-l-4 [&_blockquote]:border-[#2B88D9] [&_blockquote]:pl-6 [&_blockquote]:italic';
      break;

    case 'quote':
      // Quote callout with accent and #5A5A5A typography
      containerStyles = 'bg-transparent border-l-4 border-[#2B88D9] pl-6 sm:pl-8 py-2 my-6 max-w-[1054px]';
      titleStyles = 'font-serif text-[clamp(28px,2.5vw,40px)] leading-[60px] tracking-[-1px] mb-4 text-[#00162D]';
      bodyStyles = 'font-sans font-normal text-[clamp(16px,1.25vw,24px)] leading-[160%] text-[#5A5A5A] italic space-y-4';
      break;

    case 'gradient':
      containerStyles = 'bg-gradient-to-r from-[#D31E2D]/10 via-[#B0C8E5]/20 to-transparent border border-[#2B88D9]/30 rounded-[30px] p-6 sm:p-8 md:p-10 xl:p-[42px]';
      titleStyles = 'font-serif text-[clamp(28px,2.5vw,40px)] leading-[150%] tracking-[-1px] mb-4 text-brand-red';
      break;

    case 'blue':
      containerStyles = 'bg-[#F2F6F9] border-l-4 border-[#2B88D9] rounded-[20px] p-6 sm:p-8 md:p-10 xl:p-[42px]';
      titleStyles = 'font-serif text-[clamp(28px,2.5vw,40px)] leading-[150%] tracking-[-1px] mb-4 text-[#022E4C]';
      bodyStyles = 'font-sans font-normal text-[clamp(16px,1.25vw,22px)] leading-[160%] text-[#2B2B2B]';
      break;

    case 'minimal':
      containerStyles = 'bg-white border-2 border-[#CBD5E1] rounded-[24px] shadow-sm p-6 sm:p-8 md:p-10 xl:p-[42px]';
      break;

    case 'default':
    default:
      // Exact Figma Group 2085662699: Rectangle 40116 (1051px x 423px, rounded 30px, linear-gradient 90.29deg)
      containerStyles = 'bg-[linear-gradient(90.29deg,rgba(176,200,229,0.24)_1.72%,rgba(203,213,225,0)_99.76%)] border border-[rgba(176,200,229,0.3)] rounded-[30px] p-6 sm:p-8 md:p-10 xl:p-[42px]';
      break;
  }

  return (
    <div className={`w-full max-w-[1054px] my-6 md:my-8 transition-all ${containerStyles} ${className}`.trim()}>
      {title && (
        <h3 className={titleStyles}>
          {title}
        </h3>
      )}

      {description && (
        <div
          className={bodyStyles}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
};
