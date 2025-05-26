
'use client';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';
import './globals.css';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import { Toaster } from "@/components/ui/toaster";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata cannot be exported from a client component.
// It should be defined in a server component parent or in page.tsx files.
// For now, we'll keep a simplified static one here, but ideally this moves.
// export const metadata: Metadata = {
//   title: 'FiscalFlow',
//   description: 'Your Personal Financial Management Platform',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geistSans.variable, geistMono.variable, 'antialiased')}>
        <SidebarProvider defaultOpen>
          <Sidebar collapsible="icon" className="border-r">
            <SidebarHeader className="p-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                {/* Custom SVG Logo for FiscalFlow */}
                <svg width="32" height="32" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                  <path d="M100 25C141.421 25 175 58.5786 175 100C175 141.421 141.421 175 100 175C58.5786 175 25 141.421 25 100C25 58.5786 58.5786 25 100 25Z" fill="currentColor" fillOpacity="0.2"/>
                  <path d="M100 40C133.137 40 160 66.8629 160 100C160 133.137 133.137 160 100 160C66.8629 160 40 133.137 40 100C40 66.8629 66.8629 40 100 40Z" stroke="hsl(var(--primary))" strokeWidth="12"/>
                  <path d="M70 100H130" stroke="hsl(var(--primary-foreground))" strokeWidth="12" strokeLinecap="round"/>
                  <path d="M100 70V130" stroke="hsl(var(--primary-foreground))" strokeWidth="12" strokeLinecap="round"/>
                </svg>
                <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">FiscalFlow</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {NAV_ITEMS.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.startsWith(item.href)}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-2">
               <Link href="/profile">
                 <span className="flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center">
                   <Avatar className="h-8 w-8">
                     <AvatarImage src="https://placehold.co/40x40.png" alt="User Avatar" data-ai-hint="user avatar" />
                     <AvatarFallback>FF</AvatarFallback>
                   </Avatar>
                   <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                      <span className="text-sm font-medium text-sidebar-foreground">Demo User</span>
                      <span className="text-xs text-muted-foreground">user@fiscalflow.com</span>
                   </div>
                 </span>
               </Link>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="flex flex-col">
             <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
                <SidebarTrigger className="md:hidden" />
                <div className="flex-1">
                  {/* Current page title can be dynamically set here using context or other state management */}
                  <h1 className="text-lg font-semibold">
                    {NAV_ITEMS.find(item => pathname.startsWith(item.href))?.label || 'FiscalFlow'}
                  </h1>
                </div>
                {/* Add any header actions here, e.g., notifications, user menu */}
              </header>
            <main className="flex-1 overflow-auto p-4 md:p-6">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
