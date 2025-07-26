'use client';
'use client';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Switch, Space, Card, message, Typography, TreeSelect } from 'antd';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';
import { MOCK_ORGANIZATION_STRUCTURE_TREE_DATA, OrgTreeNode } from '@/lib/constants';

const { Option } = Select;
const { Title } = Typography;

// Dummy data for users and roles
const dummyUsers: User[] = [
  { id: '1', username: 'admin', email: 'admin@example.com', roles: ['管理员'], phone: '13800138000', status: true, departmentIds: ['dept-hq-finance'] },
  { id: '2', username: 'user1', email: 'user1@example.com', roles: ['普通用户'], phone: '13912345678', status: true, departmentIds: ['dept-bj-sales'] },
  { id: '3', username: 'editor1', email: 'editor1@example.com', roles: ['编辑'], phone: '13787654321', status: false, departmentIds: ['dept-north-rd-fe'] },
];

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

const UserDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const userId = React.use(params).id; // Get ID from URL params

  const organizationTreeData = getOrganizationTreeData(MOCK_ORGANIZATION_STRUCTURE_TREE_DATA);

  useEffect(() => {
    if (userId) {
      // In a real application, fetch user data from API
      const user = dummyUsers.find(u => u.id === userId);
      if (user) {
        setCurrentUser(user);
        form.setFieldsValue({ ...user, departmentIds: user.departmentIds || [] });
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

  // Only render the form if currentUser is available
  return (
    <div>
      <Title level={2}>用户详情/编辑</Title>
      {currentUser && (
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={currentUser}
            key={currentUser?.id} // Add key to force remount when currentUser changes
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
      )}
    </div>
  );
};

export default UserDetailPage;