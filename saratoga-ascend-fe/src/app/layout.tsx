import type { Metadata, Viewport } from 'next';
import { DM_Serif_Text, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const dmSerif = DM_Serif_Text({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
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
    <html lang="en" className={`${dmSerif.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased bg-[#f4f4f4] text-[#022e4c] font-sans selection:bg-[#e11d48] selection:text-white">
        {children}
      </body>
    </html>
  );
}
