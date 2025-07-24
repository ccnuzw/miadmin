'use client';
import React, { useState } from 'react';
import { Table, Button, Input, Space, Modal, Form, Switch, message, Typography, Card, Select, App, Dropdown, Menu, Grid } from 'antd';
const { Option } = Select;
import { EditOutlined, DeleteOutlined, PlusOutlined, MoreOutlined } from '@ant-design/icons';
import GeneralTable from '@/components/Table/GeneralTable'; // 导入 GeneralTable

const { Title } = Typography;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

interface NotificationTemplate {
  id: string;
  name: string;
  type: string; // e.g., '邮件', '短信', '站内信'
  subject: string;
  content: string;
}

interface NotificationPolicy {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
}

const dummyTemplates: NotificationTemplate[] = [
  { id: '1', name: '用户注册成功通知', type: '邮件', subject: '欢迎注册！', content: '尊敬的用户，您已成功注册。' },
  { id: '2', name: '订单发货通知', type: '短信', subject: '订单已发货', content: '您的订单已发货，请注意查收。' },
  { id: '3', name: '新消息提醒', type: '站内信', subject: '您有新消息', content: '您收到一条新消息。' },
  { id: '4', name: '密码重置通知', type: '邮件', subject: '密码重置', content: '您的密码已成功重置。' },
  { id: '5', name: '活动提醒', type: '短信', subject: '活动即将开始', content: '您关注的活动即将开始，请准时参加。' },
];

const dummyPolicies: NotificationPolicy[] = [
  { id: '1', name: '新用户注册通知', enabled: true, description: '当有新用户注册时，发送邮件通知管理员。' },
  { id: '2', name: '订单状态变更通知', enabled: false, description: '当订单状态发生变化时，发送短信通知用户。' },
  { id: '3', name: '系统异常告警', enabled: true, description: '当系统出现异常时，发送站内信通知开发人员。' },
  { id: '4', name: '每日报告发送', enabled: true, description: '每日定时发送系统运营报告。' },
  { id: '5', name: '用户活跃度提醒', enabled: false, description: '当用户长时间不活跃时，发送提醒。' },
];

