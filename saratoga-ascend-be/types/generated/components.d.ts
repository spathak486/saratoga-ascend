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
      'references.cta': ReferencesCta;
      'shared.general-link': SharedGeneralLink;
      'shared.seo': SharedSeo;
    }
  }
}
