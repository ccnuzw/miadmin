
'use client';
import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Typography, List, Button, Space, Progress, Tag, Timeline, Calendar, Avatar, Tooltip, Popconfirm, message } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, PlusOutlined, SolutionOutlined, TeamOutlined, SafetyOutlined, SettingOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Line, Pie, Column } from '@ant-design/charts';
import Link from 'next/link';
import dayjs from 'dayjs';

const { Title } = Typography;

const NewDashboardPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Dummy data for charts
  const salesData = [
    { month: '一月', value: 1200 },
    { month: '二月', value: 1500 },
    { month: '三月', value: 1800 },
    { month: '四月', value: 1600 },
    { month: '五月', value: 2000 },
    { month: '六月', value: 2300 },
    { month: '七月', value: 2500 },
  ];

  const categoryData = [
    { type: '电子产品', value: 40 },
    { type: '服装', value: 30 },
    { type: '家居', value: 20 },
    { type: '图书', value: 10 },
  ];

  const taskStatusData = [
    { status: '进行中', value: 60 },
    { status: '已完成', value: 30 },
    { status: '待开始', value: 10 },
  ];

  // Chart configurations
  const salesConfig = {
    data: salesData,
    xField: 'month',
    yField: 'value',
    point: { size: 5, shape: 'diamond' },
    tooltip: { showMarkers: false },
    label: { style: { fill: '#aaa' } },
  };

  const categoryConfig = {
    appendPadding: 10,
    data: categoryData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      content: ({ type, value }) => `${type} ${value}%`,
    },
    interactions: [{
      type: 'pie-legend-active',
    }, {
      type: 'element-active',
    }],
  };

  const taskConfig = {
    data: taskStatusData,
    xField: 'status',
    yField: 'value',
    columnWidthRatio: 0.6,
    label: {
      style: {
        fill: '#333333',
        opacity: 1,
      },
    },
  };

  // Dummy data for recent activities
  const recentActivities = [
    { id: 1, user: 'Admin', action: '更新了系统配置', time: '2023-07-21 14:30:00' },
    { id: 2, user: 'UserA', action: '提交了新的工单', time: '2023-07-21 14:25:15' },
    { id: 3, user: 'EditorB', action: '发布了文章《Ant Design 最佳实践》', time: '2023-07-21 14:20:00' },
    { id: 4, user: 'Admin', action: '审核通过了用户UserC的申请', time: '2023-07-21 14:15:30' },
  ];

  // Dummy data for todo list
  const todoList = [
    { id: 1, title: '完成项目报告', status: '进行中', deadline: '2023-07-25' },
    { id: 2, title: '安排团队会议', status: '待开始', deadline: '2023-07-22' },
    { id: 3, title: '优化数据库查询', status: '已完成', deadline: '2023-07-19' },
    { id: 4, title: '撰写用户手册', status: '进行中', deadline: '2023-07-30' },
  ];

  const onPanelChange = (value: dayjs.Dayjs, mode: string) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const handlePopconfirm = (action: string) => {
    message.success(`${action} 成功！`);
  };

  return (
    <div>
      <Title level={2}>新仪表盘</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="总销售额"
              value={88888}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="元"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="新用户注册"
              value={128}
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
              title="待处理工单"
              value={15}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<SolutionOutlined />}
              suffix="个"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="活跃用户比例"
              value={78.9}
              precision={1}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="月度销售趋势">
            {isClient && <Line {...salesConfig} />}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="产品类别销售占比">
            {isClient && <Pie {...categoryConfig} />}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="任务状态分布">
            {isClient && <Column {...taskConfig} />}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="项目进度">
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <Progress type="circle" percent={75} format={(percent) => `${percent}% 完成`} />
            </div>
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: '前端开发', percent: 80, status: 'active' },
                { title: '后端接口', percent: 60, status: 'exception' },
                { title: '数据库设计', percent: 90, status: 'success' },
              ]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={<Progress percent={item.percent} status={item.status as any} />}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="最新活动">
            <Timeline
              items={recentActivities.map(activity => ({
                children: (
                  <>
                    <p>{activity.user} {activity.action}</p>
                    <p style={{ fontSize: '12px', color: '#999' }}>{activity.time}</p>
                  </>
                ),
              }))}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="待办事项">
            <List
              itemLayout="horizontal"
              dataSource={todoList}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Tooltip title="标记为完成" key="mark-done">
                      <Popconfirm
                        title="确定标记为完成吗？"
                        onConfirm={() => handlePopconfirm('标记完成')}
                        okText="确定"
                        cancelText="取消"
                      >
                        <Button type="link" icon={<LikeOutlined />} />
                      </Popconfirm>
                    </Tooltip>,
                    <Tooltip title="查看详情" key="view-details">
                      <Button type="link" icon={<MessageOutlined />} />
                    </Tooltip>,
                  ]}
                >
                  <List.Item.Meta
                    title={item.title}
                    description={
                      <Space>
                        <Tag color={item.status === '进行中' ? 'blue' : item.status === '已完成' ? 'green' : 'orange'}>
                          {item.status}
                        </Tag>
                        <span>截止日期: {item.deadline}</span>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="日历">
            <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NewDashboardPage;
