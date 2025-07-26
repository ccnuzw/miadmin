
"use client";

import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useTheme, LayoutType } from '@/lib/theme-context';

const ThemeSettings: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { layout, setLayout } = useTheme();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLayoutChange = (e: any) => {
    setLayout(e.target.value as LayoutType);
  };

  return (
    <>
      <Button
        type="primary"
        icon={<SettingOutlined />}
        size="large"
        shape="circle"
        onClick={showDrawer}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 999,
        }}
      />
      <Drawer
        title="主题设置"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <h3>布局方式</h3>
          <Radio.Group onChange={handleLayoutChange} value={layout}>
            <Space direction="vertical">
              <Radio value="default">默认布局</Radio>
              <Radio value="classic">经典布局</Radio>
              <Radio value="single-column">单栏布局</Radio>
              <Radio value="two-column">双栏布局</Radio>
            </Space>
          </Radio.Group>
        </Space>
      </Drawer>
    </>
  );
};

export default ThemeSettings;
