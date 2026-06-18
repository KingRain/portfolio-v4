'use client';

import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/context/ThemeContext';
import { MobileNav } from './MobileNav';
import { SmoothScroll } from './SmoothScroll';

const DockNav = dynamic(
  () => import('@/components/Dock').then((m) => ({ default: m.DockNav })),
  { ssr: false }
);

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="min-h-screen bg-white dark:bg-black">
          <MobileNav />
          <div className="relative min-h-screen">{children}</div>

          <div className="fixed bottom-4 inset-x-0 justify-center z-50 hidden md:flex">
            <DockNav />
          </div>
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}
