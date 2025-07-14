'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DockNav } from '@/components/Dock';
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This is a workaround for Next.js 13+ to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="min-h-screen flex items-center justify-center">
            Loading...
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-200`}>
        <ThemeProvider>
          <div className="relative min-h-screen">
            {/* Background elements */}
            <div className="fixed inset-0 w-full h-full z-0">
              {/* Spline image centered in the middle of the page */}
              <div
                className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
                style={{
                  backgroundImage: "url('/HeroSpline.png')",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backdropFilter: "blur(9px)",
                  filter: "blur(9px)"
                }}
              />

              {/* Repeating grain texture */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  backgroundImage: "url('/NoiseFilter.png')",
                  backgroundSize: "200px",
                  backgroundPosition: "center",
                  backgroundRepeat: "repeat",
                  opacity: 0.5
                }}
              />
            </div>

            {/* Main content with higher z-index */}
            <div className="relative z-10">
              {children}
            </div>

            {/* Dock with higher z-index */}
            <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
              <DockNav />
            </div>
          </div>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
