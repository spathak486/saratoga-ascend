import { IMAGE_FIELDS, GENERAL_LINK_FIELDS } from '../fragments';
import type { PublicationStatus, RawNavigation } from '../types';

export interface NavigationQueryVariables {
  status?: PublicationStatus;
}

export interface NavigationQueryResult {
  navigation: RawNavigation | null;
}

export const NAVIGATION_QUERY = `
  query GetNavigation($status: PublicationStatus) {
    navigation(status: $status) {
      documentId
      logo { ${IMAGE_FIELDS} }
      logoAlt
      homeHref
      utilityLinks {
        label
        href
        hasMenu
        hasExternalIcon
        links { ${GENERAL_LINK_FIELDS} }
      }
      primaryLinks {
        label
        href
        hasMenu
        hasExternalIcon
        links { ${GENERAL_LINK_FIELDS} }
      }
      cta { ${GENERAL_LINK_FIELDS} }
      searchLabel
    }
  }
`;
