
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import '../globals.css'; // Use existing global styles
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FiscalFlow | Authentication',
  description: 'Login or Register for FiscalFlow',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geistSans.variable, geistMono.variable, 'antialiased bg-background text-foreground')}>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="mb-8 text-center">
            <Link href="/" className="flex items-center justify-center gap-2">
              <svg width="48" height="48" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M100 25C141.421 25 175 58.5786 175 100C175 141.421 141.421 175 100 175C58.5786 175 25 141.421 25 100C25 58.5786 58.5786 25 100 25Z" fill="currentColor" fillOpacity="0.2"/>
                <path d="M100 40C133.137 40 160 66.8629 160 100C160 133.137 133.137 160 100 160C66.8629 160 40 133.137 40 100C40 66.8629 66.8629 40 100 40Z" stroke="hsl(var(--primary))" strokeWidth="12"/>
                <path d="M70 100H130" stroke="hsl(var(--primary-foreground))" strokeWidth="12" strokeLinecap="round"/>
                <path d="M100 70V130" stroke="hsl(var(--primary-foreground))" strokeWidth="12" strokeLinecap="round"/>
              </svg>
              <span className="font-semibold text-3xl text-primary">FiscalFlow</span>
            </Link>
          </div>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
