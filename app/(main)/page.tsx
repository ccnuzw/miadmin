'use client';
import { Card, Col, Row, Statistic, Typography, List, Button, Space, Segmented, Tabs } from 'antd';
import React, { useState } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, PlusOutlined, SolutionOutlined, TeamOutlined, SafetyOutlined, SettingOutlined } from '@ant-design/icons';
import { Line, Pie, Column } from '@ant-design/charts';
import Link from 'next/link';

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  const [isClient, setIsClient] = React.useState(false);
  const [activeTabKey, setActiveTabKey] = useState('1'); // 用于控制 Segmented 的选中状态

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Dummy data for charts
  const userData = [
    { year: '2023-01', value: 300 },
    { year: '2023-02', value: 450 },
    { year: '2023-03', value: 600 },
    { year: '2023-04', value: 750 },
    { year: '2023-05', value: 900 },
    { year: '2023-06', value: 1100 },
  ];

  const roleData = [
    { type: '管理员', value: 27 },
    { type: '编辑', value: 25 },
    { type: '普通用户', value: 18 },
    { type: '访客', value: 15 },
    { type: '其他', value: 10 },
  ];

  const operationData = [
    { type: '登录', value: 120 },
    { type: '新增', value: 80 },
    { type: '修改', value: 60 },
    { type: '删除', value: 30 },
    { type: '查询', value: 200 },
  ];

  // Chart configurations
  const userGrowthConfig = {
    data: userData,
    xField: 'year',
    yField: 'value',
    point: { size: 5, shape: 'diamond' },
    tooltip: { showMarkers: false },
    label: { style: { fill: '#aaa' } },
  };

  const roleDistributionConfig = {
    appendPadding: 10,
    data: roleData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      content: ({ type, value }) => `${type} ${value}`,
    },
    interactions: [{
      type: 'pie-legend-active',
    }, {
      type: 'element-active',
    }],
  };

  const operationTypeConfig = {
    data: operationData,
    xField: 'type',
    yField: 'value',
    columnWidthRatio: 0.6, // Adjust column width
    label: {
      style: {
        fill: '#333333', // Change label color for better visibility
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: { alias: '操作类型' },
      value: { alias: '数量' },
    },
  };

  // Dummy data for latest operation logs
  const latestLogs = [
    { id: 1, user: 'Admin', action: '登录系统', time: '2023-07-20 10:30:00' },
    { id: 2, user: 'Editor', action: '修改文章《Next.js 入门》', time: '2023-07-20 10:25:15' },
    { id: 3, user: 'UserA', action: '注册新用户', time: '2023-07-20 10:20:00' },
    { id: 4, user: 'Admin', action: '删除旧数据', time: '2023-07-20 10:15:30' },
  ];

  const tabContent = {
    '1': <p>这是 Tab 1 的内容。</p>,
    '2': <p>这是 Tab 2 的内容。</p>,
    '3': <p>这是 Tab 3 的内容。</p>,
  };

  return (
    <div>
      <Title level={2}>仪表盘</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="用户总数"
              value={12345}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<UserOutlined />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="今日新增用户"
              value={56}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<PlusOutlined />}
              suffix="人"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="待处理事项"
              value={12}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<SolutionOutlined />}
              suffix="项"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="活跃用户数"
              value={893}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="人"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="用户增长趋势">
            {isClient && <Line {...userGrowthConfig} />}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="角色分布">
            {isClient && <Pie {...roleDistributionConfig} />}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="操作类型统计">
            {isClient && <Column {...operationTypeConfig} />}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="多页卡片示例"
            extra={
              <Segmented
                options={[
                  { label: 'Tab 1', value: '1' },
                  { label: 'Tab 2', value: '2' },
                  { label: 'Tab 3', value: '3' },
                ]}
                value={activeTabKey}
                onChange={(value) => setActiveTabKey(value as string)}
              />
            }
          >
            {tabContent[activeTabKey]}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="最新操作日志">
            <List
              itemLayout="horizontal"
              dataSource={latestLogs}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<span>{item.user} {item.action}</span>}
                    description={item.time}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="常用功能快捷入口">
            <Space wrap>
              <Link href="/users"><Button type="primary" icon={<UserOutlined />}>用户管理</Button></Link>
              <Link href="/roles"><Button type="primary" icon={<TeamOutlined />}>角色管理</Button></Link>
              <Link href="/permissions"><Button type="primary" icon={<SafetyOutlined />}>权限管理</Button></Link>
              <Link href="/settings"><Button type="primary" icon={<SettingOutlined />}>系统设置</Button></Link>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;