'use client';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Card, message, Typography, Tree, Checkbox } from 'antd';
import { useRouter } from 'next/navigation';
import { Role } from '@/lib/types';

const { Title } = Typography;
const { TextArea } = Input;

// Dummy data for roles
const dummyRoles: Role[] = [
  { id: '1', name: '管理员', description: '系统最高权限，拥有所有操作权限' },
  { id: '2', name: '编辑', description: '负责内容编辑和发布' },
  { id: '3', name: '普通用户', description: '普通系统用户，仅拥有基本操作权限' },
  { id: '4', name: '访客', description: '未登录用户，仅可浏览部分内容' },
];

// Dummy data for menu permissions (Tree data)
const treeData = [
  {
    title: '仪表盘',
    key: 'dashboard',
  },
  {
    title: '新仪表盘',
    key: 'new-dashboard',
  },
  {
    title: '组件展示',
    key: 'component-showcase',
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

const RoleDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [functionalCheckedList, setFunctionalCheckedList] = useState<string[]>([]);

  const roleId = params.id; // Get ID from URL params

  useEffect(() => {
    if (roleId) {
      // In a real application, fetch role data from API
      const role = dummyRoles.find(r => r.id === roleId);
      if (role) {
        setCurrentRole(role);
        // Simulate fetching permissions for the role
        if (role.name === '管理员') {
          setCheckedKeys(['dashboard', 'user-management', 'user-list', 'user-add', 'user-edit', 'user-delete', 'role-management', 'role-list', 'role-add', 'role-edit', 'role-delete', 'permission-management', 'system-settings', 'general-settings', 'notification-settings', 'log-management']);
          setFunctionalCheckedList(['export-data', 'import-data', 'batch-operation', 'view-sensitive-info']);
        } else if (role.name === '编辑') {
          setCheckedKeys(['dashboard', 'user-management', 'user-list', 'system-settings', 'general-settings']);
          setFunctionalCheckedList(['export-data']);
        }
      } else {
        message.error('角色未找到！');
        router.push('/roles');
      }
    }
  }, [roleId, form, router]);

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call to update role
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('角色更新成功！');
      router.push('/roles');
    } catch (error) {
      message.error('角色更新失败！');
    } finally {
      setLoading(false);
    }
  };

  if (!currentRole && roleId) {
    return <div>加载中...</div>; // Or a loading spinner
  }

  return (
    <div>
      <Title level={2}>角色详情/编辑</Title>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={currentRole}
          key={currentRole?.id} // Add key to force remount when currentRole changes
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
                保存
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

export default RoleDetailPage;