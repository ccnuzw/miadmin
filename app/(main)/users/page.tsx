'use client';
import React, { useState } from 'react';
import { Table, Button, Input, Space, Modal, Switch, Tag, Select, message, App } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import Link from 'next/link';

const { Search } = Input;

interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  roles: string[];
  status: boolean; // true for enabled, false for disabled
  createdAt: string;
  lastLogin: string;
}

const dummyUsers: User[] = [
  { id: '1', username: 'admin', email: 'admin@example.com', phone: '13800000001', roles: ['管理员', '编辑'], status: true, createdAt: '2023-01-01', lastLogin: '2023-07-19' },
  { id: '2', username: 'user1', email: 'user1@example.com', phone: '13800000002', roles: ['普通用户'], status: true, createdAt: '2023-01-05', lastLogin: '2023-07-18' },
  { id: '3', username: 'editor1', email: 'editor1@example.com', phone: '13800000003', roles: ['编辑'], status: false, createdAt: '2023-01-10', lastLogin: '2023-07-17' },
  { id: '4', username: 'guest', email: 'guest@example.com', phone: '13800000004', roles: ['访客'], status: true, createdAt: '2023-02-01', lastLogin: '2023-07-19' },
  { id: '5', username: 'user2', email: 'user2@example.com', phone: '13800000005', roles: ['普通用户'], status: true, createdAt: '2023-02-15', lastLogin: '2023-07-16' },
];

const UsersPage: React.FC = () => {
  const { modal } = App.useApp();
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [searchText, setSearchText] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<boolean | undefined>(undefined);
  const [filterRole, setFilterRole] = useState<string | undefined>(undefined);

  const handleSearch = (value: string) => {
    setSearchText(value);
    filterUsers(value, filterStatus, filterRole);
  };

  const handleStatusChange = (value: boolean | undefined) => {
    setFilterStatus(value);
    filterUsers(searchText, value, filterRole);
  };

  const handleRoleChange = (value: string | undefined) => {
    setFilterRole(value);
    filterUsers(searchText, filterStatus, value);
  };

  const filterUsers = (search: string, status: boolean | undefined, role: string | undefined) => {
    let filtered = dummyUsers;

    if (search) {
      filtered = filtered.filter(user =>
        user.username.includes(search) ||
        user.email.includes(search) ||
        user.phone.includes(search)
      );
    }

    if (status !== undefined) {
      filtered = filtered.filter(user => user.status === status);
    }

    if (role) {
      filtered = filtered.filter(user => user.roles.includes(role));
    }

    setUsers(filtered);
  };

  const handleDelete = (id: string) => {
    modal.confirm({
      title: '确定要删除此用户吗？',
      content: '删除后将无法恢复！',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        setUsers(users.filter(user => user.id !== id));
        message.success('用户删除成功！');
      },
      onCancel() {
        message.info('取消删除。');
      },
    });
  };

  const handleResetPassword = (id: string) => {
    modal.confirm({
      title: '确定要重置此用户密码吗？',
      content: '重置后密码将变为初始密码，请及时通知用户！',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        message.success(`用户 ${id} 密码已重置！`);
      },
      onCancel() {
        message.info('取消重置密码。');
      },
    });
  };

  const handleStatusToggle = (id: string, checked: boolean) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: checked } : user
    ));
    message.success(`用户 ${id} 已${checked ? '启用' : '禁用'}！`);
  };

  const columns: TableProps<User>['columns'] = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: string[]) => (
        <>
          {roles.map(role => (
            <Tag color="blue" key={role}>
              {role}
            </Tag>
          ))}
        </>
      ),
      filters: [
        { text: '管理员', value: '管理员' },
        { text: '编辑', value: '编辑' },
        { text: '普通用户', value: '普通用户' },
        { text: '访客', value: '访客' },
      ],
      onFilter: (value, record) => record.roles.includes(value as string),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          checked={status}
          onChange={(checked) => handleStatusToggle(record.id, checked)}
        />
      ),
      filters: [
        { text: '启用', value: true },
        { text: '禁用', value: false },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      sorter: (a, b) => new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/users/${record.id}`}>
            <Button icon={<EditOutlined />}>编辑</Button>
          </Link>
          <Button icon={<ReloadOutlined />} onClick={() => handleResetPassword(record.id)}>重置密码</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>用户列表</h1>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="搜索用户名、邮箱或手机号"
          onSearch={handleSearch}
          style={{ width: 250 }}
          allowClear
        />
        <Select
          placeholder="筛选状态"
          allowClear
          style={{ width: 120 }}
          onChange={handleStatusChange}
          options={[
            { value: true, label: '启用' },
            { value: false, label: '禁用' },
          ]}
        />
        <Select
          placeholder="筛选角色"
          allowClear
          style={{ width: 120 }}
          onChange={handleRoleChange}
          options={[
            { value: '管理员', label: '管理员' },
            { value: '编辑', label: '编辑' },
            { value: '普通用户', label: '普通用户' },
            { value: '访客', label: '访客' },
          ]}
        />
        <Link href="/users/new">
          <Button type="primary" icon={<PlusOutlined />}>新增用户</Button>
        </Link>
      </Space>
      <Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default UsersPage;