import React from 'react';
import {
  Container,
  Heading,
  Text,
  Badge,
  Button,
  Card,
  GeneralLink,
  GlobalImage,
  BrandIcon,
  Input,
  Accordion,
} from '../atoms';

export const CoreComponentsSection: React.FC = () => {
  const faqItems = [
    {
      id: 'faq-1',
      title: 'What federal healthcare and staffing capabilities does Saratoga Ascend provide?',
      badge: 'Federal',
      content: (
        <p>
          Saratoga Ascend provides full-spectrum clinical and non-clinical workforce augmentation,
          physicians, nurses, advanced practice providers, health IT professionals, medical
          readiness support, and clinical contact centers for DoD, VA, and civilian agencies.
        </p>
      ),
    },
    {
      id: 'faq-2',
      title: 'How does Saratoga Ascend support GSA Multiple Award Schedule (MAS) procurement?',
      badge: 'Procurement',
      content: (
        <p>
          Federal agencies can procure mission-ready healthcare and allied health staffing directly
          through our GSA MAS contract vehicles with pre-negotiated ceiling rates, compliant SINs,
          and accelerated acquisition timelines.
        </p>
      ),
    },
    {
      id: 'faq-3',
      title: 'What credentialing and compliance standards are enforced?',
      badge: 'Quality',
      content: (
        <p>
          We operate a comprehensive primary source verification process adhering to The Joint
          Commission guidelines, federal background investigations, security clearance
          adjudication, and continuous compliance monitoring.
        </p>
      ),
    },
  ];

  return (
    <section id="core-components" className="py-24 bg-[#f8fafc] border-b border-slate-200">
      <Container className="space-y-20">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <Badge variant="blue">DESIGN SYSTEM</Badge>
          <Heading level={2} fontStyle="serif" className="text-[#022e4c]">
            Core Components &amp; Brand Primitives
          </Heading>
          <Text variant="muted" className="text-base sm:text-lg">
            High-performance, accessible, and strictly typed UI primitives built with Next.js 16,
            React 19, and Tailwind CSS v4.
          </Text>
        </div>

        {/* 1. Global Image & Link Showcase */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-3">
            <Badge variant="red" className="mb-2">
              ATOM 01 &amp; 02
            </Badge>
            <Heading level={3} fontStyle="sans" className="text-[#022e4c]">
              Global Image &amp; General Link Components
            </Heading>
            <Text variant="subtle">
              Production-ready Next.js Image handling with responsive aspect ratios, gradient
              overlays, fallback protection, and polymorphic smart links.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Aspect Ratio Video with Dark Overlay */}
            <Card variant="interactive" padding="none" rounded="3xl">
              <GlobalImage
                src="/images/hero-banner.png"
                alt="Federal Healthcare Mission"
                aspectRatio="video"
                overlay="dark"
                hoverEffect
              />
              <div className="p-6 space-y-3">
                <Badge variant="navy" size="sm">
                  Aspect Video · Dark Overlay
                </Badge>
                <Heading level={4} fontStyle="sans" className="text-lg">
                  Clinical &amp; Healthcare Operations
                </Heading>
                <Text variant="subtle">
                  Accelerating mission readiness and high-acuity care nationwide.
                </Text>
                <div className="pt-2">
                  <GeneralLink href="/solutions/healthcare-it-staffing" variant="arrow">
                    Explore Staffing Solutions
                  </GeneralLink>
                </div>
              </div>
            </Card>

            {/* Card 2: Aspect Portrait with Brand Overlay */}
            <Card variant="interactive" padding="none" rounded="3xl">
              <GlobalImage
                src="/images/healthcare-team.png"
                alt="Health IT Solutions"
                aspectRatio="video"
                overlay="brand"
                hoverEffect
              />
              <div className="p-6 space-y-3">
                <Badge variant="blue" size="sm">
                  Aspect Video · Brand Overlay
                </Badge>
                <Heading level={4} fontStyle="sans" className="text-lg">
                  Health IT &amp; Digital Solutions
                </Heading>
                <Text variant="subtle">
                  Modernizing EHR, clinical data pipelines, and cyber resilience.
                </Text>
                <div className="pt-2">
                  <GeneralLink href="/solutions/it-digital" variant="arrow">
                    Explore Digital IT
                  </GeneralLink>
                </div>
              </div>
            </Card>

            {/* Card 3: Aspect Ratio with Blue Glow Overlay */}
            <Card variant="interactive" padding="none" rounded="3xl">
              <GlobalImage
                src="/images/pharmacist-portrait.png"
                alt="Clinical Laboratory & Scientific"
                aspectRatio="video"
                overlay="blue"
                hoverEffect
              />
              <div className="p-6 space-y-3">
                <Badge variant="emerald" size="sm">
                  Aspect Video · Blue Overlay
                </Badge>
                <Heading level={4} fontStyle="sans" className="text-lg">
                  Clinical Lab &amp; Scientific
                </Heading>
                <Text variant="subtle">
                  Specialized public health and laboratory scientist augmentation.
                </Text>
                <div className="pt-2">
                  <GeneralLink href="/solutions/clinical-laboratory-scientific" variant="arrow">
                    Explore Laboratory
                  </GeneralLink>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 2. Button & GeneralLink Variants */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-3">
            <Badge variant="red" className="mb-2">
              ATOM 03
            </Badge>
            <Heading level={3} fontStyle="sans" className="text-[#022e4c]">
              Button &amp; Link Action Variants
            </Heading>
            <Text variant="subtle">
              Theme-tailored buttons and link buttons supporting icons, loading states, and sizes.
            </Text>
          </div>

          <Card variant="elevated" padding="lg" className="space-y-6">
            <div className="space-y-3">
              <Text variant="overline">Button Style Presets</Text>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primaryRed" rightIcon={<BrandIcon name="arrowRight" size="xs" />}>
                  Primary Red
                </Button>
                <Button variant="navy" leftIcon={<BrandIcon name="shield" size="xs" />}>
                  Navy Blue
                </Button>
                <Button variant="blue" leftIcon={<BrandIcon name="cpu" size="xs" />}>
                  Bright Blue
                </Button>
                <Button variant="peachGradient">Peach Gradient</Button>
                <Button variant="cyanGradient">Cyan Gradient</Button>
                <Button variant="outlineRed">Outline Red</Button>
                <Button variant="outlineNavy">Outline Navy</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="primaryRed" isLoading>
                  Loading State
                </Button>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <Text variant="overline">Smart GeneralLink Polymorphism</Text>
              <div className="flex flex-wrap items-center gap-6">
                <GeneralLink href="#overview" variant="default">
                  Default Inline Link
                </GeneralLink>
                <GeneralLink href="#primary-colors" variant="arrow">
                  Arrow Animated Link
                </GeneralLink>
                <GeneralLink href="#core-components" variant="subtle">
                  Subtle Underline Link
                </GeneralLink>
                <GeneralLink
                  href="https://www.figma.com/design/38S6hot17hjBCnXF7CLVCj/Saratoga-Ascend"
                  variant="default"
                  rightIcon={<BrandIcon name="external" size="xs" />}
                >
                  External Figma Blueprint
                </GeneralLink>
                <GeneralLink
                  href="/solutions"
                  variant="button"
                  buttonVariant="primaryRed"
                  size="sm"
                  rightIcon={<BrandIcon name="arrowRight" size="xs" />}
                >
                  Link as Button
                </GeneralLink>
              </div>
            </div>
          </Card>
        </div>

        {/* 3. Badge & Status Indicators */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-3">
            <Badge variant="red" className="mb-2">
              ATOM 04
            </Badge>
            <Heading level={3} fontStyle="sans" className="text-[#022e4c]">
              Badge &amp; Pill Indicators
            </Heading>
            <Text variant="subtle">
              Status tags with optional pulsing live dot indicators.
            </Text>
          </div>

          <Card variant="elevated" padding="lg">
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="red" dot>
                Live Requirement
              </Badge>
              <Badge variant="navy">Federal Contract</Badge>
              <Badge variant="blue" dot>
                Surge Available
              </Badge>
              <Badge variant="emerald" dot>
                Joint Commission
              </Badge>
              <Badge variant="amber">Top Secret / SCI</Badge>
              <Badge variant="grayOutline">GSA MAS 621-I</Badge>
              <Badge variant="gradient">Ascend 2026</Badge>
            </div>
          </Card>
        </div>

        {/* 4. Form Controls & Interactive Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Input Component */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <Badge variant="red" className="mb-2">
                ATOM 05
              </Badge>
              <Heading level={3} fontStyle="sans" className="text-[#022e4c]">
                Form Controls &amp; Inputs
              </Heading>
              <Text variant="subtle">
                Accessible input fields with brand focus states, icons, and error handling.
              </Text>
            </div>

            <Card variant="elevated" padding="lg" className="space-y-4">
              <Input
                label="Search Solutions or Job Openings"
                placeholder="e.g. Clinical Laboratory Scientist, Nurse Triage..."
                leftIcon={<BrandIcon name="search" size="sm" />}
              />

              <Input
                label="Federal Agency or Work Email"
                placeholder="name@va.gov"
                leftIcon={<BrandIcon name="mail" size="sm" />}
                helperText="We respond to government inquiries within 2 business hours."
              />

              <Input
                label="Contract Number (Validated)"
                defaultValue="47QSWA20D000X"
                rightIcon={<BrandIcon name="check" size="sm" color="red" />}
                helperText="Verified against GSA Multiple Award Schedule database."
              />
            </Card>
          </div>

          {/* Right: Accordion Component */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <Badge variant="red" className="mb-2">
                ATOM 06
              </Badge>
              <Heading level={3} fontStyle="sans" className="text-[#022e4c]">
                Interactive Accordion (WAI-ARIA)
              </Heading>
              <Text variant="subtle">
                Smooth CSS grid animated collapsible panels for FAQs, capabilities, and solutions.
              </Text>
            </div>

            <Accordion items={faqItems} defaultOpenId="faq-1" />
          </div>
        </div>
      </Container>
    </section>
  );
};
