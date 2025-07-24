import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  DashboardOutlined,
  TeamOutlined,
  SafetyOutlined,
  NotificationOutlined,
  FileTextOutlined,
  DeploymentUnitOutlined, // Import new icon
  BlockOutlined, // Import new icon
} from '@ant-design/icons';
import Link from 'next/link';
import { MOCK_MENU_PERMISSIONS, MenuItem } from '@/lib/constants';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse?: (collapsed: boolean) => void;
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
      return {
        key: item.key,
        icon: item.icon ? iconMap[item.icon] : null,
        label: <Link href={item.path}>{item.label}</Link>,
      };
    }
  }).filter(Boolean); // Filter out nulls from hidden items
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
  const menuItems = getMenuItems(MOCK_MENU_PERMISSIONS);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg" // 当屏幕宽度小于 lg (992px) 时触发响应式
      onCollapse={(value) => {
        if (onCollapse) {
          onCollapse(value);
        }
      }}
      width={200}
      collapsedWidth={80}
      style={{ background: '#fff' }}
    >
      <div className="demo-logo-vertical" style={{ height: 32, margin: 16, background: 'rgba(0,0,0,.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!collapsed && <h1 style={{ color: '#000', fontSize: '18px', margin: 0 }}>MiAdmin</h1>}
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['dashboard']} // Set default selected key to dashboard
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;

