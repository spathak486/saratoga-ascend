import { SEO_FIELDS, DYNAMIC_SECTION_FRAGMENTS } from '../fragments';
import type { RawMetaPageNode } from '../types';

export type PublicationStatus = 'DRAFT' | 'PUBLISHED';

export interface HomePageQueryVariables {
  status?: PublicationStatus;
}

export interface HomePageQueryResult {
  home: RawMetaPageNode | null;
}

export const HOME_PAGE_QUERY = `
  query GetHomePage($status: PublicationStatus) {
    home(status: $status) {
      documentId
      pageTitle
      slug
      seo { ${SEO_FIELDS} }
      Section {
        ${DYNAMIC_SECTION_FRAGMENTS}
      }
    }
  }
`;

export interface AboutUsPageQueryVariables {
  status?: PublicationStatus;
}

export interface AboutUsPageQueryResult {
  aboutUs: RawMetaPageNode | null;
}

export const ABOUT_US_PAGE_QUERY = `
  query GetAboutUsPage($status: PublicationStatus) {
    aboutUs(status: $status) {
      documentId
      pageTitle
      slug
      seo { ${SEO_FIELDS} }
      Section {
        ${DYNAMIC_SECTION_FRAGMENTS}
      }
    }
  }
`;