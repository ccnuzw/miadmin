
'use client';
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { ThemeProvider } from '@/lib/theme-context';
import { TabsProvider, useTabs } from '@/lib/tabs-context';
import DynamicTabs from '@/components/Layout/DynamicTabs';
import { usePathname } from 'next/navigation';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { activeKey } = useTabs();

  return (
    <MainLayout selectedKeys={[activeKey]}>
      <DynamicTabs />
      {children}
    </MainLayout>
  );
}

export default function MainLayoutGroup({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TabsProvider>
        <LayoutContent>{children}</LayoutContent>
      </TabsProvider>
    </ThemeProvider>
  );
}
