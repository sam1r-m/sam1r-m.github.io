import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { fontVariables } from '@/lib/fonts';
import { ThemeProvider } from '@/themes';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Portfolio | Developer & Designer',
    template: '%s | Portfolio',
  },
  description: 'Full-stack developer passionate about creating beautiful, performant, and accessible web applications.',
  keywords: ['developer', 'designer', 'portfolio', 'web development', 'react', 'nextjs'],
  authors: [{ name: 'Developer' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
