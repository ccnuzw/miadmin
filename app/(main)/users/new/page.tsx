'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Select, Space, Card, message, Typography, TreeSelect, Layout, theme } from 'antd'; // 导入 theme
import { useRouter } from 'next/navigation';
import { MOCK_ORGANIZATION_STRUCTURE_TREE_DATA, OrgTreeNode } from '@/lib/constants';

const { Option } = Select;
const { Title } = Typography;
const { Sider, Content } = Layout;

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
  const { token: { colorBgContainer, colorBgLayout, colorBorder } } = theme.useToken(); // 获取主题 token

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
    <Layout style={{ minHeight: '100%', background: colorBgLayout }}> {/* 使用 colorBgLayout */}
      <Content style={{ padding: '16px 24px', background: colorBgContainer }}> {/* 使用 colorBgContainer */}
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
            
            {/* 将 TreeSelect 包裹在 Form.Item 中 */}
            <Form.Item label="所属部门" name="departmentIds">
              <TreeSelect
                showSearch
                style={{ width: '100%' }}
                treeData={organizationTreeData}
                placeholder="请选择所属部门"
                treeDefaultExpandAll
                multiple
                treeNodeFilterProp="title"
                // 移除 onChange 和 value，让 Form.Item 自动管理
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
      </Content>
      <Sider width={300} style={{ background: colorBgContainer, borderLeft: `1px solid ${colorBorder}`, padding: 16 }}> {/* 使用 colorBgContainer 和 colorBorder */}
        <Title level={4}>选择所属部门</Title>
      </Sider>
    </Layout>
  );
};

export default NewUserPage;