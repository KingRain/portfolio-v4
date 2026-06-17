// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next"
import ClientShell from '@/components/ClientShell'; // client-only logic

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' });
const playfair = Playfair_Display({ variable: '--font-playfair', subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'Sam Joe | Portfolio',
  description: 'Personal portfolio showcasing my work and skills',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-200`}
      >
        <ClientShell>{children}</ClientShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
