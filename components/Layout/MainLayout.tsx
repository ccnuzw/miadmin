
'use client';
import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import ThemeSettings from '@/components/Theme/ThemeSettings';
import { useTheme, LayoutType } from '@/lib/theme-context';
import { MOCK_MENU_PERMISSIONS, MenuItem } from '@/lib/constants'; // 导入菜单数据
import { useRouter } from 'next/navigation'; // 导入 useRouter

const { Content, Footer } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

// 辅助函数：查找菜单项的第一个子菜单的路径
const findFirstChildPath = (menuItem: MenuItem): string | undefined => {
  if (menuItem.children && menuItem.children.length > 0) {
    // 递归查找第一个非隐藏的子菜单
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
  const [collapsed, setCollapsed] = useState(false); // 用于默认布局的侧边栏折叠状态
  const { layout } = useTheme(); // 从主题上下文获取当前布局类型
  // 用于双栏布局，跟踪当前选中一级菜单的key，默认为第一个一级菜单的key
  const [selectedTopMenuKey, setSelectedTopMenuKey] = useState(MOCK_MENU_PERMISSIONS[0]?.key || '');

  const router = useRouter(); // 初始化 useRouter

  const {
    token: {
      colorBgContainer,
      borderRadiusLG
    },
  } = theme.useToken();

  // 根据布局类型判断侧边栏是否显示、是否可折叠以及当前折叠状态
  const showSidebar = layout === 'default' || layout === 'classic' || layout === 'two-column';
  const currentSidebarCollapsed = layout === 'classic' ? false : collapsed; // 经典布局侧边栏始终展开
  const enableSidebarCollapse = layout === 'default' || layout === 'two-column'; // 默认和双栏布局允许侧边栏折叠

  // 处理侧边栏折叠的函数，仅在允许折叠时才更新状态
  const handleSidebarCollapse = (value: boolean) => {
    if (enableSidebarCollapse) {
      setCollapsed(value);
    }
  };

  // 始终传递一个函数给 Header，即使是空操作
  const headerSetCollapsed = enableSidebarCollapse ? handleSidebarCollapse : () => {};

  // 处理顶部菜单选择，用于双栏布局
  const handleSelectTopMenuItem = (key: string) => {
    setSelectedTopMenuKey(key);
    // 如果是双栏布局，并且点击的是一级菜单
    if (layout === 'two-column') {
      const selectedTopMenu = MOCK_MENU_PERMISSIONS.find(item => item.key === key);
      if (selectedTopMenu) {
        // 优先跳转到一级菜单自身的path
        if (selectedTopMenu.path) {
          router.push(selectedTopMenu.path);
        } else {
          // 如果一级菜单没有path，则查找其第一个二级菜单的path
          const firstChildPath = findFirstChildPath(selectedTopMenu);
          if (firstChildPath) {
            router.push(firstChildPath);
          }
        }
      }
    }
  };

  return (
    <Layout className="!min-h-screen" hasSider={showSidebar} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
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
          collapsed={currentSidebarCollapsed} // Header的折叠状态反映侧边栏的实际状态
          setCollapsed={headerSetCollapsed} // 始终传递一个函数
          layout={layout}
          onSelectTopMenuItem={handleSelectTopMenuItem}
        />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          MiAdmin ©{new Date().getFullYear()} Created by Your Name
        </Footer>
        <ThemeSettings />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
