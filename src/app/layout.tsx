// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next"
import ClientShell from '@/components/ClientShell'; // client-only logic

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata = {
  title: 'Sam Joe | Portfolio',
  description: 'Personal portfolio showcasing my work and skills',
  icons: {
    icon: '/logo.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-200`}
      >
        <ClientShell>{children}</ClientShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
