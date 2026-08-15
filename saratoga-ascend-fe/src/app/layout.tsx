import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body className="antialiased bg-[#f4f4f4] text-[#022e4c]">
        {children}
      </body>
    </html>
  );
}
