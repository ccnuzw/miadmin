'use client';
import React, { useState } from 'react';
import { Table, Input, Space, Tabs, Typography, Grid } from 'antd';
import type { TableProps } from 'antd';
import GeneralTable from '@/components/Table/GeneralTable'; // 导入 GeneralTable

const { Search } = Input;
const { Title } = Typography;
const { useBreakpoint } = Grid;

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

const dummyOperationLogs: OperationLog[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  operator: `操作员${i % 5}`,
  time: new Date(Date.now() - i * 3600 * 1000).toLocaleString(),
  module: ['用户管理', '文章管理', '系统设置', '权限管理'][i % 4],
  content: `执行了操作 ${i + 1} 的内容描述`,
  ip: `192.168.1.${i % 255}`,
}));

const dummyLoginLogs: LoginLog[] = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  username: `用户${i % 5}`,
  loginTime: new Date(Date.now() - i * 3600 * 1000).toLocaleString(),
  loginIp: `192.168.1.${i % 255}`,
  status: i % 3 === 0 ? '失败' : '成功',
}));

const LogsPage: React.FC = () => {
  const screens = useBreakpoint();
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
    {
      title: '操作人',
      dataIndex: 'operator',
      key: 'operator',
      sorter: (a, b) => a.operator.localeCompare(b.operator),
      width: 120
    },
    {
      title: '操作时间',
      dataIndex: 'time',
      key: 'time',
      sorter: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
      width: 180
    },
    {
      title: '操作模块',
      dataIndex: 'module',
      key: 'module',
      width: 120,
      responsive: ['md'],
      filters: Array.from(new Set(dummyOperationLogs.map(log => log.module))).map(module => ({ text: module, value: module })),
      onFilter: (value, record) => record.module.includes(value as string)
    },
    {
      title: '操作内容',
      dataIndex: 'content',
      key: 'content',
      width: 250,
      responsive: ['lg']
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
      width: 120,
      responsive: ['md']
    },
  ];

  const loginColumns: TableProps<LoginLog>['columns'] = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
      width: 120
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      key: 'loginTime',
      sorter: (a, b) => new Date(a.loginTime).getTime() - new Date(b.loginTime).getTime(),
      width: 180
    },
    {
      title: '登录IP',
      dataIndex: 'loginIp',
      key: 'loginIp',
      width: 150,
      responsive: ['md']
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      filters: [{ text: '成功', value: '成功' }, { text: '失败', value: '失败' }],
      onFilter: (value, record) => record.status === value
    },
  ];

  const items = [
    {
      key: 'operationLogs',
      label: '操作日志',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Search
              placeholder="搜索操作人、模块、内容或IP"
              onSearch={handleOperationSearch}
              style={{ width: screens.md ? 300 : '100%' }} // 宽度自适应
              allowClear
            />
          </div>
          <GeneralTable columns={operationColumns} dataSource={operationLogs} rowKey="id" pagination={{ pageSize: 10 }} />
        </>
      ),
    },
    {
      key: 'loginLogs',
      label: '登录日志',
      children: (
        <>
          <div style={{ marginBottom: 16 }}>
            <Search
              placeholder="搜索用户名或IP"
              onSearch={handleLoginSearch}
              style={{ width: screens.md ? 300 : '100%' }} // 宽度自适应
              allowClear
            />
          </div>
          <GeneralTable columns={loginColumns} dataSource={loginLogs} rowKey="id" pagination={{ pageSize: 10 }} />
        </>
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