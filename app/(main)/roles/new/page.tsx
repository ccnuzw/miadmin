'use client';
import React, { useState } from 'react';
import { Form, Input, Button, Space, Card, message, Typography, Tree, Checkbox } from 'antd';
import { useRouter } from 'next/navigation';

const { Title } = Typography;
const { TextArea } = Input;

// Dummy data for menu permissions (Tree data)
const treeData = [
  {
    title: '仪表盘',
    key: 'dashboard',
  },
  {
    title: '用户管理',
    key: 'user-management',
    children: [
      { title: '用户列表', key: 'user-list' },
      { title: '新增用户', key: 'user-add' },
      { title: '编辑用户', key: 'user-edit' },
      { title: '删除用户', key: 'user-delete' },
    ],
  },
  {
    title: '角色管理',
    key: 'role-management',
    children: [
      { title: '角色列表', key: 'role-list' },
      { title: '新增角色', key: 'role-add' },
      { title: '编辑角色', key: 'role-edit' },
      { title: '删除角色', key: 'role-delete' },
    ],
  },
  {
    title: '权限管理',
    key: 'permission-management',
  },
  {
    title: '系统设置',
    key: 'system-settings',
    children: [
      { title: '通用设置', key: 'general-settings' },
      { title: '通知设置', key: 'notification-settings' },
      { title: '日志管理', key: 'log-management' },
    ],
  },
];

// Dummy data for functional permissions
const functionalPermissions = [
  { label: '导出数据', value: 'export-data' },
  { label: '导入数据', value: 'import-data' },
  { label: '批量操作', value: 'batch-operation' },
  { label: '查看敏感信息', value: 'view-sensitive-info' },
];

const NewRolePage: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [functionalCheckedList, setFunctionalCheckedList] = useState<string[]>([]);

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call to create new role
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('角色创建成功！');
      router.push('/roles');
    } catch (error) {
      message.error('角色创建失败！');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={2}>新增角色</Title>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item label="角色名称" name="name" rules={[{ required: true, message: '请输入角色名称!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="角色描述" name="description">
            <TextArea rows={4} />
          </Form.Item>

          <Title level={4}>权限配置</Title>
          <Form.Item label="菜单权限">
            <Tree
              checkable
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              treeData={treeData}
            />
          </Form.Item>

          <Form.Item label="功能权限">
            <Checkbox.Group
              options={functionalPermissions}
              value={functionalCheckedList}
              onChange={(list) => setFunctionalCheckedList(list as string[])}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                提交
              </Button>
              <Button onClick={() => router.push('/roles')}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default NewRolePage;