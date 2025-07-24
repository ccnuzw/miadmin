'use client';
import React, { useState, useCallback } from 'react';
import { Button, Input, Space, Modal, Switch, Tag, Select, message, App, Dropdown, Menu, Grid } from 'antd';
import { EditOutlined, DeleteOutlined, ReloadOutlined, PlusOutlined, MoreOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import RichTable from '@/components/Table/RichTable'; // 导入 RichTable

const { Search } = Input;
const { Option } = Select;
const { useBreakpoint } = Grid; // 导入 useBreakpoint

interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  roles: string[];
  status: boolean; // true for enabled, false for disabled
  unit: string; // New field for unit
  department: string; // New field for department
  lastLogin: string;
}

// 模拟数据，可以根据需要增加更多数据
const dummyUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  username: `user${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `138${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
  roles: i % 3 === 0 ? ['管理员'] : (i % 3 === 1 ? ['编辑'] : ['普通用户']),
  status: i % 2 === 0,
  unit: i % 2 === 0 ? '全球总部' : '智慧云子公司',
  department: i % 3 === 0 ? '销售部' : (i % 3 === 1 ? '人力资源部' : '前端组'),
  lastLogin: new Date(Date.now() - i * 3600000).toISOString().split('T')[0],
}));


const UsersPage: React.FC = () => {
  const { modal } = App.useApp();
  const screens = useBreakpoint(); // 获取屏幕断点

  const handleDelete = (id: string) => {
    modal.confirm({
      title: '确定要删除此用户吗？',
      content: '删除后将无法恢复！',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        // 实际项目中这里会调用API删除用户
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
    // 实际项目中这里会调用API更新用户状态
    message.success(`用户 ${id} 已${checked ? '启用' : '禁用'}！`);
  };

  // 模拟 fetchData 函数，适配 RichTable 的接口
  const fetchUsers = useCallback(async (params: any) => {
    let filtered = dummyUsers;

    // 搜索
    if (params.search) {
      const lowerCaseSearch = params.search.toLowerCase();
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(lowerCaseSearch) ||
        user.email.toLowerCase().includes(lowerCaseSearch) ||
        user.phone.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // 状态过滤
    if (params.filters?.status !== undefined) {
      filtered = filtered.filter(user => user.status === (params.filters.status === 'true'));
    }

    // 角色过滤
    if (params.filters?.role) {
      filtered = filtered.filter(user => user.roles.includes(params.filters.role));
    }

    // 排序
    if (params.sortBy) {
      filtered.sort((a, b) => {
        const aValue = (a as any)[params.sortBy];
        const bValue = (b as any)[params.sortBy];

        if (aValue < bValue) return params.sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return params.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const total = filtered.length;
    const startIndex = (params.page - 1) * params.pageSize;
    const endIndex = Math.min(startIndex + params.pageSize, total);
    const paginatedData = filtered.slice(startIndex, endIndex);

    return { data: paginatedData, total };
  }, []);


  const columns: ColumnsType<User> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      sorter: true, // 启用 RichTable 的排序
      width: 120,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 180,
      responsive: ['md'], // 在中等屏幕及以上显示
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      responsive: ['lg'], // 在大屏幕及以上显示
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
      width: 120,
      render: (roles: string[]) => (
        <>
          {roles.map(role => (
            <Tag color="blue" key={role}>
              {role}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: boolean, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          checked={status}
          onChange={(checked) => handleStatusToggle(record.id, checked)}
        />
      ),
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
      width: 120,
      responsive: ['md'],
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 120,
      responsive: ['md'],
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      sorter: true, // 启用 RichTable 的排序
      width: 150,
      responsive: ['lg'], // 在大屏幕及以上显示
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right', // 固定操作列
      render: (_, record) => (
        <Space size="small">
          <Link href={`/users/${record.id}`}>
            <Button icon={<EditOutlined />} size="small">编辑</Button>
          </Link>
          {screens.md ? ( // 在中等屏幕及以上显示完整按钮
            <>
              <Button icon={<ReloadOutlined />} onClick={() => handleResetPassword(record.id)} size="small">重置密码</Button>
              <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} size="small">删除</Button>
            </>
          ) : ( // 在小屏幕上使用下拉菜单
            <Dropdown
              menu={{
                items: [
                  { key: 'reset', icon: <ReloadOutlined />, label: '重置密码', onClick: () => handleResetPassword(record.id) },
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

  const userFilterOptions = [
    {
      key: 'status',
      label: '状态',
      options: [
        { value: 'true', label: '启用' },
        { value: 'false', label: '禁用' },
      ],
    },
    {
      key: 'role',
      label: '角色',
      options: [
        { value: '管理员', label: '管理员' },
        { value: '编辑', label: '编辑' },
        { value: '普通用户', label: '普通用户' },
        { value: '访客', label: '访客' },
      ],
    },
  ];

  return (
    <div>
      <h1>用户列表</h1>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }} direction={screens.md ? 'horizontal' : 'vertical'}>
        <Space direction={screens.md ? 'horizontal' : 'vertical'}>
          {/* RichTable 内部会处理搜索框和筛选器 */}
        </Space>
        <Space>
          <Link href="/users/new">
            <Button type="primary" icon={<PlusOutlined />}>新增用户</Button>
          </Link>
        </Space>
      </Space>
      <RichTable<User>
        columns={columns}
        fetchData={fetchUsers}
        rowKey="id"
        searchPlaceholder="搜索用户名、邮箱或手机号"
        filterOptions={userFilterOptions}
        initialSortBy="createdAt"
        initialSortOrder="desc"
      />
    </div>
  );
};

export default UsersPage;