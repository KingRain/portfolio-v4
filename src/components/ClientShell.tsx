'use client';

import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/context/ThemeContext';

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
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="relative min-h-screen">{children}</div>

        <div className="fixed bottom-4 inset-x-0 flex justify-center z-50">
          <DockNav />
        </div>
      </div>
    </ThemeProvider>
  );
}
