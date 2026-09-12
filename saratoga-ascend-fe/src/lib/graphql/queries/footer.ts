import { IMAGE_FIELDS, GENERAL_LINK_FIELDS } from '../fragments';
import type { RawFooter } from '../types';
import type { PublicationStatus } from './home';

export interface FooterQueryVariables {
  status?: PublicationStatus;
}

export interface FooterQueryResult {
  footer: RawFooter | null;
}

export const FOOTER_QUERY = `
  query GetFooter($status: PublicationStatus) {
    footer(status: $status) {
      documentId
      headline
      newsletterHeading
      privacyConsentText
      privacyConsentLink { ${GENERAL_LINK_FIELDS} }
      linkColumns {
        heading
        links { ${GENERAL_LINK_FIELDS} }
      }
      contactHeading
      contactEmail
      contactPhone
      copyrightText
      logo { ${IMAGE_FIELDS} }
      legalLinks { ${GENERAL_LINK_FIELDS} }
    }
  }
`;