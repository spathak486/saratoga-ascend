import type { Schema, Struct } from '@strapi/strapi';

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
      'core-component.heading': CoreComponentHeading;
      'core-component.promo': CoreComponentPromo;
      'media.banner': MediaBanner;
      'references.banner-reference': ReferencesBannerReference;
      'references.client-logos-reference': ReferencesClientLogosReference;
      'references.cta': ReferencesCta;
      'references.fa-qs': ReferencesFaQs;
      'references.service-reference': ReferencesServiceReference;
      'shared.general-link': SharedGeneralLink;
      'shared.link-column': SharedLinkColumn;
      'shared.seo': SharedSeo;
    }
  }
}
