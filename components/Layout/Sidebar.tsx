import React from 'react';
import { Layout, Menu, Button, theme } from 'antd';
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
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LineChartOutlined,
  AppstoreOutlined,
  TableOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { MOCK_MENU_PERMISSIONS, MenuItem } from '@/lib/constants';
import { LayoutType, useTheme } from '@/lib/theme-context'; // 导入 useTheme

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse?: (collapsed: boolean) => void;
  layout: LayoutType;
  selectedTopMenuKey?: string;
}

// Map icon names to Ant Design Icon components
const iconMap: { [key: string]: React.ReactNode } = {
  DashboardOutlined: <DashboardOutlined />,
  UserOutlined: <UserOutlined />,
  TeamOutlined: <TeamOutlined />,
  SafetyOutlined: <SafetyOutlined />,
  SettingOutlined: <SettingOutlined />,
  NotificationOutlined: <NotificationOutlined />,
  FileTextOutlined: <FileTextOutlined />,
  DeploymentUnitOutlined: <DeploymentUnitOutlined />,
  BlockOutlined: <BlockOutlined />,
  LineChartOutlined: <LineChartOutlined />,
  AppstoreOutlined: <AppstoreOutlined />,
  TableOutlined: <TableOutlined />,
};

// Function to transform mock menu data to Ant Design Menu items
const getMenuItems = (menuData: MenuItem[]) => {
  return menuData.map(item => {
    if (item.hidden) return null; // Skip hidden items

    if (item.children && item.children.length > 0) {
      return {
        key: item.key,
        icon: item.icon ? iconMap[item.icon] : null,
        label: item.label,
        children: getMenuItems(item.children),
      };
    } else {
      const linkHref = item.path || '#'; 
      return {
        key: item.key,
        icon: item.icon ? iconMap[item.icon] : null,
        label: <Link href={linkHref}>{item.label}</Link>,
      };
    }
  }).filter(Boolean); // Filter out nulls from hidden items
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse, layout, selectedTopMenuKey }) => {
  const { token: { colorBgContainer, colorText } } = theme.useToken(); // 获取 colorBgContainer 和 colorText
  const { darkMode } = useTheme(); // 获取 darkMode 状态

  let currentMenuItems = MOCK_MENU_PERMISSIONS;

  if (layout === 'two-column' && selectedTopMenuKey) {
    const selectedTopMenu = MOCK_MENU_PERMISSIONS.find(item => item.key === selectedTopMenuKey);
    if (selectedTopMenu && selectedTopMenu.children) {
      currentMenuItems = selectedTopMenu.children;
    } else {
      currentMenuItems = [];
    }
  }

  const menuItems = getMenuItems(currentMenuItems);

  const siderCollapsed = layout === 'classic' ? collapsed : collapsed; 
  const siderCollapsible = layout === 'default' || layout === 'two-column' || layout === 'classic'; 

  return (
    <Sider
      trigger={null}
      collapsible={siderCollapsible}
      collapsed={siderCollapsed}
      breakpoint="lg"
      onCollapse={(value) => {
        if (onCollapse && siderCollapsible) {
          onCollapse(value);
        }
      }}
      width={200}
      collapsedWidth={80}
      style={{ background: colorBgContainer }} // 使用动态背景色
    >
      <div className="demo-logo-vertical" style={{ height: 32, margin: 16, background: 'rgba(0,0,0,.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {!siderCollapsed && <h1 style={{ color: colorText, fontSize: '18px', margin: 0 }}>MiAdmin</h1>} {/* 使用 colorText */}
        {siderCollapsed && <BlockOutlined style={{ fontSize: '24px', color: colorText }} />} {/* 使用 colorText */}
        {siderCollapsible && onCollapse && (
          <Button
            type="text"
            icon={siderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => onCollapse(!siderCollapsed)}
            style={{ fontSize: '16px', width: 32, height: 32 }}
          />
        )}
      </div>
      <Menu
        theme={darkMode ? 'dark' : 'light'} // 根据 darkMode 动态设置主题
        mode="inline"
        defaultSelectedKeys={['dashboard']}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;