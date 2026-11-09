export { getPageBySlug, getAllPageSlugs } from './page.service';
export { getArticles, getAllArticles, getArticleBySlug, getAllArticleSlugs } from './news.service';
export { getFooterData } from './footer.service';
export { getNavigationData } from './navigation.service';
export { getNotFoundData } from './not-found.service';
export { getBlogBySlug, getAllBlogs, getAllBlogSlugs } from './blog.service';
export { getSolutionBySlug, getAllSolutionSlugs } from './solution.service';
export { getServiceBySlug, getAllServiceSlugs } from './service.service';
export { getContractBySlug, getAllContractSlugs } from './contract.service';
export {
  normalizeSlug,
  getDynamicSlugCandidates,
  buildSlugQueryVariables,
  SECTION_PREFIX_ALIASES,
} from './slug-utils';

export * from './case-study.service';
