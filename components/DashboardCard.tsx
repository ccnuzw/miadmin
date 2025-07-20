import React from 'react';
import { Card, Statistic } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

interface DashboardCardProps {
  title: string;
  value: string | number;
  prefixIcon?: React.ReactNode;
  suffixText?: string;
  valueStyle?: React.CSSProperties;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, prefixIcon, suffixText, valueStyle }) => {
  return (
    <Card>
      <Statistic
        title={title}
        value={value}
        precision={0}
        valueStyle={valueStyle}
        prefix={prefixIcon}
        suffix={suffixText}
      />
    </Card>
  );
};

export default DashboardCard;
