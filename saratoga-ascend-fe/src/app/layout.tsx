import type { Metadata } from 'next';
import { DM_Serif_Text } from 'next/font/google';
import './globals.css';

const dmSerifText = DM_Serif_Text({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
});

export const metadata: Metadata = {
  title: 'Saratoga Ascend | Brand Identity & Healthcare Solutions',
  description: 'Advancing Healthcare. Accelerating Science. Empowering Possibility.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerifText.variable}`}>
      <body className="antialiased bg-[#f4f4f4] text-[#022e4c]">
        {children}
      </body>
    </html>
  );
}

