
"use client";

import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import {
  UserOutlined,
  SettingOutlined,
  DashboardOutlined,
  TeamOutlined,
  SafetyOutlined,
  NotificationOutlined,
  FileTextOutlined,
  DeploymentUnitOutlined,
  BlockOutlined,
} from '@ant-design/icons'; // 导入所有用到的图标
import { MenuItem } from '@/lib/constants';
import { LayoutType } from '@/lib/theme-context';

interface TopMenuProps {
  menuData: MenuItem[];
  layout: LayoutType;
  onSelectTopMenuItem?: (key: string) => void; // 用于双栏布局，通知当前选中一级菜单
}

// Map icon names to Ant Design Icon components (re-use from Sidebar)
const iconMap: { [key: string]: React.ReactNode } = {
  DashboardOutlined: <DashboardOutlined />,
  UserOutlined: <UserOutlined />,
  TeamOutlined: <TeamOutlined />,
  SafetyOutlined: <SafetyOutlined />,
  NotificationOutlined: <NotificationOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  DeploymentUnitOutlined: <DeploymentUnitOutlined />,
  BlockOutlined: <BlockOutlined />,
};

// Helper function to transform menu data for Ant Design Menu
const getAntdMenuItems = (menuData: MenuItem[], isTopLevel: boolean = false): MenuProps['items'] => {
  return menuData.map(item => {
    if (item.hidden) return null;

    if (item.children && item.children.length > 0 && !isTopLevel) {
      // For nested items in horizontal menu, we might want to show them as sub-menus
      return {
        key: item.key,
        icon: item.icon ? iconMap[item.icon] : null,
        label: item.label,
        children: getAntdMenuItems(item.children),
      };
    } else if (item.children && item.children.length > 0 && isTopLevel) {
        // For top-level items in horizontal menu, if they have children, they are just labels
        return {
            key: item.key,
            icon: item.icon ? iconMap[item.icon] : null,
            label: item.label,
            // 在这里不添加 Link，因为双栏布局下，一级菜单点击是触发 onSelectTopMenuItem
            // 单栏布局下，如果一级菜单有子菜单，也不直接跳转，而是展开子菜单
        };
    } else {
      return {
        key: item.key,
        icon: item.icon ? iconMap[item.icon] : null,
        label: <Link href={item.path}>{item.label}</Link>,
      };
    }
  }).filter(Boolean);
};

const TopMenu: React.FC<TopMenuProps> = ({ menuData, layout, onSelectTopMenuItem }) => {
  // 为双栏布局的一级菜单添加 path 属性
  const topLevelMenuItems = menuData.map(item => ({
    key: item.key,
    icon: item.icon ? iconMap[item.icon] : null,
    label: item.label,
    path: item.path, // 确保 path 属性被传递
  }));

  const allMenuItems = getAntdMenuItems(menuData);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // 在双栏布局下，无论是否有子菜单，都通知 MainLayout
    if (layout === 'two-column' && onSelectTopMenuItem) {
      onSelectTopMenuItem(e.key);
    } else if (layout === 'single-column') {
      // 单栏布局下，如果点击的是有 path 的菜单项，则直接跳转
      const selectedItem = menuData.find(item => item.key === e.key);
      if (selectedItem && selectedItem.path) {
        // 这里不需要 router.push，因为 Link 组件已经处理了
        // 但如果菜单项没有 Link，或者需要更复杂的逻辑，可以在这里处理
      }
    }
  };

  return (
    <Menu
      theme="light"
      mode="horizontal"
      items={layout === 'two-column' ? topLevelMenuItems : allMenuItems}
      onClick={handleMenuClick}
      // defaultSelectedKeys={['home']} // 可以根据当前路由设置默认选中
      style={{ flex: 1, minWidth: 0 }} // 确保菜单可以水平伸展
    />
  );
};

export default TopMenu;
