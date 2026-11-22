import { IMAGE_FIELDS, SEO_FIELDS, BLOG_SECTION_FRAGMENTS } from '../fragments';
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
  category {
    name
    slug
  }
  image { ${IMAGE_FIELDS} }
`;

export const CASE_STUDY_FIELDS = `
  ${CASE_STUDY_ITEM_FIELDS}
  description
  seo { ${SEO_FIELDS} }
  Section {
    ${BLOG_SECTION_FRAGMENTS}
  }
`;

export interface AllCaseStudiesQueryResult {
  caseStudies: RawContentNode[];
}

export const ALL_CASE_STUDIES_QUERY = `
  query GetAllCaseStudies {
    caseStudies(sort: "articleDate:desc") { ${CASE_STUDY_ITEM_FIELDS} }
  }
`;

export interface CaseStudyBySlugQueryVariables {
  slug: string;
}

export interface CaseStudyBySlugQueryResult {
  caseStudies: RawContentNode[];
}

export const CASE_STUDY_BY_SLUG_QUERY = `
  query GetCaseStudyBySlug($slug: String!) {
    caseStudies(filters: { slug: { eq: $slug } }) { ${CASE_STUDY_FIELDS} }
  }
`;
export const ALL_CASE_STUDY_SLUGS_QUERY = `
  query GetAllCaseStudySlugs {
    caseStudies { slug }
  }
`;
