'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Select, Space, Card, message, Typography, TreeSelect } from 'antd';
import { useRouter } from 'next/navigation';
import { MOCK_ORGANIZATION_STRUCTURE_TREE_DATA, OrgTreeNode } from '@/lib/constants';

const { Option } = Select;
const { Title } = Typography;

// Dummy data for roles
const dummyRoles = ['管理员', '编辑', '普通用户', '访客'];

// Helper function to get all organization nodes (orgUnits and departments) for TreeSelect
const getOrganizationTreeData = (nodes: OrgTreeNode[]) => {
  return nodes.map(node => {
    const treeNode: any = {
      key: node.key,
      value: node.key,
      title: node.title,
      // All nodes (orgUnits and departments) are now selectable
    };

    if (node.children && node.children.length > 0) {
      treeNode.children = getOrganizationTreeData(node.children);
    }

    return treeNode;
  });
};

const NewUserPage: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const organizationTreeData = getOrganizationTreeData(MOCK_ORGANIZATION_STRUCTURE_TREE_DATA);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call to create new user
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('用户创建成功！');
      router.push('/users');
    } catch (error) {
      message.error('用户创建失败！');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={2}>新增用户</Title>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
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
          <Form.Item label="初始密码" name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: '请确认您的密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="角色" name="roles">
            <Select mode="multiple" placeholder="选择角色">
              {dummyRoles.map(role => (
                <Option key={role} value={role}>{role}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="所属部门" name="departmentIds">
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              styles={{ popup: { root: { maxHeight: 400, overflow: 'auto' } } }}
              treeData={organizationTreeData}
              placeholder="请选择所属部门"
              treeDefaultExpandAll
              multiple
              treeNodeFilterProp="title"
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                提交
              </Button>
              <Button onClick={() => router.push('/users')}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default NewUserPage;