'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { DockNav } from '@/components/Dock';

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        {/* Background */}
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

        {/* Main content */}
        <div className="relative z-10">{children}</div>

        {/* Dock */}
        <div className="fixed bottom-4 inset-x-0 flex justify-center z-50">
          <DockNav />
        </div>
      </div>
    </ThemeProvider>
  );
}
