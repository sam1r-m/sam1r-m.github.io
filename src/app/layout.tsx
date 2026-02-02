import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { fontVariables } from '@/lib/fonts';
import { ThemeProvider } from '@/themes';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Samir | CS Student & Developer',
    template: '%s | Samir',
  },
  description: 'Fourth-year Computational Mathematics student at the University of Waterloo. Data science, analytics, and software development.',
  keywords: ['developer', 'student', 'portfolio', 'data science', 'math', 'waterloo', 'analytics'],
  authors: [{ name: 'Samir' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Samir',
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
        <SpeedInsights />
      </body>
    </html>
  );
}
