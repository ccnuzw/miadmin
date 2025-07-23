'use client';
import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Space } from 'antd';
import { Pie, Area, DualAxes, Column, Bar, Waterfall, Histogram, Box, Heatmap, Scatter, Radar, Gauge, Liquid, Funnel, Line } from '@ant-design/charts';

const { Title } = Typography;

const ComponentShowcasePage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Dummy Data for Charts

  // Pie & Donut Chart Data
  const pieData = [
    { type: '分类一', value: 27 },
    { type: '分类二', value: 25 },
    { type: '分类三', value: 18 },
    { type: '分类四', value: 15 },
    { type: '分类五', value: 10 },
  ];

  // Area Chart Data
  const areaData = [
    { year: '1991', value: 3, type: '系列一' },
    { year: '1992', value: 4, type: '系列一' },
    { year: '1993', value: 3.5, type: '系列一' },
    { year: '1994', value: 5, type: '系列一' },
    { year: '1995', value: 4.9, type: '系列一' },
    { year: '1996', value: 6, type: '系列一' },
    { year: '1997', value: 7, type: '系列一' },
    { year: '1998', value: 9, type: '系列一' },
    { year: '1999', value: 13, type: '系列一' },
    { year: '1991', value: 2, type: '系列二' },
    { year: '1992', value: 3, type: '系列二' },
    { year: '1993', value: 4.5, type: '系列二' },
    { year: '1994', value: 3, type: '系列二' },
    { year: '1995', value: 2.9, type: '系列二' },
    { year: '1996', value: 5, type: '系列二' },
    { year: '1997', value: 6, type: '系列二' },
    { year: '1998', value: 7, type: '系列二' },
    { year: '1999', value: 10, type: '系列二' },
  ];

  // DualAxes Data
  const dualAxesData = [
    { time: '10:10', call: 4, waiting: 2, people: 2 },
    { time: '10:15', call: 2, waiting: 6, people: 3 },
    { time: '10:20', call: 13, waiting: 2, people: 5 },
    { time: '10:25', call: 9, waiting: 9, people: 1 },
    { time: '10:30', call: 5, waiting: 2, people: 3 },
    { time: '10:35', call: 8, waiting: 2, people: 1 },
    { time: '10:40', call: 13, waiting: 1, people: 2 },
  ];

  // Column Data (for Column, Bar, GroupedColumn, StackedColumn, GroupedBar, StackedBar)
  const columnData = [
    { name: '伦敦', '月份': '一月', '月均降雨量': 18.9 },
    { name: '伦敦', '月份': '二月', '月均降雨量': 28.8 },
    { name: '伦敦', '月份': '三月', '月均降雨量': 39.3 },
    { name: '伦敦', '月份': '四月', '月均降雨量': 81.4 },
    { name: '伦敦', '月份': '五月', '月均降雨量': 47 },
    { name: '伦敦', '月份': '六月', '月均降雨量': 20.3 },
    { name: '伦敦', '月份': '七月', '月均降雨量': 24 },
    { name: '伦敦', '月份': '八月', '月均降雨量': 35.6 },
    { name: '柏林', '月份': '一月', '月均降雨量': 12.4 },
    { name: '柏林', '月份': '二月', '月均降雨量': 23.2 },
    { name: '柏林', '月份': '三月', '月均降雨量': 34.5 },
    { name: '柏林', '月份': '四月', '月均降雨量': 99.7 },
    { name: '柏林', '月份': '五月', '月均降雨量': 52.6 },
    { name: '柏林', '月份': '六月', '月均降雨量': 35.5 },
    { name: '柏林', '月份': '七月', '月均降雨量': 37.4 },
    { name: '柏林', '月份': '八月', '月均降雨量': 42.4 },
  ];

  // Waterfall Data
  const waterfallData = [
    { type: '开始', value: 0 },
    { type: '收入', value: 1000 },
    { type: '支出一', value: -300 },
    { type: '支出二', value: -200 },
    { type: '结余', value: 500 },
  ];

  // Histogram Data
  const histogramData = [
    { value: 1.2 }, { value: 3.4 }, { value: 5.1 }, { value: 2.3 }, { value: 6.7 },
    { value: 8.9 }, { value: 4.5 }, { value: 7.2 }, { value: 0.5 }, { value: 9.1 },
    { value: 2.8 }, { value: 5.6 }, { value: 7.8 }, { value: 1.9 }, { value: 6.3 },
  ];

  // Box Plot Data
  const boxData = [
    { x: '类别一', y: [76, 80, 84, 89, 96] },
    { x: '类别二', y: [56, 60, 64, 69, 76] },
    { x: '类别三', y: [36, 40, 44, 49, 56] },
  ];

  // Heatmap Data
  const heatmapData = [
    { name: '一月', group: 'A', value: 10 },
    { name: '一月', group: 'B', value: 20 },
    { name: '一月', group: 'C', value: 30 },
    { name: '二月', group: 'A', value: 15 },
    { name: '二月', group: 'B', value: 25 },
    { name: '二月', group: 'C', value: 35 },
  ];

  // Bubble Data
  const bubbleData = [
    { x: 10, y: 20, size: 5, type: '类型A' },
    { x: 15, y: 25, size: 8, type: '类型A' },
    { x: 20, y: 15, size: 10, type: '类型B' },
    { x: 25, y: 10, size: 7, type: '类型B' },
  ];

  // Radar Data
  const radarData = [
    { item: '设计', a: 70, b: 30 },
    { item: '开发', a: 60, b: 70 },
    { item: '市场', a: 50, b: 60 },
    { item: '支持', a: 40, b: 50 },
    { item: '销售', a: 60, b: 70 },
    { item: '管理', a: 50, b: 60 },
  ];

  // Gauge Data
  const gaugeData = { value: 0.75 };

  // Liquid Data
  const liquidData = 0.6;

  // Funnel Data
  const funnelData = [
    { stage: '访问', value: 100000 },
    { stage: '注册', value: 80000 },
    { stage: '购买', value: 60000 },
    { stage: '支付', value: 40000 },
  ];

  // Chart Configurations

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    interactions: [{
      type: 'pie-legend-active',
    }, {
      type: 'element-active',
    }],
    autoFit: true,
    height: 300,
  };

  const donutConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.6,
    interactions: [{
      type: 'pie-legend-active',
    }, {
      type: 'element-active',
    }],
    autoFit: true,
    height: 300,
  };

  const areaConfig = {
    data: areaData,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    autoFit: true,
    height: 300,
  };

  const dualAxesConfig = {
    data: [dualAxesData, dualAxesData],
    xField: 'time',
    yField: ['call', 'people'],
    geometryOptions: [
      { geometry: 'column', color: '#5B8FF9' },
      { geometry: 'line', color: '#5AD8A6' },
    ],
    autoFit: true,
    height: 300,
  };

  const groupedColumnConfig = {
    data: columnData,
    xField: '月份',
    yField: '月均降雨量',
    isGroup: true,
    seriesField: 'name',
    autoFit: true,
    height: 300,
  };

  const stackedColumnConfig = {
    data: columnData,
    xField: '月份',
    yField: '月均降雨量',
    isStack: true,
    seriesField: 'name',
    autoFit: true,
    height: 300,
  };

  const groupedBarConfig = {
    data: columnData,
    xField: '月均降雨量',
    yField: '月份',
    isGroup: true,
    seriesField: 'name',
    autoFit: true,
    height: 300,
  };

  const stackedBarConfig = {
    data: columnData,
    xField: '月均降雨量',
    yField: '月份',
    isStack: true,
    seriesField: 'name',
    autoFit: true,
    height: 300,
  };

  const waterfallConfig = {
    data: waterfallData,
    xField: 'type',
    yField: 'value',
    autoFit: true,
    height: 300,
  };

  const histogramConfig = {
    data: histogramData,
    binField: 'value',
    binWidth: 1,
    autoFit: true,
    height: 300,
  };

  const boxConfig = {
    data: boxData,
    xField: 'x',
    yField: 'y',
    autoFit: true,
    height: 300,
  };

  const heatmapConfig = {
    data: heatmapData,
    xField: 'name',
    yField: 'group',
    colorField: 'value',
    autoFit: true,
    height: 300,
  };

  const bubbleConfig = {
    data: bubbleData,
    xField: 'x',
    yField: 'y',
    sizeField: 'size',
    colorField: 'type',
    autoFit: true,
    height: 300,
  };

  const radarConfig = {
    data: radarData,
    xField: 'item',
    yField: 'a',
    seriesField: 'name',
    meta: {
      score: { min: 0, max: 100 },
    },
    line: { visible: true },
    point: { visible: true },
    area: { visible: false },
    autoFit: true,
    height: 300,
  };

  /*
  const gaugeConfig = {
    percent: gaugeData.value,
    range: { ticks: [0, 1], color: 'l(0) 0:#BEE5F9 1:#5B8FF9' },
    indicator: { pointer: { style: { stroke: '#D0D0D0' } }, pin: { style: { stroke: '#D0D0D0' } } },
    statistic: { title: { formatter: () => `完成率` }, content: { formatter: () => `${(gaugeData.value * 100).toFixed(0)}%` } },
    autoFit: true,
    height: 300,
  };
  */

  const liquidConfig = {
    percent: liquidData,
    outline: { border: 4, distance: 8 },
    wave: { length: 128 },
    autoFit: true,
    height: 300,
  };

  const funnelConfig = {
    data: funnelData,
    xField: 'stage',
    yField: 'value',
    autoFit: true,
    height: 300,
  };

  return (
    <div>
      <Title level={2}>组件展示</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="饼图">
            {isClient && <Pie {...pieConfig} />}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="环图">
            {isClient && <Pie {...donutConfig} />}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24}>
          <Card title="面积图">
            {isClient && <Area {...areaConfig} />}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24}>
          <Card title="双 Y 轴图">
            {/* {isClient && <DualAxes {...dualAxesConfig} />} */}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="分组柱状图">
            {isClient && <Column {...groupedColumnConfig} />}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="堆叠柱状图">
            {isClient && <Column {...stackedColumnConfig} />}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="分组条形图">
            {isClient && <Bar {...groupedBarConfig} />}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="堆叠条形图">
            {isClient && <Bar {...stackedBarConfig} />}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="瀑布图">
            {isClient && <Waterfall {...waterfallConfig} />}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="直方图">
            {isClient && <Histogram {...histogramConfig} />}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="箱线图">
            {isClient && <Box {...boxConfig} />}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="热力图">
            {isClient && <Heatmap {...heatmapConfig} />}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="气泡图">
            {isClient && <Scatter {...bubbleConfig} />}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="雷达图">
            {isClient && <Radar {...radarConfig} />}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Card title="仪表盘 (Gauge)">
            {/* {isClient && <Gauge {...gaugeConfig} />} */}
            <div style={{ textAlign: 'center', padding: '20px 0' }}>仪表盘组件暂时无法显示</div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="水波图">
            {isClient && <Liquid {...liquidConfig} />}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="漏斗图">
            {isClient && <Funnel {...funnelConfig} />}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ComponentShowcasePage;