const NotificationsPage: React.FC = () => {
  const { modal } = App.useApp();
  const screens = useBreakpoint();
  const [templates, setTemplates] = useState<NotificationTemplate[]>(dummyTemplates);
  const [policies, setPolicies] = useState<NotificationPolicy[]>(dummyPolicies);
  const [isTemplateModalVisible, setIsTemplateModalVisible] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<NotificationTemplate | null>(null);
  const [templateForm] = Form.useForm();

  const [isPolicyModalVisible, setIsPolicyModalVisible] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<NotificationPolicy | null>(null);
  const [policyForm] = Form.useForm();

  const showTemplateModal = (template?: NotificationTemplate) => {
    setEditingTemplate(template || null);
    templateForm.setFieldsValue(template || { type: '邮件' });
    setIsTemplateModalVisible(true);
  };

  const showPolicyModal = (policy?: NotificationPolicy) => {
    setEditingPolicy(policy || null);
    policyForm.setFieldsValue(policy || { enabled: true });
    setIsPolicyModalVisible(true);
  };

  const handleTemplateOk = async () => {
    try {
      const values = await templateForm.validateFields();
      if (editingTemplate) {
        // Edit existing template
        setTemplates(templates.map(t => (t.id === editingTemplate.id ? { ...t, ...values } : t)));
        message.success('模板更新成功！');
      } else {
        // Add new template
        const newId = String(templates.length + 1);
        setTemplates([...templates, { id: newId, ...values }]);
        message.success('模板添加成功！');
      }
      setIsTemplateModalVisible(false);
      templateForm.resetFields();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      message.error('请检查表单填写！');
    }
  };

  const handleTemplateCancel = () => {
    setIsTemplateModalVisible(false);
    templateForm.resetFields();
  };

  const handlePolicyOk = async () => {
    try {
      const values = await policyForm.validateFields();
      if (editingPolicy) {
        // Edit existing policy
        setPolicies(policies.map(p => (p.id === editingPolicy.id ? { ...p, ...values } : p)));
        message.success('策略更新成功！');
      } else {
        // This case is not expected for policy editing, but good to have
        const newId = String(policies.length + 1);
        setPolicies([...policies, { id: newId, ...values }]);
        message.success('策略添加成功！');
      }
      setIsPolicyModalVisible(false);
      policyForm.resetFields();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      message.error('请检查表单填写！');
    }
  };

  const handlePolicyCancel = () => {
    setIsPolicyModalVisible(false);
    policyForm.resetFields();
  };

  const handleDeleteTemplate = (id: string) => {
    modal.confirm({
      title: '确定要删除此通知模板吗？',
      content: '删除后将无法恢复！',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        setTemplates(templates.filter(t => t.id !== id));
        message.success('模板删除成功！');
      },
      onCancel() {
        message.info('取消删除。');
      },
    });
  };

  const handlePolicyToggle = (id: string, checked: boolean) => {
    setPolicies(policies.map(p => (p.id === id ? { ...p, enabled: checked } : p)));
    message.success(`策略 ${id} 已${checked ? '启用' : '禁用'}！`);
  };

  const templateColumns = [
    {
      title: '模板名称',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100
    },
    {
      title: '主题',
      dataIndex: 'subject',
      key: 'subject',
      width: 200,
      responsive: ['md']
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      width: 300,
      responsive: ['lg']
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_: any, record: NotificationTemplate) => (
        <Space size="small">
          <Button icon={<EditOutlined />} onClick={() => showTemplateModal(record)} size="small">编辑</Button>
          {screens.md ? (
            <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteTemplate(record.id)} size="small">删除</Button>
          ) : (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'delete',
                    label: (
                      <Space>
                        <DeleteOutlined />
                        删除
                      </Space>
                    ),
                    danger: true,
                    onClick: () => handleDeleteTemplate(record.id),
                  },
                ],
              }}
              trigger={['click']}
            >
              <Button icon={<MoreOutlined />} size="small" />
            </Dropdown>
          )}
        </Space>
      ),
    },
  ];

  const policyColumns = [
    {
      title: '策略名称',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      responsive: ['md']
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 100,
      render: (enabled: boolean, record: NotificationPolicy) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          checked={enabled}
          onChange={(checked) => handlePolicyToggle(record.id, checked)}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      fixed: 'right',
      render: (_: any, record: NotificationPolicy) => (
        <Space size="small">
          {screens.md ? (
            <Button icon={<EditOutlined />} onClick={() => showPolicyModal(record)} size="small">编辑</Button>
          ) : (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'edit',
                    label: (
                      <Space>
                        <EditOutlined />
                        编辑
                      </Space>
                    ),
                    onClick: () => showPolicyModal(record),
                  },
                ],
              }}
              trigger={['click']}
            >
              <Button icon={<MoreOutlined />} size="small" />
            </Dropdown>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>通知设置</Title>

      <Card title="通知模板管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>新增模板</Button>} style={{ marginBottom: 24 }}>
        <GeneralTable columns={templateColumns} dataSource={templates} rowKey="id" pagination={false} />
      </Card>

      <Card title="通知策略配置">
        <GeneralTable columns={policyColumns} dataSource={policies} rowKey="id" pagination={false} />
      </Card>

      <Modal
        title={editingTemplate ? '编辑通知模板' : '新增通知模板'}
        open={isTemplateModalVisible}
        onOk={handleTemplateOk}
        onCancel={handleTemplateCancel}
        okText="确定"
        cancelText="取消"
        confirmLoading={false}
        width={screens.md ? 600 : '90%'}
      >
        <Form form={templateForm} layout={screens.md ? 'horizontal' : 'vertical'}>
          <Form.Item name="name" label="模板名称" rules={[{ required: true, message: '请输入模板名称!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="类型" rules={[{ required: true, message: '请选择类型!' }]}>
            <Select>
              <Option value="邮件">邮件</Option>
              <Option value="短信">短信</Option>
              <Option value="站内信">站内信</Option>
            </Select>
          </Form.Item>
          <Form.Item name="subject" label="主题" rules={[{ required: true, message: '请输入主题!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="content" label="内容" rules={[{ required: true, message: '请输入内容!' }]}>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={editingPolicy ? '编辑通知策略' : '新增通知策略'}
        open={isPolicyModalVisible}
        onOk={handlePolicyOk}
        onCancel={handlePolicyCancel}
        okText="确定"
        cancelText="取消"
        confirmLoading={false}
        width={screens.md ? 600 : '90%'}
      >
        <Form form={policyForm} layout={screens.md ? 'horizontal' : 'vertical'}>
          <Form.Item name="name" label="策略名称" rules={[{ required: true, message: '请输入策略名称!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item name="enabled" label="启用" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NotificationsPage;