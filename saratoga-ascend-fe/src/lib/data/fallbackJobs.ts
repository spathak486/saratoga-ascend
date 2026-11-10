import { Job } from '@/lib/types/job';

export const FALLBACK_JOBS: Job[] = [
  {
    title: 'Registered Nurse',
    slug: 'registered-nurse',
    tagline: 'Provide compassionate patient care in a fast-paced setting.',
    salaryRange: '$65K–$82K',
    experience: '2+ yrs',
    overview:
      'Provide compassionate, high-quality care to patients in a fast-paced emergency department. Work closely with physicians and clinical teams to assess patient needs, coordinate treatment, and support positive outcomes.\n\nDeliver expert patient-first bedside care, continuous monitoring, and emergency triage with high clinical efficiency and empathy.',
    responsibilities:
      '<ul><li>Assess and monitor patient conditions.</li><li>Administer medications and treatments.</li><li>Collaborate with physicians and care teams.</li><li>Maintain accurate patient records.</li><li>Respond effectively to emergency situations.</li></ul>',
    requirements:
      '<ul><li>Active Registered Nurse license.</li><li>Bachelor’s degree in Nursing or equivalent.</li><li>2+ years of clinical experience preferred.</li><li>Strong communication and teamwork skills.</li><li>Ability to work in a fast-paced environment.</li></ul>',
    benefits:
      '<ul><li>Medical, dental & vision coverage</li><li>401(k) retirement matching</li><li>Paid time off & continuing education support</li><li>Relocation assistance & sign-on bonus for eligible roles</li></ul>',
    location: {
      name: 'Jacksonville, NC',
      slug: 'san-diego',
      state: 'NC',
    },
    speciality: {
      name: 'Healthcare',
      slug: 'healthcare-jobs',
    },
    jobType: {
      name: 'Full-time',
      slug: 'full-time',
    },
    isFeatured: true,
    postedDate: '2026-11-01',
  },
  {
    title: 'Clinical Laboratory Scientist',
    slug: 'clinical-laboratory-scientist',
    tagline: 'Conduct high-complexity testing and quality diagnostic analysis.',
    salaryRange: '$75K–$95K',
    experience: '3+ yrs',
    overview:
      'Perform complex diagnostic and clinical laboratory examinations on specimen samples to aid medical diagnosis, treatment planning, and patient monitoring. Maintain strict regulatory laboratory compliance and equipment calibrations.',
    responsibilities:
      '<ul><li>Execute diagnostic laboratory assays with high accuracy.</li><li>Calibrate, troubleshoot, and maintain precision lab instruments.</li><li>Analyze and record test findings into hospital clinical systems.</li><li>Adhere to CLIA, CAP, and OSHA safety protocols.</li></ul>',
    requirements:
      '<ul><li>Current Clinical Laboratory Scientist (CLS) license or ASCP certification.</li><li>Bachelor’s degree in Medical Technology, Biology, or related life science.</li><li>3+ years of clinical pathology or diagnostic testing experience.</li><li>Sharp attention to detail and data integrity.</li></ul>',
    benefits:
      '<ul><li>Comprehensive health, dental, and life insurance</li><li>Competitive 401(k) program</li><li>Tuition reimbursement and paid professional development</li><li>Shift differentials available</li></ul>',
    location: {
      name: 'San Diego, CA',
      slug: 'san-diego',
      state: 'CA',
    },
    speciality: {
      name: 'Laboratory & Scientific',
      slug: 'laboratory-scientific',
    },
    jobType: {
      name: 'Full-time',
      slug: 'full-time',
    },
    isFeatured: true,
    postedDate: '2026-11-03',
  },
  {
    title: 'IT Systems & Cloud Engineer',
    slug: 'it-systems-cloud-engineer',
    tagline: 'Architect and secure mission-critical federal healthcare IT infrastructure.',
    salaryRange: '$110K–$135K',
    experience: '4+ yrs',
    overview:
      'Design, maintain, and safeguard enterprise cloud infrastructure and electronic healthcare records systems across federal and military treatment facilities, ensuring maximum uptime and cybersecurity compliance.',
    responsibilities:
      '<ul><li>Maintain hybrid AWS/Azure cloud infrastructure and secure network boundaries.</li><li>Monitor system availability, backup integrity, and disaster recovery.</li><li>Implement zero-trust security postures and federal NIST compliance.</li><li>Collaborate with cross-functional dev and ops teams.</li></ul>',
    requirements:
      '<ul><li>Bachelor’s degree in Computer Science, IT, or equivalent experience.</li><li>4+ years administering enterprise systems and cloud environments.</li><li>AWS/Azure or CompTIA Security+ certifications preferred.</li><li>Eligibility for federal security clearance.</li></ul>',
    benefits:
      '<ul><li>Flexible hybrid work schedule</li><li>Premium healthcare and wellness package</li><li>401(k) matching up to 6%</li><li>Annual education and conference stipends</li></ul>',
    location: {
      name: 'Dallas, TX',
      slug: 'dallas',
      state: 'TX',
    },
    speciality: {
      name: 'IT Jobs',
      slug: 'it-jobs',
    },
    jobType: {
      name: 'Full-time',
      slug: 'full-time',
    },
    isFeatured: false,
    postedDate: '2026-11-05',
  },
  {
    title: 'Physical Therapist',
    slug: 'physical-therapist',
    tagline: 'Empower patient recovery and rehabilitation through customized care plans.',
    salaryRange: '$80K–$98K',
    experience: '2+ yrs',
    overview:
      'Evaluate patient mobility, develop personalized rehabilitation treatment plans, and guide recovery journeys for active military personnel, veterans, and civilian patients.',
    responsibilities:
      '<ul><li>Conduct physical examinations and develop evidence-based therapy plans.</li><li>Instruct patients in restorative exercises and functional movement.</li><li>Track and document patient milestones and progress.</li><li>Coordinate with orthopedic specialists and case managers.</li></ul>',
    requirements:
      '<ul><li>Doctor of Physical Therapy (DPT) from an accredited program.</li><li>State licensure or eligibility for licensure.</li><li>CPR / BLS certification.</li><li>Compassionate patient rapport and physical stamina.</li></ul>',
    benefits:
      '<ul><li>Comprehensive health, dental, vision insurance</li><li>Generous CEU allowance</li><li>Student loan forgiveness assistance</li><li>Paid vacation and sick leave</li></ul>',
    location: {
      name: 'Philadelphia, PA',
      slug: 'philadelphia',
      state: 'PA',
    },
    speciality: {
      name: 'Allied Health',
      slug: 'allied-health',
    },
    jobType: {
      name: 'Contract',
      slug: 'contract',
    },
    isFeatured: false,
    postedDate: '2026-11-06',
  },
  {
    title: 'Emergency Medical Technician (EMT)',
    slug: 'emergency-medical-technician',
    tagline: 'Deliver rapid-response life support and emergency transport care.',
    salaryRange: '$50K–$65K',
    experience: '1+ yrs',
    overview:
      'Provide immediate on-scene basic and advanced life support, triage emergency calls, and safely transport critical patients to medical facilities with continuous stabilization.',
    responsibilities:
      '<ul><li>Respond swiftly to urgent medical dispatch calls.</li><li>Perform on-site airway management, wound dressing, and CPR.</li><li>Operate ambulance vehicles following safety regulations.</li><li>Communicate patient baseline data to receiving ER staff.</li></ul>',
    requirements:
      '<ul><li>Valid NEMT / State EMT certification.</li><li>Valid driver’s license with clean driving history.</li><li>1+ years emergency response or ambulance experience preferred.</li><li>Calm decision-making under high-pressure conditions.</li></ul>',
    benefits:
      '<ul><li>Full healthcare benefits</li><li>Uniform and gear allowance</li><li>Overtime opportunities and shift differentials</li><li>Company 401(k)</li></ul>',
    location: {
      name: 'Phoenix, AZ',
      slug: 'phoenix',
      state: 'AZ',
    },
    speciality: {
      name: 'Healthcare',
      slug: 'healthcare-jobs',
    },
    jobType: {
      name: 'Surge',
      slug: 'surge',
    },
    isFeatured: false,
    postedDate: '2026-11-08',
  },
];

