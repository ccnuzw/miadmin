'use client';
import React, { useState, useCallback } from 'react';
import { Button, Input, Space, Modal, message, App, Dropdown, Menu, Grid } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, MoreOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { Role } from '@/lib/types';
import RichTable from '@/components/Table/RichTable'; // 导入 RichTable

const { Search } = Input;
const { useBreakpoint } = Grid; // 导入 useBreakpoint

// 模拟数据，可以根据需要增加更多数据
const dummyRoles: Role[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  name: `角色 ${i + 1}`,
  description: `这是关于角色 ${i + 1} 的详细描述，用于测试响应式布局。`,
}));

const RolesPage: React.FC = () => {
  const { modal } = App.useApp();
  const screens = useBreakpoint(); // 获取屏幕断点

  const handleDelete = (id: string) => {
    modal.confirm({
      title: '确定要删除此角色吗？',
      content: '删除后将无法恢复！',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        // 实际项目中这里会调用API删除角色
        message.success('角色删除成功！');
      },
      onCancel() {
        message.info('取消删除。');
      },
    });
  };

  // 模拟 fetchData 函数，适配 RichTable 的接口
  const fetchRoles = useCallback(async (params: any) => {
    let filtered = dummyRoles;

    // 搜索
    if (params.search) {
      const lowerCaseSearch = params.search.toLowerCase();
      filtered = filtered.filter(role =>
        role.name.toLowerCase().includes(lowerCaseSearch) ||
        role.description.toLowerCase().includes(lowerCaseSearch)
      );
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


  const columns: ColumnsType<Role> = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      sorter: true, // 启用 RichTable 的排序
      width: 150,
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      responsive: ['md'], // 在中等屏幕及以上显示
    },
    {
      title: '关联用户数量',
      dataIndex: 'associatedUsers',
      key: 'associatedUsers',
      width: 120,
      render: () => Math.floor(Math.random() * 100), // Dummy count
      responsive: ['lg'], // 在大屏幕及以上显示
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right', // 固定操作列
      render: (_, record) => (
        <Space size="small">
          <Link href={`/roles/${record.id}`}>
            <Button icon={<EditOutlined />} size="small">编辑</Button>
          </Link>
          {screens.md ? ( // 在中等屏幕及以上显示完整按钮
            <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} size="small">删除</Button>
          ) : ( // 在小屏幕上使用下拉菜单
            <Dropdown
              menu={{
                items: [
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
      <h1>角色列表</h1>
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }} direction={screens.md ? 'horizontal' : 'vertical'}>
        <Space direction={screens.md ? 'horizontal' : 'vertical'}>
          {/* RichTable 内部会处理搜索框 */}
        </Space>
        <Space>
          <Link href="/roles/new">
            <Button type="primary" icon={<PlusOutlined />}>新增角色</Button>
          </Link>
        </Space>
      </Space>
      <RichTable<Role>
        columns={columns}
        fetchData={fetchRoles}
        rowKey="id"
        searchPlaceholder="搜索角色名称或描述"
        initialSortBy="name"
        initialSortOrder="asc"
      />
    </div>
  );
};

export default RolesPage;