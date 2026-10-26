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

  const sectionId =
    id ||
    (title
      ? title
          .toLowerCase()
          .trim()
          .replace(/[^\p{L}\p{N}\s-]/gu, '')
          .replace(/[\s-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      : undefined);

  // Variant-based container styling
  let containerStyles = '';
  let titleStyles = 'font-serif text-[clamp(28px,2.5vw,40px)] leading-[150%] tracking-[-1px] mb-4 text-[#00162D]';
  let bodyStyles = 'font-sans font-normal text-[clamp(16px,1.25vw,24px)] leading-[160%] text-[#000000] space-y-4 [&_p]:mb-3 [&_p:last-child]:mb-0';
  const normalizedVariant = (variant || 'default')
    .toLowerCase()
    .trim()
    .replace(/[_\s]+/g, '-');

  switch (normalizedVariant) {
    case 'article-section':
    case 'articlesection':
    case 'article':
      // Exact Figma Group 2085665614: 1054px container, 40px/60px DM Serif #00162D title, 24px/38px (160%) Google Sans Flex #5A5A5A body
      containerStyles = '!bg-transparent !border-0 !shadow-none !p-0 py-2 my-6 max-w-[1054px] w-full';
      titleStyles = 'font-serif font-normal text-[clamp(28px,2.5vw,40px)] leading-[60px] tracking-[-1px] mb-4 text-[#00162D]';
      bodyStyles = 'font-sans font-normal text-[clamp(18px,1.4vw,24px)] leading-[160%] text-[#5A5A5A] space-y-6 [&_p]:mb-6 [&_p:last-child]:mb-0 [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--Sky-blue,#2B88D9)] [&_blockquote]:pl-6 [&_blockquote]:italic';
      break;

    case 'quote':
      // Exact Figma Quote: border-left: 5.38px solid #2B88D9, padding-left: 30px, max-w: 1056px
      // Quote: 50px DM Serif #2B88D9 | Author Attribution: 24px Google Sans Flex #5A5A5A
      containerStyles = 'bg-transparent !border-y-0 !border-r-0 !border-l-[5.38px] !border-l-[#2B88D9] pl-6 sm:pl-[30px] pt-0 pb-[21.51px] my-8 max-w-[1056px] w-full';
      titleStyles = 'font-serif font-normal text-[clamp(28px,2.5vw,40px)] leading-[60px] tracking-[-1px] mb-4 !text-[#2B88D9]';
      bodyStyles = 'font-serif font-normal text-[clamp(28px,2.8vw,50px)] leading-[120%] tracking-[-1px] !text-[#2B88D9] [&_*]:!text-[#2B88D9] [&_p]:!text-[#2B88D9] [&_p]:!leading-[120%] space-y-4 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_cite]:block [&_cite]:font-sans [&_cite]:font-normal [&_cite]:text-[clamp(18px,1.4vw,24px)] [&_cite]:leading-[160%] [&_cite]:!text-[#5A5A5A] [&_cite]:not-italic [&_cite]:mt-4 [&_p:last-child:has(cite)]:!text-[#5A5A5A] [&_p.quote-author]:font-sans [&_p.quote-author]:text-[24px] [&_p.quote-author]:!text-[#5A5A5A] [&_p:last-child]:has-dash';
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
      id={sectionId}
      className={`w-full max-w-[1054px] my-6 md:my-8 transition-all scroll-mt-28 ${containerStyles} ${className}`.trim()}
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
