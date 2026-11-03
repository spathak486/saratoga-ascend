import React from 'react';

export interface KeyTakeawaysSectionProps {
  id?: string;
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
  id,
  title = 'Key Takeaways',
  description,
  variant = 'default',
  className = '',
}) => {
  if (!description && !title) return null;

  // Only use an explicit id — blog detail wraps sections with the TOC target id.
  // Variant-based container styling
  let containerStyles = '';
  let titleStyles = 'mb-3 font-serif text-[clamp(28px,2.5vw,40px)] leading-[130%] tracking-[-1px] text-[#00162D] xl:mb-4 xl:leading-[150%]';
  let bodyStyles = 'space-y-3 font-sans text-[clamp(16px,1.25vw,24px)] font-normal leading-[160%] text-[#000000] xl:space-y-4 [&_p]:mb-3 [&_p:last-child]:mb-0';
  const normalizedVariant = (variant || 'default')
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, '-');

  switch (normalizedVariant) {
    case 'article-section':
    case 'articlesection':
    case 'article':
      // Exact Figma Group 2085665614: 1054px container, 40px/60px DM Serif #00162D title, 24px/38px (160%) Google Sans Flex #5A5A5A body
      containerStyles = 'my-4 w-full max-w-[1054px] !border-0 !bg-transparent py-1 !p-0 !shadow-none sm:my-5 xl:my-6 xl:py-2';
      titleStyles = 'mb-3 font-serif text-[clamp(28px,2.5vw,40px)] font-normal leading-[1.25] tracking-[-1px] text-[#00162D] xl:mb-4 xl:leading-[60px]';
      bodyStyles = 'space-y-4 font-sans text-[clamp(18px,1.4vw,24px)] font-normal leading-[160%] text-[#5A5A5A] xl:space-y-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--Sky-blue,#2B88D9)] [&_blockquote]:pl-4 [&_blockquote]:italic sm:[&_blockquote]:pl-6 [&_p]:mb-4 [&_p:last-child]:mb-0 xl:[&_p]:mb-6';
      break;

    case 'quote':
      // Exact Figma Quote: border-left: 5.38px solid #2B88D9, padding-left: 30px, max-w: 1056px
      // Quote: 50px DM Serif #2B88D9 | Author Attribution: 24px Google Sans Flex #5A5A5A
      containerStyles = 'my-5 w-full max-w-[1056px] !border-y-0 !border-r-0 !border-l-[5.38px] !border-l-[#2B88D9] bg-transparent pb-4 pl-4 pt-0 sm:my-6 sm:pl-6 xl:my-8 xl:pb-[21.51px] xl:pl-[30px]';
      titleStyles = 'mb-3 font-serif text-[clamp(28px,2.5vw,40px)] font-normal leading-[1.25] tracking-[-1px] !text-[#2B88D9] xl:mb-4 xl:leading-[60px]';
      bodyStyles = 'space-y-3 font-serif text-[clamp(28px,2.8vw,50px)] font-normal leading-[120%] tracking-[-1px] !text-[#2B88D9] xl:space-y-4 [&_*]:!text-[#2B88D9] [&_cite]:mt-3 [&_cite]:block [&_cite]:font-sans [&_cite]:text-[clamp(18px,1.4vw,24px)] [&_cite]:font-normal [&_cite]:not-italic [&_cite]:leading-[160%] [&_cite]:!text-[#5A5A5A] xl:[&_cite]:mt-4 [&_p]:mb-3 [&_p]:!text-[#2B88D9] [&_p]:!leading-[120%] [&_p:last-child]:mb-0 [&_p:last-child:has(cite)]:!text-[#5A5A5A] [&_p.quote-author]:font-sans [&_p.quote-author]:text-[clamp(18px,1.4vw,24px)] [&_p.quote-author]:!text-[#5A5A5A] xl:[&_p]:mb-4';
      break;

    case 'gradient':
      containerStyles = 'rounded-[24px] border border-[#2B88D9]/30 bg-gradient-to-r from-[#D31E2D]/10 via-[#B0C8E5]/20 to-transparent p-5 sm:rounded-[28px] sm:p-7 xl:rounded-[30px] xl:p-[42px]';
      titleStyles = 'mb-3 font-serif text-[clamp(28px,2.5vw,40px)] leading-[130%] tracking-[-1px] text-brand-red xl:mb-4 xl:leading-[150%]';
      break;

    case 'blue':
      containerStyles = 'rounded-[16px] border-l-4 border-[#2B88D9] bg-[#F2F6F9] p-5 sm:rounded-[20px] sm:p-7 xl:p-[42px]';
      titleStyles = 'mb-3 font-serif text-[clamp(28px,2.5vw,40px)] leading-[130%] tracking-[-1px] text-[#022E4C] xl:mb-4 xl:leading-[150%]';
      bodyStyles = 'font-sans text-[clamp(16px,1.25vw,22px)] font-normal leading-[160%] text-[#2B2B2B]';
      break;

    case 'minimal':
      containerStyles = 'rounded-[20px] border-2 border-[#CBD5E1] bg-white p-5 shadow-sm sm:rounded-[24px] sm:p-7 xl:p-[42px]';
      break;

    case 'default':
    default:
      // Exact Figma Group 2085662699: Rectangle 40116 (1051px x 423px, rounded 30px, linear-gradient 90.29deg)
      containerStyles = 'rounded-[24px] border border-[rgba(176,200,229,0.3)] bg-[linear-gradient(90.29deg,rgba(176,200,229,0.24)_1.72%,rgba(203,213,225,0)_99.76%)] p-5 sm:rounded-[28px] sm:p-7 xl:rounded-[30px] xl:p-[42px]';
      break;
  }

  // Format quote description: if quote variant, detect author line (starts with — or -)
  // and style it with exact Figma Container styling: 24px Google Sans Flex #5A5A5A
  let renderedDescription = description;
  if (normalizedVariant === 'quote' && description) {
    renderedDescription = description.replace(
      /(<p[^>]*>)?\s*([—–-]\s*[^<]+)(<\/p>)?/g,
      '<p class="quote-author font-sans font-normal text-[clamp(18px,1.4vw,24px)] leading-[160%] !text-[#5A5A5A] mt-4 pt-1">$2</p>'
    );
  }

  return (
    <div
      id={id}
      className={`my-4 w-full max-w-[1054px] scroll-mt-28 transition-all sm:my-6 xl:my-8 ${containerStyles} ${className}`.trim()}
    >
      {title && (
        <h3 className={titleStyles}>
          {title}
        </h3>
      )}

      {renderedDescription && (
        <div
          className={bodyStyles}
          dangerouslySetInnerHTML={{ __html: renderedDescription }}
        />
      )}
    </div>
  );
};
