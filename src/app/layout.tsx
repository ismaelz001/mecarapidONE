import { Rajdhani } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

const rajdhani = Rajdhani({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
});

export const metadata: Metadata = {
  title: 'MecaRapidOne | Workshop Management',
  description: 'Industrial workshop management system - Work orders, vehicles, and fleet control',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${rajdhani.className} bg-mr-bg text-mr-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
