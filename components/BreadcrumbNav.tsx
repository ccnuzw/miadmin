'use client';
import React from 'react';
import { Breadcrumb } from 'antd';
import { usePathname } from 'next/navigation';

const pathNameMap: { [key: string]: string } = {
  dashboard: '仪表盘',
  users: '用户管理',
  roles: '角色管理',
  permissions: '权限管理',
  settings: '系统设置',
  logs: '日志管理',
  notifications: '通知设置',
  'new-dashboard': '新仪表盘',
  new: '新增',
  'component-showcase': '组件展示',
  // Add more mappings as needed
};

const BreadcrumbNav: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const name = pathNameMap[segment] || (segment.charAt(0).toUpperCase() + segment.slice(1));
    return {
      key: url,
      title: <a href={url}>{name}</a>,
    };
  });

  // Add a home item if not already present
  if (breadcrumbItems.length === 0 || breadcrumbItems[0].key !== '/') {
    breadcrumbItems.unshift({
      key: '/',
      title: <a href="/">首页</a>,
    });
  }

  return (
    <Breadcrumb style={{ margin: '0 16px' }} items={breadcrumbItems} />
  );
};

export default BreadcrumbNav;
