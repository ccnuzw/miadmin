'use client';
import React from 'react';
import { Layout, Button, theme, Dropdown, Space, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
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

  return (
    <AntHeader style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
        <BreadcrumbNav />
      </div>
      <div style={{ marginRight: 24 }}>
        <Space size="middle">
          <BellOutlined style={{ fontSize: '18px' }} />
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
