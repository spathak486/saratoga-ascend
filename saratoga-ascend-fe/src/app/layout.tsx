import type { Metadata, Viewport } from 'next';
import { DM_Serif_Text, Google_Sans_Flex } from 'next/font/google';
import './globals.css';
import { Navbar, Footer } from '@/components/organisms';

/** Display face from the Figma homepage — headings only, single 400 weight. */
const dmSerifText = DM_Serif_Text({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-dm-serif-text',
  display: 'swap',
});

/**
 * Body and UI face. A variable font — the Figma file pins GRAD 0, ROND 0 and
 * wdth 100, which are the defaults, so only the weight axis is exercised.
 *
 * Google Sans Flex is not yet in Next's capsize metrics table, so automatic
 * fallback sizing is disabled to avoid the build warning. System-ui fallbacks
 * in `globals.css` still apply while the webfont loads.
 */
const googleSansFlex = Google_Sans_Flex({
  subsets: ['latin'],
  variable: '--font-google-sans-flex',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const viewport: Viewport = {
  themeColor: '#022e4c',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Saratoga Ascend | Healthcare & Mission Solutions for Government',
    template: '%s | Saratoga Ascend',
  },
  description:
    'Advancing Healthcare. Accelerating Science. Empowering Possibility. Mission-critical healthcare consulting, workforce solutions, and technology for government and military.',
  keywords: [
    'government healthcare solutions',
    'federal healthcare contractor',
    'healthcare staffing',
    'clinical contact centers',
    'laboratory staffing',
    'health IT solutions',
    'defense healthcare',
    'veterans affairs healthcare',
  ],
  authors: [{ name: 'Saratoga Ascend' }],
  metadataBase: new URL('https://www.saratogamed.com'),
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Saratoga Ascend | Healthcare & Mission Solutions for Government',
    description: 'Advancing Healthcare. Accelerating Science. Empowering Possibility.',
    url: 'https://www.saratogamed.com',
    siteName: 'Saratoga Ascend',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifText.variable} ${googleSansFlex.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased bg-brand-surface text-brand-navy font-sans selection:bg-brand-red selection:text-brand-surface min-h-screen"
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
