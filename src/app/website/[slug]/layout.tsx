import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
});

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${jakarta.variable} ${spaceGrotesk.variable} font-jakarta bg-site-bg text-site-text antialiased`}>
      {children}
    </div>
  );
}
