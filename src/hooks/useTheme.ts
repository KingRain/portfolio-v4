'use client';

import { useTheme as useThemeContext } from '@/context/ThemeContext';

export function useTheme() {
  return useThemeContext();
}
