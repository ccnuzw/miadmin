'use client';
import React, { useState } from 'react';
import { Table, Button, Input, Space, Modal, Form, Switch, message, Typography, Card, Select, App } from 'antd';
const { Option } = Select;
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

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
];

const dummyPolicies: NotificationPolicy[] = [
  { id: '1', name: '新用户注册通知', enabled: true, description: '当有新用户注册时，发送邮件通知管理员。' },
  { id: '2', name: '订单状态变更通知', enabled: false, description: '当订单状态发生变化时，发送短信通知用户。' },
  { id: '3', name: '系统异常告警', enabled: true, description: '当系统出现异常时，发送站内信通知开发人员。' },
];

const NotificationsPage: React.FC = () => {
  const { modal } = App.useApp();
  const [templates, setTemplates] = useState<NotificationTemplate[]>(dummyTemplates);
  const [policies, setPolicies] = useState<NotificationPolicy[]>(dummyPolicies);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<NotificationTemplate | null>(null);
  const [form] = Form.useForm();

  const showModal = (template?: NotificationTemplate) => {
    setEditingTemplate(template || null);
    form.setFieldsValue(template || { type: '邮件' });
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
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
      setIsModalVisible(false);
      form.resetFields();
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      message.error('请检查表单填写！');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
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
    { title: '模板名称', dataIndex: 'name', key: 'name' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { title: '主题', dataIndex: 'subject', key: 'subject' },
    { title: '内容', dataIndex: 'content', key: 'content' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: NotificationTemplate) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>编辑</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteTemplate(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];

  const policyColumns = [
    { title: '策略名称', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled: boolean, record: NotificationPolicy) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          checked={enabled}
          onChange={(checked) => handlePolicyToggle(record.id, checked)}
        />
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>通知设置</Title>

      <Card title="通知模板管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>新增模板</Button>} style={{ marginBottom: 24 }}>
        <Table columns={templateColumns} dataSource={templates} rowKey="id" pagination={false} />
      </Card>

      <Card title="通知策略配置">
        <Table columns={policyColumns} dataSource={policies} rowKey="id" pagination={false} />
      </Card>

      <Modal
        title={editingTemplate ? '编辑通知模板' : '新增通知模板'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
        confirmLoading={false} // Add loading state if API call is involved
      >
        <Form form={form} layout="vertical">
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
    </div>
  );
};

export default NotificationsPage;