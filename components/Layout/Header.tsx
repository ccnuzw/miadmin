
'use client';
import React from 'react';
import { Layout, Button, theme, Dropdown, Space, Avatar } from 'antd';
import { BellOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import TopMenu from './TopMenu';
import { LayoutType } from '@/lib/theme-context';
import { MOCK_MENU_PERMISSIONS } from '@/lib/constants';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  layout: LayoutType;
  onSelectTopMenuItem?: (key: string) => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed, layout, onSelectTopMenuItem }) => {
  const {
    token: {
      colorBgContainer
    },
  } = theme.useToken();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a href="/settings">
          个人设置
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a href="/settings">
          修改密码
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a href="/login">
          退出登录
        </a>
      ),
    },
  ];

  // Only render header content if layout is not 'classic'
  if (layout === 'classic') {
    return <AntHeader style={{ padding: 0, background: colorBgContainer }} />;
  }

  return (
    <AntHeader style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {(layout === 'single-column' || layout === 'two-column') && (
          <TopMenu
            menuData={MOCK_MENU_PERMISSIONS}
            layout={layout}
            onSelectTopMenuItem={onSelectTopMenuItem}
          />
        )}
      </div>
      <div style={{ marginRight: 24 }}>
        <Space size="middle">
          <Dropdown
            menu={{
              items: [
                { key: '1', label: '您有新的消息' },
                { key: '2', label: '系统更新通知' },
                { key: '3', label: '查看所有通知' },
              ],
            }}
            trigger={['click']}
            placement="bottomRight"
          >
            <a onClick={(e) => e.preventDefault()}>
              <BellOutlined style={{ fontSize: '18px' }} />
            </a>
          </Dropdown>
          <Dropdown menu={{ items }} placement="bottomRight">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar icon={<UserOutlined />} />
                <span>管理员</span>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header;
