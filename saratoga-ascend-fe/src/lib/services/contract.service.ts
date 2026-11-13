import 'server-only';
import { isMockMode, defaultPublicationStatus } from '@/lib/api/config';
import { gql } from '@/lib/api/graphql';
import {
  CONTRACT_BY_SLUG_QUERY,
  ALL_CONTRACT_SLUGS_QUERY,
  type ContractBySlugQueryVariables,
  type ContractBySlugQueryResult,
  type AllContractSlugsQueryResult,
} from '@/lib/graphql';
import { resolvePageNode } from '@/lib/content/transformers';
import { PageSchema, type Page, type ApiResult, ok, fail } from '@/lib/schemas';
import { getDynamicSlugCandidates, buildSlugQueryVariables, normalizeSlug } from './slug-utils';

async function queryContractBySlug(slug: string): Promise<ApiResult<ContractBySlugQueryResult>> {
  const { slug: primary, altSlug } = buildSlugQueryVariables(slug);

  const probingDraft = defaultPublicationStatus === 'DRAFT';
  let result = await gql.query<ContractBySlugQueryResult>(
    CONTRACT_BY_SLUG_QUERY,
    {
      slug: primary,
      altSlug,
      status: defaultPublicationStatus,
    },
    { quiet: probingDraft },
  );

  const draftBlocked =
    probingDraft && (Boolean(result.error) || result.data?.contracts.length === 0);
  if (draftBlocked) {
    result = await gql.query<ContractBySlugQueryResult>(CONTRACT_BY_SLUG_QUERY, {
      slug: primary,
      altSlug,
      status: 'PUBLISHED',
    });
  }
  return result;
}

/**
 * Fetch a contract page from the `contracts` collection by slug dynamically.
 */
