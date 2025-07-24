import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  UserOutlined,
  SettingOutlined,
  DashboardOutlined,
  TeamOutlined,
  SafetyOutlined,
  NotificationOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import Link from 'next/link';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
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
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <DashboardOutlined />,
            label: <Link href="/">仪表盘</Link>,
          },
          {
            key: 'new-dashboard',
            icon: <DashboardOutlined />,
            label: <Link href="/new-dashboard">新仪表盘</Link>,
          },
          {
            key: 'component-showcase',
            icon: <DashboardOutlined />,
            label: <Link href="/component-showcase">组件展示</Link>,
          },
          {
            key: 'list-showcase',
            icon: <FileTextOutlined />,
            label: <Link href="/list-showcase">列表展示</Link>,
          },
          {
            key: 'sub1',
            icon: <UserOutlined />,
            label: '用户管理',
            children: [
              {
                key: '2',
                label: <Link href="/users">用户列表</Link>,
              },
              {
                key: '3',
                label: <Link href="/users/new">新增用户</Link>,
              },
            ],
          },
          {
            key: 'sub2',
            icon: <TeamOutlined />,
            label: '角色管理',
            children: [
              {
                key: '4',
                label: <Link href="/roles">角色列表</Link>,
              },
              {
                key: '5',
                label: <Link href="/roles/new">新增角色</Link>,
              },
            ],
          },
          {
            key: '6',
            icon: <SafetyOutlined />,
            label: <Link href="/permissions">权限管理</Link>,
          },
          {
            key: 'sub3',
            icon: <SettingOutlined />,
            label: '系统设置',
            children: [
              {
                key: '7',
                label: <Link href="/settings">通用设置</Link>,
              },
              {
                key: '8',
                label: <Link href="/settings/notifications">通知设置</Link>,
              },
              {
                key: '9',
                label: <Link href="/settings/logs">日志管理</Link>,
              },
            ],
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
