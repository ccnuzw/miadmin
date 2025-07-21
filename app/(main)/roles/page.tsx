'use client';
import React, { useState } from 'react';
import { Table, Button, Input, Space, Modal, message, App, Row } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import Link from 'next/link';
import { Role } from '@/lib/types';

const { Search } = Input;

const dummyRoles: Role[] = [
  { id: '1', name: '管理员', description: '系统最高权限，拥有所有操作权限' },
  { id: '2', name: '编辑', description: '负责内容编辑和发布' },
  { id: '3', name: '普通用户', description: '普通系统用户，仅拥有基本操作权限' },
  { id: '4', name: '访客', description: '未登录用户，仅可浏览部分内容' },
];

const RolesPage: React.FC = () => {
  const { modal } = App.useApp();
  const [roles, setRoles] = useState<Role[]>(dummyRoles);
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = (value: string) => {
    setSearchText(value);
    filterRoles(value);
  };

  const handleResetFilters = () => {
    setSearchText('');
    filterRoles('');
  };

  const filterRoles = (search: string) => {
    const filtered = dummyRoles.filter(role =>
      role.name.includes(search) || role.description.includes(search)
    );
    setRoles(filtered);
  };

  const handleDelete = (id: string) => {
    modal.confirm({
      title: '确定要删除此角色吗？',
      content: '删除后将无法恢复！',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        setRoles(roles.filter(role => role.id !== id));
        message.success('角色删除成功！');
      },
      onCancel() {
        message.info('取消删除。');
      },
    });
  };

  const columns: TableProps<Role>['columns'] = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '关联用户数量',
      dataIndex: 'associatedUsers',
      key: 'associatedUsers',
      render: () => Math.floor(Math.random() * 100), // Dummy count
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/roles/${record.id}`}>
            <Button icon={<EditOutlined />}>编辑</Button>
          </Link>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>角色列表</h1>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Space>
          <Search
            placeholder="搜索角色名称或描述"
            onSearch={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            allowClear
            value={searchText}
          />
          <Button onClick={handleResetFilters}>重置</Button>
        </Space>
        <Space>
          <Link href="/roles/new">
            <Button type="primary" icon={<PlusOutlined />}>新增角色</Button>
          </Link>
        </Space>
      </Row>
      <Table columns={columns} dataSource={roles} rowKey="id" pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default RolesPage;