export async function getContractBySlug(slug: string): Promise<ApiResult<Page>> {
  if (isMockMode) {
    return fail('NOT_FOUND', 404, `Contract not found: ${slug}`);
  }

  const candidates = getDynamicSlugCandidates(slug, 'contract');

  let entry: ContractBySlugQueryResult['contracts'][number] | undefined;
  for (const candidate of candidates) {
    const result = await queryContractBySlug(candidate);
    if (result.error) continue;
    if (result.data?.contracts?.[0]) {
      entry = result.data.contracts[0];
      break;
    }
  }

  if (!entry) {
    return fail('NOT_FOUND', 404, `Contract not found: ${slug}`);
  }

  const pathwaysSection = {
    __typename: 'ComponentReferencesProcurementPathwaysReference' as const,
    referenceTitle: 'Federal Procurement Pathways',
    title: '<h2>Federal procurement pathways aligned to agency requirements</h2>',
    description: '<p>Federal agencies may acquire services through open-market solicitations, agency-specific IDIQs and BPAs, governmentwide acquisition contracts, or existing contract holders. Saratoga Ascend can discuss direct opportunities and teaming arrangements where scope and eligibility align.</p>',
    cards: [
      {
        cardTitle: 'How buyers may engage',
        cardSubtitle: 'Direct agency procurement, schedule orders & task order contracting',
        description: '<p>Start with the mission requirement and procurement strategy. We can review capability alignment, clarify the relevant contract record, and discuss whether a direct opportunity or a partner-led route is appropriate.</p>',
        cta: {
          label: 'Start a Conversation',
          href: '/contact',
          target: '_self',
          isExternal: false,
        },
        items: [
          {
            title: 'GSA Alliant 2 Governmentwide Acquisition Contract (GWAC)',
            contractNumber: '47QTCK18D0044',
            subtitle: 'Contract Number: 47QTCK18D0044 Learn more about Alliant 2',
            categoryLabel: 'GSA Multiple Award Schedule (MAS) Category:',
            categories:
              '54151HEAL: Health Information Technology Services\n54151S: Information Technology Professional Services\n541611: Administrative Management & General Management Consulting Services\n561422: Automated Contact Center Solutions (ACCS)\n54151HACS: Highly Adaptive Cybersecurity Services\n518210C: Cloud and Cloud-Related IT Professional Services',
            link: {
              label: 'Learn more about Alliant 2',
              href: '/contact',
              target: '_self',
            },
          },
          {
            title: 'GSA Multiple Award Schedule (MAS)',
            contractNumber: '47QTCK18D0044',
            subtitle: 'Contract Number: 47QTCK18D0044 Learn more about MAS',
            categoryLabel: 'GSA Multiple Award Schedule (MAS) Category:',
            categories:
              '54151HEAL: Health Information Technology Services\n54151S: Information Technology Professional Services\n541611: Administrative Management & General Management Consulting Services\n561422: Automated Contact Center Solutions (ACCS)',
            link: {
              label: 'Learn more about MAS',
              href: '/contact',
              target: '_self',
            },
          },
          {
            title: 'GSA Alliant 3 Governmentwide Acquisition Contract (GWAC)',
            contractNumber: '47QTCK18D0044',
            subtitle: 'Contract Number: 47QTCK18D0044 Learn more about Alliant 3',
            categoryLabel: 'GSA Multiple Award Schedule (MAS) Category:',
            categories:
              '54151HEAL: Health Information Technology Services\n54151S: Information Technology Professional Services\n541611: Administrative Management & General Management Consulting Services',
            link: {
              label: 'Learn more about Alliant 3',
              href: '/contact',
              target: '_self',
            },
          },
          {
            title: 'GSA One Acquisition Solution for Integrated Services + (OASIS+) Governmentwide Multi Award Contract (MAC)',
            contractNumber: '47QTCK18D0044',
            subtitle: 'Contract Number: 47QTCK18D0044 Learn more about OASIS+',
            categoryLabel: 'Scope & Specialized Domains:',
            categories:
              'Program Management Services\nManagement and Advisory Services\nTechnical and Engineering Services\nSpecialized Healthcare Operational Support',
            link: {
              label: 'Learn more about OASIS+',
              href: '/contact',
              target: '_self',
            },
          },
        ],
      },
      {
        cardTitle: 'Agency-Specific IDIQs, BPAs & Teaming Vehicles',
        cardSubtitle: 'Flexible contracting pathways designed for planned growth and surge requirements',
        description: '<p>Federal and civilian healthcare programs can leverage Saratoga Ascend through dedicated blanket purchase agreements, indefinite delivery contracts, and established subcontracting arrangements.</p>',
        cta: {
          label: 'Discuss Teaming & Vehicles',
          href: '/contact',
          target: '_self',
          isExternal: false,
        },
        items: [
          {
            title: 'Veterans Health Administration & Military Health Systems',
            contractNumber: 'VA-DHA-PATHWAY-01',
            subtitle: 'Clinical Surge Deployment & Credentialed Healthcare Delivery',
            categoryLabel: 'Covered Specializations & Clinical Areas:',
            categories:
              'Physicians, Nurse Practitioners & Specialized Nursing\nBehavioral Health & Clinical Psychology\nAllied Health, Pharmacy & Laboratory Operations',
            link: {
              label: 'Inquire about VHA/DHA Support',
              href: '/contact',
              target: '_self',
            },
          },
          {
            title: 'State & Local Public Health Cooperative Agreements',
            contractNumber: 'SLED-COOP-02',
            subtitle: 'Cooperative purchasing schedules and emergency workforce response',
            categoryLabel: 'Service Scope:',
            categories:
              'Epidemiological Monitoring & Public Health Outreach\nState Hospital System Augmentation\nCommunity Health Clinic Staffing',
            link: {
              label: 'Explore State/Local Pathways',
              href: '/contact',
              target: '_self',
            },
          },
        ],
      },
    ],
  };

  const rawNode = resolvePageNode(entry);
  const normalizedCandidate = normalizeSlug(slug);
  if (
    normalizedCandidate.includes('contract-vehicles-procurement') &&
    rawNode.Section &&
    !rawNode.Section.some((s: any) => s.__typename === 'ComponentReferencesProcurementPathwaysReference')
  ) {
    rawNode.Section = [...rawNode.Section, pathwaysSection as any];
  }

  const parsed = PageSchema.safeParse(rawNode);
  if (!parsed.success) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ContractService] Contract validation failed:', parsed.error.issues);
    }
    return fail('VALIDATION_ERROR', 500, 'Invalid contract data from API', parsed.error.issues);
  }

  return ok(parsed.data);
}

/**
 * Slugs for SSG generation of contract detail pages.
 */
export async function getAllContractSlugs(): Promise<ApiResult<string[]>> {
  if (isMockMode) return ok([]);

  const result = await gql.query<AllContractSlugsQueryResult>(ALL_CONTRACT_SLUGS_QUERY);
  if (result.error) return result;

  const slugs = (result.data?.contracts ?? [])
    .map((item) => item.slug)
    .filter(Boolean)
    .map(normalizeSlug);

  return ok(slugs);
}
