'use client';
import React, { useState } from 'react';
import { Table, Input, Space, Typography } from 'antd';
import type { TableProps } from 'antd';
import { Permission } from '@/lib/types';

const { Search } = Input;
const { Title } = Typography;

const dummyPermissions: Permission[] = [
  { id: '1', name: '用户列表查看', description: '允许查看用户列表', code: 'user:list', module: '用户管理', type: '功能权限' },
  { id: '2', name: '用户新增', description: '允许新增用户', code: 'user:add', module: '用户管理', type: '功能权限' },
  { id: '3', name: '用户编辑', description: '允许编辑用户', code: 'user:edit', module: '用户管理', type: '功能权限' },
  { id: '4', name: '用户删除', description: '允许删除用户', code: 'user:delete', module: '用户管理', type: '功能权限' },
  { id: '5', name: '角色列表查看', description: '允许查看角色列表', code: 'role:list', module: '角色管理', type: '功能权限' },
  { id: '6', name: '角色新增', description: '允许新增角色', code: 'role:add', module: '角色管理', type: '功能权限' },
  { id: '7', name: '角色编辑', description: '允许编辑角色', code: 'role:edit', module: '角色管理', type: '功能权限' },
  { id: '8', name: '角色删除', description: '允许删除角色', code: 'role:delete', module: '角色管理', type: '功能权限' },
  { id: '9', name: '权限列表查看', description: '允许查看权限列表', code: 'permission:list', module: '权限管理', type: '功能权限' },
  { id: '10', name: '仪表盘访问', description: '允许访问仪表盘', code: 'dashboard:view', module: '仪表盘', type: '菜单权限' },
  { id: '11', name: '系统设置访问', description: '允许访问系统设置', code: 'settings:view', module: '系统设置', type: '菜单权限' },
];

const PermissionsPage: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>(dummyPermissions);
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = dummyPermissions.filter(permission =>
      permission.name.includes(value) ||
      permission.code.includes(value) ||
      permission.module.includes(value) ||
      permission.description.includes(value)
    );
    setPermissions(filtered);
  };

  const columns: TableProps<Permission>['columns'] = [
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '权限编码',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: '所属模块',
      dataIndex: 'module',
      key: 'module',
      filters: [
        { text: '用户管理', value: '用户管理' },
        { text: '角色管理', value: '角色管理' },
        { text: '权限管理', value: '权限管理' },
        { text: '仪表盘', value: '仪表盘' },
        { text: '系统设置', value: '系统设置' },
      ],
      onFilter: (value, record) => record.module.includes(value as string),
    },
    {
      title: '权限类型',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: '菜单权限', value: '菜单权限' },
        { text: '功能权限', value: '功能权限' },
      ],
      onFilter: (value, record) => record.type.includes(value as string),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <div>
      <Title level={2}>权限管理</Title>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="搜索权限名称、编码或描述"
          onSearch={handleSearch}
          style={{ width: 300 }}
          allowClear
        />
      </Space>
      <Table columns={columns} dataSource={permissions} rowKey="id" pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default PermissionsPage;