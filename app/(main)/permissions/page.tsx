'use client';
import React, { useState } from 'react';
import { Table, Input, Space, Typography, Grid, Button, Dropdown, Menu } from 'antd';
import type { TableProps } from 'antd';
import { Permission } from '@/lib/types';
import GeneralTable from '@/components/Table/GeneralTable'; // 导入 GeneralTable
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons'; // 导入操作图标

const { Search } = Input;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const dummyPermissions: Permission[] = Array.from({ length: 30 }, (_, i) => ({
  id: `${i + 1}`,
  name: `权限名称 ${i + 1}`,
  description: `这是权限 ${i + 1} 的详细描述，用于测试响应式布局。`,
  code: `perm:code:${i + 1}`,
  module: ['用户管理', '角色管理', '权限管理', '仪表盘', '系统设置'][i % 5],
  type: i % 2 === 0 ? '功能权限' : '菜单权限',
}));

const PermissionsPage: React.FC = () => {
  const screens = useBreakpoint();
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

  const handleEdit = (id: string) => {
    // 实际编辑逻辑
    console.log('编辑权限:', id);
  };

  const handleDelete = (id: string) => {
    // 实际删除逻辑
    console.log('删除权限:', id);
  };

  const columns: TableProps<Permission>['columns'] = [
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 150,
    },
    {
      title: '权限编码',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.localeCompare(b.code),
      width: 150,
      responsive: ['md'], // 在中等屏幕及以上显示
    },
    {
      title: '所属模块',
      dataIndex: 'module',
      key: 'module',
      width: 120,
      filters: Array.from(new Set(dummyPermissions.map(p => p.module))).map(module => ({ text: module, value: module })),
      onFilter: (value, record) => record.module.includes(value as string),
    },
    {
      title: '权限类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      responsive: ['md'], // 在中等屏幕及以上显示
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
      width: 250,
      responsive: ['lg'], // 在大屏幕及以上显示
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          {screens.md ? (
            <>
              <Button icon={<EditOutlined />} onClick={() => handleEdit(record.id)} size="small">编辑</Button>
              <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} size="small">删除</Button>
            </>
          ) : (
            <Dropdown
              menu={{
                items: [
                  { key: 'edit', icon: <EditOutlined />, label: '编辑', onClick: () => handleEdit(record.id) },
                  { key: 'delete', icon: <DeleteOutlined />, label: '删除', danger: true, onClick: () => handleDelete(record.id) },
                ],
              }}
              trigger={['click']}
            >
              <Button icon={<MoreOutlined />} size="small" />
            </Dropdown>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>权限管理</Title>
      <Space style={{ marginBottom: 16, width: '100%' }}>
        <Search
          placeholder="搜索权限名称、编码或描述"
          onSearch={handleSearch}
          style={{ width: screens.md ? 300 : '100%' }} // 宽度自适应
          allowClear
          value={searchText}
        />
      </Space>
      <GeneralTable columns={columns} dataSource={permissions} rowKey="id" pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default PermissionsPage;