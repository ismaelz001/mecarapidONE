import { Rajdhani } from 'next/font/google';

const rajdhani = Rajdhani({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
});

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={rajdhani.className}>
      {children}
    </div>
  );
}
