'use client';
import React from 'react';
import { Breadcrumb } from 'antd';
import { usePathname } from 'next/navigation';

const BreadcrumbNav: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const name = segment.charAt(0).toUpperCase() + segment.slice(1);
    return {
      key: url,
      title: <a href={url}>{name}</a>,
    };
  });

  // Add a home item if not already present
  if (breadcrumbItems.length === 0 || breadcrumbItems[0].key !== '/') {
    breadcrumbItems.unshift({
      key: '/',
      title: <a href="/">Home</a>,
    });
  }

  return (
    <Breadcrumb style={{ margin: '0 16px' }} items={breadcrumbItems} />
  );
};

export default BreadcrumbNav;
