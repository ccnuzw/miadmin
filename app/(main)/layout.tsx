
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { ThemeProvider } from '@/lib/theme-context';

export default function MainLayoutGroup({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MainLayout>
        {children}
      </MainLayout>
    </ThemeProvider>
  );
}
