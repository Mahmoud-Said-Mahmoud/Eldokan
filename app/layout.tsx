import type { Metadata } from "next";

import "./globals.css";

import localFont from 'next/font/local';
import { Suspense } from 'react';
import SiteHeader from '@/components/navbar/SiteHeader';


const OpenSans = localFont({
  src: '../public/fonts/Inter-VariableFont_opsz,wght.ttf', 
  display: 'swap',
  variable: '--font-openSans',
});

export const metadata: Metadata = {
  title: "Eldokan | Shop Online",
  description: "Discover everyday essentials and great deals at Eldokan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${OpenSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col overflow-x-clip bg-[#fafafa] text-[#222222]">
        <Suspense fallback={<div className="h-[180px] shrink-0 bg-white" aria-hidden="true" />}>
          <SiteHeader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
