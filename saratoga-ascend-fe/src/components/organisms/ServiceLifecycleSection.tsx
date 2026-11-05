'use client';

import React, { useState } from 'react';

export interface CategoryItem {
  id?: string;
  number?: string | null;
  title: string;
  description: string;
}

export interface SupportAreaItem {
  id?: string;
  text: string;
}

export interface LifecycleTab {
  id?: string;
  tabId?: string | null;
  label: string;
  heading: string;
  subheading: string;
  image?: {
    url?: string | null;
    alternativeText?: string | null;
  } | string | null;
  supportAreas?: (SupportAreaItem | string)[] | null;
  categories?: CategoryItem[] | null;
  cta?: {
    label?: string | null;
    href?: string | null;
    target?: string | null;
    isExternal?: boolean | null;
  } | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

export interface ServiceLifecycleSectionProps {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  tabs?: LifecycleTab[] | null;
}

// 8 Interactive Tabs matching Figma Frame 2147226325
const DEFAULT_TABS: LifecycleTab[] = [
  {
    id: 'physician-staffing',
    label: 'Physician Staffing',
    heading: 'Physician Staffing',
    subheading:
      'Saratoga Ascend supports healthcare and public-sector organizations with qualified physicians for planned staffing needs, specialized programs, temporary coverage, and mission-critical healthcare delivery.',
    image: '/images/modern-healthcare-team-banner.png',
    supportAreas: [
      'Credentialing and readiness coordination',
      'Physician workforce planning',
      'Permanent and temporary staffing support',
      'Schedule and coverage support',
      'Specialty and mission-specific placement',
      'Clinical leadership support',
    ],
    categories: [
      {
        number: '01',
        title: 'Primary Care Physicians',
        description: 'Role-specific workforce support aligned with program and mission requirements.',
      },
      {
        number: '02',
        title: 'Emergency Medicine Physicians',
        description: 'Role-specific workforce support aligned with program and mission requirements.',
      },
      {
        number: '03',
        title: 'Hospitalists and Inpatient Physicians',
        description: 'Role-specific workforce support aligned with program and mission requirements.',
      },
      {
        number: '04',
        title: 'Specialty Physicians',
        description: 'Role-specific workforce support aligned with program and mission requirements.',
      },
      {
        number: '05',
        title: 'Occupational and Preventive Medicine Physicians',
        description: 'Role-specific workforce support aligned with program and mission requirements.',
      },
      {
        number: '06',
        title: 'Medical Directors and Clinical Leadership',
        description: 'Role-specific workforce support aligned with program and mission requirements.',
      },
    ],
    ctaLabel: 'Discuss this workforce requirement',
    ctaHref: '/contact',
  },
  {
    id: 'nursing-workforce',
    label: 'Nursing Workforce',
    heading: 'Nursing Workforce',
    subheading:
      'Registered nurses, advanced nurse practitioners, and specialized nursing personnel delivering compassionate, protocol-driven inpatient and outpatient patient care.',
    image: '/images/confident-healthcare-team.png',
    supportAreas: [
      'Acute care & ICU nursing staffing',
      'Shift-coverage & surge response',
      'Ambulatory & outpatient nursing',
      'Clinical competency verification',
      'Specialized care unit deployments',
      'Continuity of care management',
    ],
    categories: [
      {
        number: '01',
        title: 'Critical Care & Emergency Nurses',
        description: 'ICU, CCU, and emergency room registered nurses with specialized life-support certifications.',
      },
      {
        number: '02',
        title: 'Medical-Surgical Registered Nurses',
        description: 'Versatile inpatient floor nurses experienced in acute-care monitoring and post-operative recovery.',
      },
      {
        number: '03',
        title: 'Ambulatory & Outpatient Nurses',
        description: 'Clinic-based nursing professionals focused on preventive health and outpatient triage.',
      },
      {
        number: '04',
        title: 'Nurse Supervisors & Charge Nurses',
        description: 'Frontline leadership ensuring staffing coverage, regulatory adherence, and clinical workflow.',
      },
      {
        number: '05',
        title: 'Operating Room & Perioperative Nurses',
        description: 'Pre-op, intraoperative circulating, and post-anesthesia care unit (PACU) registered nurses.',
      },
      {
        number: '06',
        title: 'Public & Community Health Nurses',
        description: 'Community-centered practitioners supporting vaccination campaigns and wellness tracking.',
      },
    ],
    ctaLabel: 'Discuss this workforce requirement',
    ctaHref: '/contact',
  },
  {
    id: 'advanced-practice',
    label: 'Advanced Practice Providers',
    heading: 'Advanced Practice Providers',
    subheading:
      'Nurse Practitioners (NPs) and Physician Assistants (PAs) providing high-quality diagnostic, treatment, and clinical decision support across primary and specialty services.',
    image: '/images/supporting-missions-doctor.png',
    supportAreas: [
      'Autonomous diagnostic support',
      'Collaborative physician coverage',
      'Prescriptive authority management',
      'Rural & remote clinic coverage',
      'Specialty outpatient clinics',
      'Rapid deployment staffing',
    ],
    categories: [
      {
        number: '01',
        title: 'Family Nurse Practitioners',
        description: 'Comprehensive lifecycle care for individuals and families in clinical and outpatient facilities.',
      },
      {
        number: '02',
        title: 'Physician Assistants - Emergency',
        description: 'Fast-paced triage, diagnostic workups, and procedural care in urgent care and emergency departments.',
      },
      {
        number: '03',
        title: 'Psychiatric Mental Health NPs',
        description: 'Credentialed psychiatric assessment, psychotropic medication management, and therapy support.',
      },
      {
        number: '04',
        title: 'Adult-Gerontology Providers',
        description: 'Specialized management of complex, chronic multi-system medical conditions for adult populations.',
      },
      {
        number: '05',
        title: 'Surgical Physician Assistants',
        description: 'First-assist operative support, surgical rounding, and post-operative monitoring.',
      },
      {
        number: '06',
        title: 'Acute Care Nurse Practitioners',
        description: 'Advanced inpatient management in intensive care units, step-down units, and specialty clinics.',
      },
    ],
    ctaLabel: 'Discuss this workforce requirement',
    ctaHref: '/contact',
  },
  {
    id: 'allied-health',
    label: 'Allied Health Professionals',
    heading: 'Allied Health Professionals',
    subheading:
      'Essential therapists, technologists, and diagnostic experts supporting full-spectrum clinical teams to maximize patient health outcomes and operational velocity.',
    image: '/images/phase4/market-federal-military.png',
    supportAreas: [
      'Diagnostic imaging services',
      'Physical & occupational therapy',
      'Respiratory therapy coordination',
      'Laboratory technician coverage',
      'Speech-language pathology',
      'Certified medical technicians',
    ],
    categories: [
      {
        number: '01',
        title: 'Physical & Occupational Therapists',
        description: 'Rehabilitative care restoring functional independence and musculoskeletal recovery.',
      },
      {
        number: '02',
        title: 'Radiologic & MRI Technologists',
        description: 'High-precision diagnostic medical imaging, CT scans, fluoroscopy, and radiation safety protocols.',
      },
      {
        number: '03',
        title: 'Respiratory Therapists',
        description: 'Ventilator management, pulmonary function testing, and emergency cardiopulmonary support.',
      },
      {
        number: '04',
        title: 'Pharmacy Technicians',
        description: 'Accurate medication dispensation, sterile compounding, and supply chain inventory oversight.',
      },
      {
        number: '05',
        title: 'Surgical Technologists',
        description: 'Sterile field preparation, surgical instrumentation handling, and operating room coordination.',
      },
      {
        number: '06',
        title: 'Speech-Language Pathologists',
        description: 'Evaluation and therapeutic intervention for speech, language, cognitive-communication, and swallowing.',
      },
    ],
    ctaLabel: 'Discuss this workforce requirement',
    ctaHref: '/contact',
  },
  {
    id: 'behavioral-health',
    label: 'Behavioral Health Professionals',
    heading: 'Behavioral Health Professionals',
    subheading:
      'Licensed psychologists, clinical social workers, counselors, and psychiatric specialists dedicated to mental health resilience and community wellness programs.',
    image: '/images/supporting-missions-doctor.png',
    supportAreas: [
      'Clinical psychological assessments',
      'Trauma-informed care delivery',
      'Substance abuse counseling',
      'Crisis intervention protocols',
      'Veteran & military mental health',
      'Tele-behavioral health solutions',
    ],
    categories: [
      {
        number: '01',
        title: 'Licensed Clinical Social Workers',
        description: 'Patient advocacy, psychosocial assessment, case management, and evidence-based psychotherapy.',
      },
      {
        number: '02',
        title: 'Clinical Psychologists',
        description: 'Comprehensive diagnostic neuropsychological evaluations and cognitive behavioral therapy interventions.',
      },
      {
        number: '03',
        title: 'Substance Use Counselors',
        description: 'Addiction recovery, dependency rehabilitation, support group facilitation, and relapse prevention.',
      },
      {
        number: '04',
        title: 'Marriage & Family Therapists',
        description: 'Holistic behavioral health interventions supporting interpersonal family stability and resilience.',
      },
      {
        number: '05',
        title: 'Crisis Intervention Specialists',
        description: 'Rapid response mental health stabilization, emergency evaluation, and suicide prevention initiatives.',
      },
      {
        number: '06',
        title: 'Psychiatric Case Managers',
        description: 'Interdisciplinary care continuity coordinating medical, psychiatric, and community support resources.',
      },
    ],
    ctaLabel: 'Discuss this workforce requirement',
    ctaHref: '/contact',
  },
  {
    id: 'laboratory-scientific',
    label: 'Laboratory & Scientific Workforce',
    heading: 'Laboratory & Scientific Workforce',
    subheading:
      'Medical laboratory scientists, microbiologists, and clinical research personnel operating modern diagnostics and scientific investigation facilities with accuracy and rigor.',
    image: '/images/pharmacist-portrait.png',
    supportAreas: [
      'High-throughput clinical pathology',
      'Microbiological analysis',
      'Quality assurance & CLIA compliance',
      'Molecular biology & genetic testing',
      'Bio-surveillance programs',
      'Laboratory equipment maintenance',
    ],
    categories: [
      {
        number: '01',
        title: 'Medical Laboratory Scientists (MLS)',
        description: 'Complex clinical testing in hematology, clinical chemistry, immunohematology, and urinalysis.',
      },
      {
        number: '02',
        title: 'Clinical Microbiologists',
        description: 'Pathogen identification, antimicrobial susceptibility evaluations, and infectious disease tracking.',
      },
      {
        number: '03',
        title: 'Histotechnicians & Cytotechnologists',
        description: 'Tissue specimen preparation, cellular morphology analysis, and histology lab operations.',
      },
      {
        number: '04',
        title: 'Phlebotomists & Specimen Handlers',
        description: 'Safe blood specimen collection, patient identification compliance, and sample preservation.',
      },
      {
        number: '05',
        title: 'Clinical Research Coordinators',
        description: 'Clinical trial execution, patient consent management, regulatory documentation, and data capture.',
      },
      {
        number: '06',
        title: 'Laboratory Quality Specialists',
        description: 'Rigorous compliance auditing for CAP, CLIA, and federal biosafety standards.',
      },
    ],
    ctaLabel: 'Discuss this workforce requirement',
    ctaHref: '/contact',
  },
  {
    id: 'engagement-models',
    label: 'Workforce Engagement Models',
    heading: 'Workforce Engagement Models',
    subheading:
      'Scalable contract structures designed to give healthcare facilities flexibility, from immediate per-diem locum tenens to long-term direct placement and managed service contracts.',
    image: '/images/happy-mature-businessman-using-digital-tablet-while-talking-healthcare-workers-hallway-clinic 1.png',
    supportAreas: [
      'Locum tenens placement',
      'Managed service provider (MSP)',
      'Contract-to-hire arrangements',
      'Permanent executive placement',
      'Rapid strike team mobilization',
      'Direct government contracting',
    ],
    categories: [
      {
        number: '01',
        title: 'Locum Tenens & Interim Coverage',
        description: 'Flexible short-term and medium-term coverage for planned leave, vacations, and peak caseloads.',
      },
      {
        number: '02',
        title: 'Direct Hire & Executive Search',
        description: 'Targeted recruitment and placement of permanent clinicians and clinical leadership executives.',
      },
      {
        number: '03',
        title: 'Contingency Surge Staffing',
        description: 'Pre-vetted clinical teams mobilized within hours for emergency and disaster response operations.',
      },
      {
        number: '04',
        title: 'Managed Services & Program Outsourcing',
        description: 'End-to-end management of full department staffing, scheduling, credentialing, and compliance.',
      },
      {
        number: '05',
        title: 'Hybrid & Remote Telehealth Staffing',
        description: 'Virtual provider panels for remote patient triage, digital consults, and after-hours coverage.',
      },
      {
        number: '06',
        title: 'Government Subcontracting Partnerships',
        description: 'Teaming agreements and transparent prime/subcontractor execution for federal healthcare RFPs.',
      },
    ],
    ctaLabel: 'Discuss this workforce requirement',
    ctaHref: '/contact',
  },
  {
    id: 'delivery-services',
    label: 'Workforce Delivery Services',
    heading: 'Workforce Delivery Services',
    subheading:
      'Comprehensive administrative and operational infrastructure supporting credentialing, logistics, compliance, and ongoing clinical readiness.',
    image: '/images/Federal & Military.png',
    supportAreas: [
      'Expedited primary source verification',
      'National criminal & drug screening',
      'Continuous licensure monitoring',
      'Travel & logistics coordination',
      'Clinical performance auditing',
      '24/7 client dispatch support',
    ],
    categories: [
      {
        number: '01',
        title: 'Primary Source Credentialing',
        description: 'Thorough verification of medical degrees, training, licenses, DEA registrations, and peer references.',
      },
      {
        number: '02',
        title: 'Security Clearance & Background Vetting',
        description: 'Public Trust and DoD security clearance processing for government medical facility compliance.',
      },
      {
        number: '03',
        title: 'Clinical Onboarding & Orientation',
        description: 'Structured site-specific orientation, EHR system training, and safety protocol reviews.',
      },
      {
        number: '04',
        title: 'Travel & Housing Coordination',
        description: 'Full concierge travel arrangements, housing, and per-diem management for traveling clinicians.',
      },
      {
        number: '05',
        title: 'Quality Assurance & Performance Reviews',
        description: 'Routine clinical performance monitoring and feedback loops with facility leadership.',
      },
      {
        number: '06',
        title: 'Compliance & Regulatory Audit Support',
        description: 'Continuous audit readiness for Joint Commission, CMS, and federal inspection guidelines.',
      },
    ],
    ctaLabel: 'Discuss this workforce requirement',
    ctaHref: '/contact',
  },
];

export function ServiceLifecycleSection({
  title = 'Healthcare Workforce Solutions',
  subtitle = 'Across the Service Lifecycle',
  description = 'From physicians and nurses to allied health, behavioral health, laboratory, and scientific professionals, Saratoga Ascend supports workforce needs through flexible engagement and delivery models.',
  tabs,
}: ServiceLifecycleSectionProps) {
  const activeTabs: LifecycleTab[] = tabs && tabs.length > 0 ? tabs : DEFAULT_TABS;
  const [selectedTabId, setSelectedTabId] = useState<string>(
    activeTabs[0]?.tabId || activeTabs[0]?.id || 'physician-staffing'
  );

  const currentTab =
    activeTabs.find((t) => (t.tabId || t.id) === selectedTabId) || activeTabs[0];

  const currentImageUrl: string =
    typeof currentTab.image === 'string'
      ? currentTab.image
      : (currentTab.image?.url ?? (typeof DEFAULT_TABS[0].image === 'string' ? DEFAULT_TABS[0].image : ''));

  const currentSupportAreas: string[] = (currentTab.supportAreas || []).map((item) =>
    typeof item === 'string' ? item : item.text
  );

  const currentCategories: CategoryItem[] = currentTab.categories || [];

  return (
    <section
      aria-label="Healthcare Workforce Solutions Across the Service Lifecycle"
      className="relative w-full max-w-[1920px] mx-auto min-h-[1623px] bg-[#FAFAFA] py-16 xl:py-[80px] px-4 sm:px-8 xl:px-[120px] overflow-hidden flex flex-col items-center"
    >
      {/* Header Block: Group 2608667 (1141px x 290px) */}
      <div className="flex flex-col items-center text-center max-w-[1141px] mx-auto mb-10 xl:mb-[40px]">
        {/* Main Title: DM Serif Text, 72px, line-height 99px, color #F01424 */}
        <h2
          className="font-serif text-[clamp(2.5rem,1.8rem+3vw,4.5rem)] leading-[1.15] xl:leading-[99px] font-normal tracking-tight text-[#F01424]"
          style={{ fontFamily: "'DM Serif Text', serif" }}
        >
          {title}
        </h2>

        {/* Subtitle: Across the Service Lifecycle (DM Serif Text, 72px, color #000000) */}
        {subtitle && (
          <h3
            className="font-serif text-[clamp(2.2rem,1.6rem+2.6vw,4.5rem)] leading-[1.15] xl:leading-[99px] font-normal tracking-tight text-[#000000] -mt-2 xl:-mt-4"
            style={{ fontFamily: "'DM Serif Text', serif" }}
          >
            {subtitle}
          </h3>
        )}

        {/* Description: Google Sans Flex, 24px, line-height 40px (167%), color #000000 */}
        {description && (
          <p
            className="font-sans text-[clamp(1.1rem,1rem+0.45vw,1.5rem)] leading-[1.55] xl:leading-[40px] font-normal text-[#000000] max-w-[1141px] mt-4 xl:mt-6"
            style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Group 2085665577: Main Interactive Tabs Container (1680px width) */}
      <div className="w-full max-w-[1680px] mx-auto flex flex-col items-center">
        
        {/* 2-Tier Pill Tabs Filter: Group 2085665571 */}
        <div className="w-full flex flex-col items-center gap-3 sm:gap-4 mb-8 xl:mb-[40px]">
          
          {/* Top Row: First 5 tabs (Frame 2147226345 - 2147226349) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 xl:gap-[16px] w-full">
            {activeTabs.slice(0, 5).map((tab, idx) => {
              const tabKey = tab.tabId || tab.id || `tab-row1-${idx}`;
              const isSelected = (tab.tabId || tab.id) === selectedTabId;
              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => setSelectedTabId(tab.tabId || tab.id || '')}
                  className={`box-border flex items-center justify-center px-5 sm:px-6 py-3 xl:py-[18px] rounded-[18px] text-[16px] sm:text-[18px] xl:text-[22px] font-semibold leading-[28px] transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#F4F9FD] border border-[#95C3EC] shadow-[0px_0px_8px_rgba(0,0,0,0.19)] text-[#2F2F2F]'
                      : 'bg-white border border-[#DAE5ED] hover:border-[#95C3EC] hover:bg-[#F9FBFE] text-[#2F2F2F]'
                  }`}
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Bottom Row: Remaining 3 tabs (Frame 2147226350 - 2147226352) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 xl:gap-[16px] w-full">
            {activeTabs.slice(5).map((tab, idx) => {
              const tabKey = tab.tabId || tab.id || `tab-row2-${idx}`;
              const isSelected = (tab.tabId || tab.id) === selectedTabId;
              return (
                <button
                  key={tabKey}
                  type="button"
                  onClick={() => setSelectedTabId(tab.tabId || tab.id || '')}
                  className={`box-border flex items-center justify-center px-5 sm:px-6 py-3 xl:py-[18px] rounded-[18px] text-[16px] sm:text-[18px] xl:text-[22px] font-semibold leading-[28px] transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#F4F9FD] border border-[#95C3EC] shadow-[0px_0px_8px_rgba(0,0,0,0.19)] text-[#2F2F2F]'
                      : 'bg-white border border-[#DAE5ED] hover:border-[#95C3EC] hover:bg-[#F9FBFE] text-[#2F2F2F]'
                  }`}
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Selected Tab Content Card: Rectangle 40079 (bg #FFFFFF, border 1px #DAE5ED, radius 28px) */}
        <div className="w-full bg-white border border-[#DAE5ED] rounded-[28px] p-6 sm:p-10 xl:p-[50px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          
          {/* Top/Middle Section: Left Info + Right Image Card */}
          <div className="w-full flex flex-col lg:flex-row items-stretch justify-between gap-8 xl:gap-[50px]">
            
            {/* Left Content Area (Frame 2147226353 & Category Cards) */}
            <div className="w-full lg:w-[58%] flex flex-col justify-between">
              
              {/* Header Title & Subheading */}
              <div className="mb-6 xl:mb-8">
                {/* Heading: DM Serif Text, 40px, color #022542 */}
                <h3
                  className="font-serif text-[32px] sm:text-[36px] xl:text-[40px] leading-[34px] font-normal text-[#022542] mb-4"
                  style={{ fontFamily: "'DM Serif Text', serif" }}
                >
                  {currentTab.heading}
                </h3>

                {/* Subheading: Google Sans Flex, 24px, line-height 34px */}
                <p
                  className="font-sans text-[16px] sm:text-[20px] xl:text-[24px] leading-[26px] sm:leading-[30px] xl:leading-[34px] font-normal text-[#000000]"
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  {currentTab.subheading}
                </p>
              </div>

              {/* Workforce Categories Section Header: Group 2085665550 */}
              <div className="flex items-center gap-2 mb-4 xl:mb-6">
                <span className="w-1.5 h-6 bg-[#006CAF] rounded-[6px]" />
                <h4
                  className="font-sans text-[18px] sm:text-[20px] xl:text-[22px] font-semibold leading-[28px] text-[#000000]"
                  style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                >
                  Workforce categories
                </h4>
              </div>

              {/* 2-Column Grid of Role Cards (Group 2085665556: 6 cards total) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 xl:gap-[16px] w-full">
                {currentCategories.map((cat, idx) => (
                  <div
                    key={cat.id || `cat-${idx}`}
                    className="box-border bg-[#F2F7FA] border border-[#D7E2EB] rounded-[16px] p-4 sm:p-5 flex flex-col gap-1.5 min-h-[120px] xl:min-h-[140px] transition-all duration-200 hover:border-[#95C3EC]"
                  >
                    {/* Number + Title in #2B88D9 */}
                    <div className="flex items-start gap-2">
                      <span
                        className="font-sans font-semibold text-[18px] sm:text-[20px] xl:text-[22px] leading-[28px] text-[#2B88D9] shrink-0"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        {cat.number || `0${idx + 1}`}
                      </span>
                      <h5
                        className="font-sans font-semibold text-[18px] sm:text-[20px] xl:text-[22px] leading-[28px] text-[#2B88D9]"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        {cat.title}
                      </h5>
                    </div>

                    {/* Description: Google Sans Flex, 20px / 16px, color #000000 */}
                    <p
                      className="font-sans font-normal text-[14px] sm:text-[16px] xl:text-[18px] leading-[22px] sm:leading-[25px] text-[#000000] pl-7"
                      style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                    >
                      {cat.description}
                    </p>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Photo & Glass Support Areas Card: Rectangle 40080 */}
            <div className="w-full lg:w-[42%] relative min-h-[460px] sm:min-h-[520px] xl:min-h-[640px] rounded-[20px] border border-[#006CAF] overflow-hidden flex flex-col justify-end p-4 sm:p-6 xl:p-[20px]">
              {/* Background Photo */}
              <img
                src={currentImageUrl}
                alt={currentTab.heading}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* Glassmorphic Overlay: Rectangle 40081 (bg rgba(255,255,255,0.8), border 1px #006CAF, backdrop-blur 7px, radius 20px) */}
              <div className="relative z-10 w-full bg-white/80 backdrop-blur-[7px] border border-[#006CAF] rounded-[20px] p-5 sm:p-6 xl:p-[24px]">
                {/* Support areas Header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-6 bg-[#006CAF] rounded-[6px]" />
                  <h4
                    className="font-sans text-[18px] sm:text-[20px] xl:text-[22px] font-semibold leading-[28px] text-[#000000]"
                    style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                  >
                    Support areas
                  </h4>
                </div>

                {/* 2-Column List with Circular Blue Checkmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                  {currentSupportAreas.map((area, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      {/* Checkmark Icon Circle: 24px, bg #006CAF */}
                      <span className="w-5 h-5 xl:w-[22px] xl:h-[22px] rounded-full bg-[#006CAF] flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M3.5 8.5L6.5 11.5L12.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span
                        className="font-sans text-[13px] sm:text-[14px] leading-[18px] font-normal text-[#000000]"
                        style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
                      >
                        {area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Divider & CTA Button: Vector 6663 & Button Base */}
          <div className="w-full mt-8 xl:mt-10 pt-6 xl:pt-8 border-t border-[#DAE5ED]">
            <a
              href={currentTab.cta?.href || currentTab.ctaHref || '/contact'}
              target={currentTab.cta?.target || (currentTab.cta?.isExternal ? '_blank' : '_self')}
              rel={currentTab.cta?.isExternal || currentTab.cta?.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-[8px] border border-[#0C2A4F] text-[#0C2A4F] text-[18px] sm:text-[20px] font-medium leading-[30px] transition-all duration-300 hover:bg-[#0C2A4F] hover:text-white group cursor-pointer active:scale-95"
              style={{ fontFamily: "'Google Sans Flex', sans-serif" }}
            >
              <span>{currentTab.cta?.label || currentTab.ctaLabel || 'Discuss this workforce requirement'}</span>
              {/* Arrow Up-Right Icon */}
              <svg
                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ServiceLifecycleSection;

