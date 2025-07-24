'use client';

import React, { useCallback, useState } from 'react';
import { Card, Typography, Space, Alert, Tag, Button, Dropdown, Menu, Grid } from 'antd';
import RichTable from '@/components/Table/RichTable';
import { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

interface UserData {
  id: string;
  name: string;
  age: number;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

interface OrderData {
  orderId: string;
  userId: string;
  product: string;
  amount: number;
  orderDate: string;
}

const ListShowcasePage: React.FC = () => {
  const [selectedUserIds, setSelectedUserIds] = useState<React.Key[]>([]);
  const screens = useBreakpoint();

  const fetchUsers = useCallback(async (params: any) => {
    const query = new URLSearchParams({
      page: params.page.toString(),
      pageSize: params.pageSize.toString(),
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.sortOrder && { sortOrder: params.sortOrder }),
      ...(params.search && { search: params.search }),
      ...(params.filters?.status && { status: params.filters.status }),
    }).toString();

    const res = await fetch(`/api/list-data?${query}`);
    const data = await res.json();
    return { data: data.data, total: data.total };
  }, []);

  const fetchOrders = useCallback(async (params: any) => {
    // Simulate fetching orders based on selected user IDs
    // In a real application, you'd pass selectedUserIds to your API
    const allOrders: OrderData[] = Array.from({ length: 200 }, (_, i) => ({
      orderId: `order-${i + 1}`,
      userId: `user-${(i % 100) + 1}`,
      product: `Product ${i % 10}`,
      amount: parseFloat((Math.random() * 1000).toFixed(2)),
      orderDate: new Date(Date.now() - i * 86400 * 1000).toISOString(),
    }));

    let filteredOrders = allOrders;

    if (selectedUserIds.length > 0) {
      filteredOrders = allOrders.filter(order => selectedUserIds.includes(order.userId));
    }

    // Apply search, sort, and pagination for orders (simplified for demo)
    const query = new URLSearchParams({
      page: params.page.toString(),
      pageSize: params.pageSize.toString(),
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.sortOrder && { sortOrder: params.sortOrder }),
      ...(params.search && { search: params.search }),
    }).toString();

    // Simplified filtering/sorting for demo, RichTable handles it via params
    // For a real API, you'd send these params to the backend

    const total = filteredOrders.length;
    const startIndex = (params.page - 1) * params.pageSize;
    const endIndex = Math.min(startIndex + params.pageSize, total);
    const paginatedData = filteredOrders.slice(startIndex, endIndex);

    return { data: paginatedData, total };
  }, [selectedUserIds]);

  const userColumns: ColumnsType<UserData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      width: 150,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: true,
      width: 80,
      responsive: ['md'], // 在中等屏幕及以上显示
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      width: 200,
      responsive: ['lg'], // 在大屏幕及以上显示
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      width: 120,
      render: (status: 'active' | 'inactive' | 'pending') => {
        let color = 'geekblue';
        if (status === 'inactive') {
          color = 'volcano';
        } else if (status === 'active') {
          color = 'green';
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      width: 180,
      render: (date: string) => new Date(date).toLocaleString(),
      responsive: ['lg'], // 在大屏幕及以上显示
    },
    {
      title: '操作',
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button icon={<EditOutlined />} size="small">编辑</Button>
          {screens.md ? (
            <Button danger icon={<DeleteOutlined />} size="small">删除</Button>
          ) : (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'delete',
                    label: (
                      <Space>
                        <DeleteOutlined />
                        删除
                      </Space>
                    ),
                    danger: true,
                  },
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

  const orderColumns: ColumnsType<OrderData> = [
    {
      title: '订单ID',
      dataIndex: 'orderId',
      key: 'orderId',
      sorter: true,
      width: 120,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      sorter: true,
      width: 120,
      responsive: ['md'], // 在中等屏幕及以上显示
    },
    {
      title: '产品',
      dataIndex: 'product',
      key: 'product',
      sorter: true,
      width: 150,
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true,
      width: 100,
      render: (amount: number) => `¥${amount.toFixed(2)}`,
      responsive: ['md'], // 在中等屏幕及以上显示
    },
    {
      title: '订单日期',
      dataIndex: 'orderDate',
      key: 'orderDate',
      sorter: true,
      width: 180,
      render: (date: string) => new Date(date).toLocaleString(),
      responsive: ['lg'], // 在大屏幕及以上显示
    },
  ];

  const userFilterOptions = [
    {
      key: 'status',
      label: '状态',
      options: [
        { value: 'active', label: '活跃', color: 'green' },
        { value: 'inactive', label: '不活跃', color: 'volcano' },
        { value: 'pending', label: '待定', color: 'geekblue' },
      ],
    },
  ];

  return (
    <div className="list-showcase-page">
      <Title level={2}>列表展示与联动</Title>
      <Paragraph>
        此页面展示了两个 <Typography.Text code>RichTable</Typography.Text> 组件的用法，并实现了列表联动功能。
        上方用户列表的选择会影响下方订单列表的数据展示。
      </Paragraph>

      <Card title="用户列表" style={{ marginBottom: 24 }}>
        <RichTable<UserData>
          columns={userColumns}
          fetchData={fetchUsers}
          rowKey="id"
          searchPlaceholder="搜索用户姓名或邮箱"
          filterOptions={userFilterOptions}
          onRowSelect={(keys) => setSelectedUserIds(keys)}
          initialSortBy="createdAt"
          initialSortOrder="desc"
        />
      </Card>

      <Card title="用户订单列表" style={{ marginBottom: 24 }}>
        {selectedUserIds.length > 0 ? (
          <Alert
            message={`当前显示 ${selectedUserIds.length} 位用户的订单`}
            type="info"
            showIcon
            closable
            style={{ marginBottom: 16 }}
          />
        ) : (
          <Alert
            message="请在上方用户列表中选择用户以查看其订单"
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <RichTable<OrderData>
          columns={orderColumns}
          fetchData={fetchOrders}
          rowKey="orderId"
          searchPlaceholder="搜索产品"
          // 订单列表的初始排序和搜索可以根据需求设置
          initialSortBy="orderDate"
          initialSortOrder="desc"
        />
      </Card>
    </div>
  );
};

export default ListShowcasePage;