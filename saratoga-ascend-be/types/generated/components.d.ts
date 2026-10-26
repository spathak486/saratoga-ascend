import type { Schema, Struct } from '@strapi/strapi';

export interface CoreComponentAchievementCards extends Struct.ComponentSchema {
  collectionName: 'components_core_component_achievement_cards';
  info: {
    displayName: 'Achievement Cards';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface CoreComponentCounter extends Struct.ComponentSchema {
  collectionName: 'components_core_component_counters';
  info: {
    displayName: 'Counter';
    icon: 'bell';
  };
  attributes: {
    counter: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface CoreComponentHeading extends Struct.ComponentSchema {
  collectionName: 'components_core_component_headings';
  info: {
    displayName: 'Heading';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface CoreComponentNumberedCard extends Struct.ComponentSchema {
  collectionName: 'components_core_component_numbered_cards';
  info: {
    description: 'Reusable numbered pillar or step card';
    displayName: 'Numbered Card';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    isHighlighted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    number: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CoreComponentPromo extends Struct.ComponentSchema {
  collectionName: 'components_core_component_promos';
  info: {
    displayName: 'Promo';
    icon: 'crown';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.Component<'shared.general-link', false>;
    subTitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface CoreComponentPurposeCard extends Struct.ComponentSchema {
  collectionName: 'components_core_component_purpose_cards';
  info: {
    description: 'Reusable card with icon, title, and description for values and purpose';
    displayName: 'Purpose Card';
    icon: 'star';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CoreComponentValueCard extends Struct.ComponentSchema {
  collectionName: 'components_core_component_value_cards';
  info: {
    description: 'Individual card for Mission, Vision, and Promise values';
    displayName: 'Value Card';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    isHighlighted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MediaBanner extends Struct.ComponentSchema {
  collectionName: 'components_media_banners';
  info: {
    displayName: 'Banner Component';
    icon: 'book';
  };
  attributes: {
    bannerDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    bannerImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    bannerSubTitle: Schema.Attribute.Text;
    bannerTitle: Schema.Attribute.String & Schema.Attribute.Required;
    buttonCTA: Schema.Attribute.Component<'shared.general-link', false>;
    variant: Schema.Attribute.Enumeration<
      ['homebanner', 'default', 'gradient']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'homebanner'>;
  };
}

export interface ReferencesAccountableOperatingEnvironmentsReference
  extends Struct.ComponentSchema {
  collectionName: 'components_references_accountable_operating_environments_references';
  info: {
    description: 'Built for accountable operating environments carousel section reference';
    displayName: 'Accountable Operating Environments Reference';
    icon: 'apps';
  };
  attributes: {
    accountableOperatingEnvironmentsSection: Schema.Attribute.Relation<
      'oneToOne',
      'api::accountable-operating-environments-section.accountable-operating-environments-section'
    >;
  };
}

export interface ReferencesAchievements extends Struct.ComponentSchema {
  collectionName: 'components_references_achievements';
  info: {
    displayName: 'Achievements';
    icon: 'book';
  };
  attributes: {
    ourAchievement: Schema.Attribute.Relation<
      'oneToOne',
      'api::our-achievement.our-achievement'
    >;
  };
}

export interface ReferencesBannerReference extends Struct.ComponentSchema {
  collectionName: 'components_references_banner_references';
  info: {
    displayName: 'Banner';
    icon: 'bulletList';
  };
  attributes: {
    heroBanner: Schema.Attribute.Relation<
      'oneToOne',
      'api::hero-banner.hero-banner'
    >;
  };
}

export interface ReferencesBlogListing extends Struct.ComponentSchema {
  collectionName: 'components_references_blog_listings';
  info: {
    description: 'A section that lists all blogs with client-side filtering';
    displayName: 'Blog Listing';
    icon: 'bulletList';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Blogs'>;
    subheading: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Explore Insights Shaping the Future of Federal Healthcare'>;
  };
}

export interface ReferencesBuiltAroundMissionsReference
  extends Struct.ComponentSchema {
  collectionName: 'components_references_built_around_missions_references';
  info: {
    description: 'Built around the missions that matter section reference';
    displayName: 'Built Around Missions Reference';
    icon: 'layer';
  };
  attributes: {
    builtAroundMissionsSection: Schema.Attribute.Relation<
      'oneToOne',
      'api::built-around-missions-section.built-around-missions-section'
    >;
  };
}

export interface ReferencesCeoMessageReference extends Struct.ComponentSchema {
  collectionName: 'components_references_ceo_message_references';
  info: {
    description: 'Executive message from CEO section reference';
    displayName: 'CEO Message Reference';
    icon: 'user';
  };
  attributes: {
    ceoMessageSection: Schema.Attribute.Relation<
      'oneToOne',
      'api::ceo-message-section.ceo-message-section'
    >;
  };
}

export interface ReferencesClientLogosReference extends Struct.ComponentSchema {
  collectionName: 'components_references_client_logos_references';
  info: {
    displayName: 'Client Logos Reference';
    icon: 'landscape';
  };
  attributes: {
    clientLogosSection: Schema.Attribute.Relation<
      'oneToOne',
      'api::client-logos-section.client-logos-section'
    >;
  };
}

export interface ReferencesContactInquiryReference
  extends Struct.ComponentSchema {
  collectionName: 'components_references_contact_inquiry_references';
  info: {
    description: 'Contact inquiry and lead capture section reference';
    displayName: 'Contact Inquiry Reference';
    icon: 'mail';
  };
  attributes: {
    contactInquirySection: Schema.Attribute.Relation<
      'oneToOne',
      'api::contact-inquiry-section.contact-inquiry-section'
    >;
  };
}

export interface ReferencesContactLearnReference
  extends Struct.ComponentSchema {
  collectionName: 'components_references_contact_learn_references';
  info: {
    description: 'Learn more about Saratoga Ascend section reference';
    displayName: 'Contact Learn Reference';
    icon: 'book';
  };
  attributes: {
    contactLearnSection: Schema.Attribute.Relation<
      'oneToOne',
      'api::contact-learn-section.contact-learn-section'
    >;
  };
}

export interface ReferencesContactOfficesReference
  extends Struct.ComponentSchema {
  collectionName: 'components_references_contact_offices_references';
  info: {
    description: 'Office locations map section reference';
    displayName: 'Contact Offices Reference';
    icon: 'pin';
  };
  attributes: {
    contactOfficesSection: Schema.Attribute.Relation<
      'oneToOne',
      'api::contact-offices-section.contact-offices-section'
    >;
  };
}

export interface ReferencesContactPathwaysReference
  extends Struct.ComponentSchema {
  collectionName: 'components_references_contact_pathways_references';
  info: {
    description: 'Connect with the right part of Saratoga Ascend pathways reference';
    displayName: 'Contact Pathways Reference';
    icon: 'link';
  };
  attributes: {
    contactPathwaysSection: Schema.Attribute.Relation<
      'oneToOne',
      'api::contact-pathways-section.contact-pathways-section'
    >;
  };
}

export interface ReferencesCta extends Struct.ComponentSchema {
  collectionName: 'components_references_ctas';
  info: {
    displayName: 'CTA';
    icon: 'crown';
  };
  attributes: {
    cta: Schema.Attribute.Relation<'oneToOne', 'api::cta.cta'>;
  };
}

export interface ReferencesFaQs extends Struct.ComponentSchema {
  collectionName: 'components_references_fa_qs';
  info: {
    displayName: 'FAQs';
    icon: 'layer';
  };
  attributes: {
    content: Schema.Attribute.Relation<
      'oneToOne',
      'api::content-block.content-block'
    >;
    faqs: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>;
    supportCta: Schema.Attribute.Relation<
      'oneToOne',
      'api::content-block.content-block'
    >;
  };
}

export interface ReferencesHappyClientsReference
  extends Struct.ComponentSchema {
  collectionName: 'components_references_happy_clients_references';
  info: {
    description: '';
    displayName: 'Happy Clients Reference';
  };
  attributes: {
    description: Schema.Attribute.Text;
    reviews: Schema.Attribute.Relation<
      'oneToMany',
      'api::client-review.client-review'
    >;
    title: Schema.Attribute.String;
  };
}

export interface ReferencesLatestInsights extends Struct.ComponentSchema {
  collectionName: 'components_references_latest_insights';
  info: {
    description: 'Select news and blogs for the Latest Insights section';
    displayName: 'Latest Insights';
    icon: 'newspaper';
  };
  attributes: {
    blogs: Schema.Attribute.Relation<'oneToMany', 'api::blog.blog'>;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Latest news and insights'>;
    news: Schema.Attribute.Relation<'oneToMany', 'api::news.news'>;
    subheading: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Success is built on consistent effort.'>;
  };
}

export interface ReferencesLegalContent extends Struct.ComponentSchema {
  collectionName: 'components_references_legal_contents';
  info: {
    description: 'Legal / policy prose authored directly on the page \u2014 centred title plus a rich-text body (headings, lists, links).';
    displayName: 'Legal Content';
    icon: 'fileText';
  };
  attributes: {
    body: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    bodyColor: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#000000'>;
    showToc: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
    titleColor: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#0F3D60'>;
  };
}

export interface ReferencesMissionReference extends Struct.ComponentSchema {
  collectionName: 'components_references_mission_references';
  info: {
    displayName: 'Mission Reference';
    icon: 'heart';
  };
  attributes: {
    missionSection: Schema.Attribute.Relation<
      'oneToOne',
      'api::mission-section.mission-section'
    >;
  };
}

export interface ReferencesMissionVisionPromiseReference
  extends Struct.ComponentSchema {
  collectionName: 'components_references_mission_vision_promise_references';
  info: {
    description: 'Our Mission, Vision & Promise section reference';
    displayName: 'Mission Vision Promise Reference';
    icon: 'eye';
  };
  attributes: {
    missionVisionPromiseSection: Schema.Attribute.Relation<
      'oneToOne',
      'api::mission-vision-promise-section.mission-vision-promise-section'
    >;
  };
}

export interface ReferencesOurCapabilitiesReference
  extends Struct.ComponentSchema {
  collectionName: 'components_references_our_capabilities_references';
  info: {
    description: 'One organization. Connected solution areas carousel section reference';
    displayName: 'Our Capabilities Reference';
    icon: 'layer';
  };
  attributes: {
    ourCapabilitiesSection: Schema.Attribute.Relation<
      'oneToOne',
      'api::our-capabilities-section.our-capabilities-section'
    >;
  };
}

export interface ReferencesPastPerformanceReference
  extends Struct.ComponentSchema {
  collectionName: 'components_references_past_performance_references';
  info: {
    description: 'Select case studies for the Past Performance section';
    displayName: 'Past Performance Reference';
    icon: 'briefcase';
  };
  attributes: {
    caseStudies: Schema.Attribute.Relation<
      'oneToMany',
      'api::case-study.case-study'
    >;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Past Performance'>;
    subheading: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Real-world impact. Discover how we deliver rapid, compliant, and critical staffing solutions across the nation.'>;
  };
}

export interface ReferencesServiceReference extends Struct.ComponentSchema {
  collectionName: 'components_references_service_references';
  info: {
    displayName: 'Service Reference';
    icon: 'briefcase';
  };
  attributes: {
    heading: Schema.Attribute.Component<'core-component.heading', false>;
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
  };
}

export interface ReferencesSupportingMissionReference
  extends Struct.ComponentSchema {
  collectionName: 'components_references_supporting_mission_references';
  info: {
    description: 'Supporting the missions that move communities forward reference';
    displayName: 'Supporting Mission Reference';
    icon: 'shield';
  };
  attributes: {
    supportingMissionSection: Schema.Attribute.Relation<
      'oneToOne',
      'api::supporting-mission-section.supporting-mission-section'
    >;
  };
}

export interface ReferencesTakeMissionSeriouslyReference
  extends Struct.ComponentSchema {
  collectionName: 'components_references_take_mission_seriously_references';
  info: {
    description: 'People who take the mission seriously section reference';
    displayName: 'Take Mission Seriously Reference';
    icon: 'shield';
  };
  attributes: {
    takeMissionSeriouslySection: Schema.Attribute.Relation<
      'oneToOne',
      'api::take-mission-seriously-section.take-mission-seriously-section'
    >;
  };
}

export interface ReferencesWhatWeDoReference extends Struct.ComponentSchema {
  collectionName: 'components_references_what_we_do_references';
  info: {
    displayName: 'What We Do Reference';
    icon: 'briefcase';
  };
  attributes: {
    whatWeDoSection: Schema.Attribute.Relation<
      'oneToOne',
      'api::what-we-do-section.what-we-do-section'
    >;
  };
}

export interface ReferencesWorkforcePlanningReference
  extends Struct.ComponentSchema {
  collectionName: 'components_references_workforce_planning_references';
  info: {
    description: 'From Workforce Planning to Ongoing Support interactive step accordion section reference';
    displayName: 'Workforce Planning Reference';
    icon: 'bulletList';
  };
  attributes: {
    workforcePlanningSection: Schema.Attribute.Relation<
      'oneToOne',
      'api::workforce-planning-section.workforce-planning-section'
    >;
  };
}

export interface SharedCustomItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_custom_items';
  info: {
    displayName: 'Custom Item';
    icon: 'bulletList';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.general-link', false>;
    highlights: Schema.Attribute.Component<'shared.highlight', true>;
    image: Schema.Attribute.Media<'images'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedGeneralLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_general_links';
  info: {
    displayName: 'General Link';
    icon: 'attachment';
  };
  attributes: {
    description: Schema.Attribute.Text;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    isExternal: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    target: Schema.Attribute.Enumeration<['_self', '_blank']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'_self'>;
  };
}

export interface SharedHighlight extends Struct.ComponentSchema {
  collectionName: 'components_shared_highlights';
  info: {
    displayName: 'Highlight';
    icon: 'check';
  };
  attributes: {
    subtext: Schema.Attribute.String;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLinkColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_columns';
  info: {
    description: 'Navigation link column with a heading';
    displayName: 'Link Column';
    icon: 'list';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    links: Schema.Attribute.Component<'shared.general-link', true>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    canonicalURL: Schema.Attribute.Text;
    languageTag: Schema.Attribute.Enumeration<['en']>;
    metaDescription: Schema.Attribute.Text;
    metaRobots: Schema.Attribute.Enumeration<
      ['index', 'follow', 'noindex', 'nofollow']
    >;
    metaTitle: Schema.Attribute.Text;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    ogTitle: Schema.Attribute.Text;
    structuredData: Schema.Attribute.JSON;
    twitterCardTitle: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'core-component.achievement-cards': CoreComponentAchievementCards;
      'core-component.counter': CoreComponentCounter;
      'core-component.heading': CoreComponentHeading;
      'core-component.numbered-card': CoreComponentNumberedCard;
      'core-component.promo': CoreComponentPromo;
      'core-component.purpose-card': CoreComponentPurposeCard;
      'core-component.value-card': CoreComponentValueCard;
      'media.banner': MediaBanner;
      'references.accountable-operating-environments-reference': ReferencesAccountableOperatingEnvironmentsReference;
      'references.achievements': ReferencesAchievements;
      'references.banner-reference': ReferencesBannerReference;
      'references.blog-listing': ReferencesBlogListing;
      'references.built-around-missions-reference': ReferencesBuiltAroundMissionsReference;
      'references.ceo-message-reference': ReferencesCeoMessageReference;
      'references.client-logos-reference': ReferencesClientLogosReference;
      'references.contact-inquiry-reference': ReferencesContactInquiryReference;
      'references.contact-learn-reference': ReferencesContactLearnReference;
      'references.contact-offices-reference': ReferencesContactOfficesReference;
      'references.contact-pathways-reference': ReferencesContactPathwaysReference;
      'references.cta': ReferencesCta;
      'references.fa-qs': ReferencesFaQs;
      'references.happy-clients-reference': ReferencesHappyClientsReference;
      'references.latest-insights': ReferencesLatestInsights;
      'references.legal-content': ReferencesLegalContent;
      'references.mission-reference': ReferencesMissionReference;
      'references.mission-vision-promise-reference': ReferencesMissionVisionPromiseReference;
      'references.our-capabilities-reference': ReferencesOurCapabilitiesReference;
      'references.past-performance-reference': ReferencesPastPerformanceReference;
      'references.service-reference': ReferencesServiceReference;
      'references.supporting-mission-reference': ReferencesSupportingMissionReference;
      'references.take-mission-seriously-reference': ReferencesTakeMissionSeriouslyReference;
      'references.what-we-do-reference': ReferencesWhatWeDoReference;
      'references.workforce-planning-reference': ReferencesWorkforcePlanningReference;
      'shared.custom-item': SharedCustomItem;
      'shared.general-link': SharedGeneralLink;
      'shared.highlight': SharedHighlight;
      'shared.link-column': SharedLinkColumn;
      'shared.seo': SharedSeo;
    }
  }
}
