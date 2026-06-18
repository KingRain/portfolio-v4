'use client';

import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle(props: React.HTMLAttributes<SVGElement>) {
  const { theme } = useTheme();
  return theme === 'light' ? <Moon {...props} /> : <Sun {...props} />;
}

export function useThemeToggle() {
  const { toggleTheme } = useTheme();
  return toggleTheme;
}
