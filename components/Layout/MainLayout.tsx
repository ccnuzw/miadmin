
'use client';
import React, { useState } from 'react';
import { Layout, theme, ConfigProvider } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import ThemeSettings from '@/components/Theme/ThemeSettings';
import { useTheme, LayoutType } from '@/lib/theme-context';
import { MOCK_MENU_PERMISSIONS, MenuItem } from '@/lib/constants';
import { useRouter } from 'next/navigation';

const { Content, Footer } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

interface MainLayoutProps {
  children: React.ReactNode;
}

// 辅助函数：查找菜单项的第一个子菜单的路径
const findFirstChildPath = (menuItem: MenuItem): string | undefined => {
  if (menuItem.children && menuItem.children.length > 0) {
    for (const child of menuItem.children) {
      if (!child.hidden) {
        if (child.path) {
          return child.path;
        } else if (child.children && child.children.length > 0) {
          const nestedPath = findFirstChildPath(child);
          if (nestedPath) return nestedPath;
        }
      }
    }
  }
  return undefined;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    layout,
    primaryColor,
    borderRadius,
    darkMode,
    colorSuccess,
    colorWarning,
    colorError,
    colorInfo,
    colorText,
    colorTextSecondary,
    colorBgContainer,
    colorBgLayout,
    colorBorder,
    fontSizeLG,
    fontSizeSM,
    lineHeight,
    marginMD,
    paddingMD,
    borderRadiusSM,
    borderRadiusLG,
    lineWidth,
    fontSize,
    controlHeight,
  } = useTheme(); // 获取所有主题参数

  const [selectedTopMenuKey, setSelectedTopMenuKey] = useState(MOCK_MENU_PERMISSIONS[0]?.key || '');

  const router = useRouter();

  const showSidebar = layout === 'default' || layout === 'classic' || layout === 'two-column';
  const currentSidebarCollapsed = layout === 'classic' ? collapsed : collapsed;
  const enableSidebarCollapse = layout === 'default' || layout === 'two-column' || layout === 'classic';

  const handleSidebarCollapse = (value: boolean) => {
    if (enableSidebarCollapse) {
      setCollapsed(value);
    }
  };

  const headerSetCollapsed = enableSidebarCollapse ? handleSidebarCollapse : () => {};

  const handleSelectTopMenuItem = (key: string) => {
    setSelectedTopMenuKey(key);
    if (layout === 'two-column') {
      const selectedTopMenu = MOCK_MENU_PERMISSIONS.find(item => item.key === key);
      if (selectedTopMenu) {
        if (selectedTopMenu.path) {
          router.push(selectedTopMenu.path);
        } else {
          const firstChildPath = findFirstChildPath(selectedTopMenu);
          if (firstChildPath) {
            router.push(firstChildPath);
          }
        }
      }
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
          borderRadius: borderRadius,
          colorSuccess: colorSuccess,
          colorWarning: colorWarning,
          colorError: colorError,
          colorInfo: colorInfo,
          colorText: colorText,
          colorTextSecondary: colorTextSecondary,
          colorBgContainer: colorBgContainer,
          colorBgLayout: colorBgLayout,
          colorBorder: colorBorder,
          fontSizeLG: fontSizeLG,
          fontSizeSM: fontSizeSM,
          lineHeight: lineHeight,
          marginMD: marginMD,
          paddingMD: paddingMD,
          borderRadiusSM: borderRadiusSM,
          borderRadiusLG: borderRadiusLG,
          lineWidth: lineWidth,
          fontSize: fontSize,
          controlHeight: controlHeight,
        },
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Layout className="!min-h-screen" hasSider={showSidebar} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row', background: colorBgLayout }}>
        {showSidebar && (
          <Sidebar
            collapsed={currentSidebarCollapsed}
            onCollapse={handleSidebarCollapse}
            layout={layout}
            selectedTopMenuKey={selectedTopMenuKey}
          />
        )}
        <Layout>
          <Header
            collapsed={currentSidebarCollapsed}
            setCollapsed={headerSetCollapsed}
            layout={layout}
            onSelectTopMenuItem={handleSelectTopMenuItem}
          />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer, 
              borderRadius: borderRadius, 
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: 'center', background: colorBgLayout, color: colorTextSecondary }}>
            MiAdmin ©{new Date().getFullYear()} Created by Your Name
          </Footer>
          <ThemeSettings />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
