'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Space, Card, message, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

const SettingsPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Dummy initial values
  const initialValues = {
    systemName: 'MiAdmin',
    recordInfo: '备案号：粤ICP备XXXXXXX号',
    copyrightInfo: '© 2023 MiAdmin. All rights reserved.',
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('通用设置保存成功！');
    } catch (error) {
      message.error('通用设置保存失败！');
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
      <Title level={2}>通用设置</Title>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={initialValues}
        >
          <Form.Item label="系统名称" name="systemName" rules={[{ required: true, message: '请输入系统名称!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Logo 上传" name="logo" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="备案信息" name="recordInfo">
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item label="版权信息" name="copyrightInfo">
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                保存
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SettingsPage;