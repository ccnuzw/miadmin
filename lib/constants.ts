// Define your constants here
export const SITE_NAME = 'MiAdmin';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const breadcrumbRoutesMap: { [key: string]: string } = {
  '/': '首页',
  '/users': '用户管理',
  '/users/new': '新增用户',
  '/roles': '角色管理',
  '/roles/new': '新增角色',
  '/permissions': '权限管理',
  '/settings': '系统设置',
  '/settings/notifications': '通知设置',
  '/settings/logs': '日志管理',
  // Dynamic routes will be handled in the component
};