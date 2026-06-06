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
      <div className="relative min-h-screen">
        <div className="fixed inset-0 -z-10">
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              backgroundImage: "url('/HeroSpline.png')",
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(9px)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              backgroundImage: "url('/NoiseFilter.png')",
              backgroundSize: '200px',
              backgroundRepeat: 'repeat',
            }}
          />
        </div>

        <div className="relative z-10">{children}</div>

        <div className="fixed bottom-4 inset-x-0 flex justify-center z-50">
          <DockNav />
        </div>
      </div>
    </ThemeProvider>
  );
}
