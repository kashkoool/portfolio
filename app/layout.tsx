import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Louay Kashkool - Portfolio",
  description: "Personal portfolio of Louay Kashkool - Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inter font is handled by next/font/google with font-display: swap - no preload needed */}
        {/* Cedarville Cursive is loaded dynamically when Encryption section is visible - no render-blocking */}
        
        {/* DNS prefetch for performance - non-blocking */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className="min-h-screen bg-[#030014] overflow-x-hidden">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
