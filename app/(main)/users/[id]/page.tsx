'use client';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Switch, Space, Card, message, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';

const { Option } = Select;
const { Title } = Typography;

// Dummy data for users and roles
const dummyUsers: User[] = [
  { id: '1', username: 'admin', email: 'admin@example.com', role: '管理员' },
  { id: '2', username: 'user1', email: 'user1@example.com', role: '普通用户' },
  { id: '3', username: 'editor1', email: 'editor1@example.com', role: '编辑' },
];

const dummyRoles = ['管理员', '编辑', '普通用户', '访客'];

const UserDetailPage: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const userId = router.query?.id; // Get ID from URL

  useEffect(() => {
    if (userId) {
      // In a real application, fetch user data from API
      const user = dummyUsers.find(u => u.id === userId);
      if (user) {
        setCurrentUser(user);
        form.setFieldsValue(user);
      } else {
        message.error('用户未找到！');
        router.push('/users');
      }
    }
  }, [userId, form, router]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call to update user
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('用户更新成功！');
      router.push('/users');
    } catch (error) {
      message.error('用户更新失败！');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      // Simulate API call to reset password
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('密码重置成功！');
    } catch (error) {
      message.error('密码重置失败！');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser && userId) {
    return <div>加载中...</div>; // Or a loading spinner
  }

  return (
    <div>
      <Title level={2}>用户详情/编辑</Title>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={currentUser || {}}
        >
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email', message: '请输入有效邮箱!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="角色" name="role">
            <Select placeholder="选择角色">
              {dummyRoles.map(role => (
                <Option key={role} value={role}>{role}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="状态" name="status" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                保存
              </Button>
              <Button onClick={() => router.push('/users')}>
                取消
              </Button>
              <Button onClick={handleResetPassword} loading={loading}>
                重置密码
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserDetailPage;