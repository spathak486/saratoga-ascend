import { IMAGE_FIELDS } from '../fragments';
import type { RawContentNode } from '../types';

export const CASE_STUDY_ITEM_FIELDS = `
  documentId
  title
  slug
  summary
  client
  author
  articleDate
  readTime
  categoryType
  image { ${IMAGE_FIELDS} }
`;

export interface AllCaseStudiesQueryResult {
  caseStudies: RawContentNode[];
}

export const ALL_CASE_STUDIES_QUERY = `
  query GetAllCaseStudies {
    caseStudies(sort: "articleDate:desc") { ${CASE_STUDY_ITEM_FIELDS} }
  }
`;

