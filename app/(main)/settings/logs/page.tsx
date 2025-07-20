'use client';
import React, { useState } from 'react';
import { Table, Input, Space, Tabs, Typography } from 'antd';
import type { TableProps } from 'antd';

const { Search } = Input;
const { Title } = Typography;

interface OperationLog {
  id: string;
  operator: string;
  time: string;
  module: string;
  content: string;
  ip: string;
}

interface LoginLog {
  id: string;
  username: string;
  loginTime: string;
  loginIp: string;
  status: '成功' | '失败';
}

const dummyOperationLogs: OperationLog[] = [
  { id: '1', operator: 'admin', time: '2023-07-20 10:30:00', module: '用户管理', content: '编辑用户：user1', ip: '192.168.1.1' },
  { id: '2', operator: 'editor1', time: '2023-07-20 10:25:15', module: '文章管理', content: '发布文章：Next.js 入门', ip: '192.168.1.2' },
  { id: '3', operator: 'user1', time: '2023-07-20 10:20:00', module: '个人设置', content: '修改头像', ip: '192.168.1.3' },
  { id: '4', operator: 'admin', time: '2023-07-20 10:15:30', module: '系统设置', content: '备份数据库', ip: '192.168.1.1' },
  { id: '5', operator: 'admin', time: '2023-07-20 09:00:00', module: '登录', content: '用户登录', ip: '192.168.1.1' },
];

const dummyLoginLogs: LoginLog[] = [
  { id: '1', username: 'admin', loginTime: '2023-07-20 10:30:00', loginIp: '192.168.1.1', status: '成功' },
  { id: '2', username: 'editor1', loginTime: '2023-07-20 10:25:00', loginIp: '192.168.1.2', status: '成功' },
  { id: '3', username: 'user1', loginTime: '2023-07-20 10:20:00', loginIp: '192.168.1.3', status: '成功' },
  { id: '4', username: 'guest', loginTime: '2023-07-20 10:15:00', loginIp: '192.168.1.4', status: '失败' },
  { id: '5', username: 'admin', loginTime: '2023-07-20 09:00:00', loginIp: '192.168.1.1', status: '成功' },
];

const LogsPage: React.FC = () => {
  const [operationLogs, setOperationLogs] = useState<OperationLog[]>(dummyOperationLogs);
  const [loginLogs, setLoginLogs] = useState<LoginLog[]>(dummyLoginLogs);
  const [activeTab, setActiveTab] = useState<string>('operationLogs');

  const handleOperationSearch = (value: string) => {
    const filtered = dummyOperationLogs.filter(log =>
      log.operator.includes(value) ||
      log.module.includes(value) ||
      log.content.includes(value) ||
      log.ip.includes(value)
    );
    setOperationLogs(filtered);
  };

  const handleLoginSearch = (value: string) => {
    const filtered = dummyLoginLogs.filter(log =>
      log.username.includes(value) ||
      log.loginIp.includes(value)
    );
    setLoginLogs(filtered);
  };

  const operationColumns: TableProps<OperationLog>['columns'] = [
    { title: '操作人', dataIndex: 'operator', key: 'operator', sorter: (a, b) => a.operator.localeCompare(b.operator) },
    { title: '操作时间', dataIndex: 'time', key: 'time', sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime() },
    { title: '操作模块', dataIndex: 'module', key: 'module', filters: Array.from(new Set(dummyOperationLogs.map(log => log.module))).map(module => ({ text: module, value: module })), onFilter: (value, record) => record.module.includes(value as string) },
    { title: '操作内容', dataIndex: 'content', key: 'content' },
    { title: 'IP地址', dataIndex: 'ip', key: 'ip' },
  ];

  const loginColumns: TableProps<LoginLog>['columns'] = [
    { title: '用户名', dataIndex: 'username', key: 'username', sorter: (a, b) => a.username.localeCompare(b.username) },
    { title: '登录时间', dataIndex: 'loginTime', key: 'loginTime', sorter: (a, b) => new Date(a.loginTime).getTime() - new Date(b.loginTime).getTime() },
    { title: '登录IP', dataIndex: 'loginIp', key: 'loginIp' },
    { title: '状态', dataIndex: 'status', key: 'status', filters: [{ text: '成功', value: '成功' }, { text: '失败', value: '失败' }], onFilter: (value, record) => record.status === value },
  ];

  const items = [
    {
      key: 'operationLogs',
      label: '操作日志',
      children: (
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="搜索操作人、模块、内容或IP"
            onSearch={handleOperationSearch}
            style={{ width: 300 }}
            allowClear
          />
          <Table columns={operationColumns} dataSource={operationLogs} rowKey="id" pagination={{ pageSize: 10 }} scroll={{ x: 'max-content' }} />
        </Space>
      ),
    },
    {
      key: 'loginLogs',
      label: '登录日志',
      children: (
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="搜索用户名或IP"
            onSearch={handleLoginSearch}
            style={{ width: 300 }}
            allowClear
          />
          <Table columns={loginColumns} dataSource={loginLogs} rowKey="id" pagination={{ pageSize: 10 }} scroll={{ x: 'max-content' }} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>日志管理</Title>
      <Tabs defaultActiveKey="operationLogs" activeKey={activeTab} onChange={setActiveTab} items={items} />
    </div>
  );
};

export default LogsPage;
