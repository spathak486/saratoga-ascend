import { IMAGE_FIELDS, GENERAL_LINK_FIELDS, SEO_FIELDS } from '../fragments';
import type { PublicationStatus, RawNotFound } from '../types';

export interface NotFoundQueryVariables {
  status?: PublicationStatus;
}

export interface NotFoundQueryResult {
  notFound: RawNotFound | null;
}

export const NOT_FOUND_QUERY = `
  query GetNotFound($status: PublicationStatus) {
    notFound(status: $status) {
      documentId
      title
      description
      graphic { ${IMAGE_FIELDS} }
      primaryCta { ${GENERAL_LINK_FIELDS} }
      secondaryCta { ${GENERAL_LINK_FIELDS} }
      seo { ${SEO_FIELDS} }
    }
  }
`;