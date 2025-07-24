'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Layout, Card, Table, Button, Space, Modal, Form, Input, Select, Tag, Tree } from 'antd';
import {
  DeploymentUnitOutlined,
  BlockOutlined,
  FolderOutlined,
  TeamOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { MOCK_ORGANIZATION_STRUCTURE_TREE_DATA, MOCK_ORGANIZATION_MEMBERS, OrgTreeNode, DepartmentMember } from '@/lib/constants';
import OrgTree from '../components/OrgTree';
import OrgUnitOrDepartmentForm from '../components/OrgUnitOrDepartmentForm';

const { Sider, Content } = Layout;
const { confirm } = Modal;

const OrganizationStructurePage: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<OrgTreeNode | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [modalType, setModalType] = useState<'add' | 'edit' | 'add-child-org' | 'add-department' | 'add-sub-department' | ''>('');

  // Helper function to find a node by key in the tree data
  const findNodeByKey = (key: string, nodes: OrgTreeNode[]): OrgTreeNode | null => {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        const found = findNodeByKey(key, node.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const handleSelect = (selectedKeys: React.Key[], info: any) => {
    if (selectedKeys.length > 0) {
      const selectedKey = selectedKeys[0];
      const node = findNodeByKey(selectedKey, MOCK_ORGANIZATION_STRUCTURE_TREE_DATA);
      setSelectedNode(node);
    } else {
      setSelectedNode(null);
    }
  };

  const handleAddTopLevelOrgUnit = () => {
    setSelectedNode(null); // Clear selected node for top-level add
    setModalType('add');
    setIsModalVisible(true);
  };

  const handleNodeOperation = (type: string, node: OrgTreeNode) => {
    setSelectedNode(node);
    setModalType(type as any);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Received values of form: ', values);
      // Here you would typically send data to your API
      // For now, we just close the modal
      setIsModalVisible(false);
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  useEffect(() => {
    if (isModalVisible) {
      form.resetFields();
      if (modalType === 'edit' && selectedNode) {
        form.setFieldsValue(selectedNode);
      } else if (modalType === 'add') {
        form.setFieldsValue({ type: 'orgUnit', parentId: undefined });
      } else if (modalType === 'add-child-org' && selectedNode) {
        form.setFieldsValue({ type: 'orgUnit', parentId: selectedNode.key });
      } else if (modalType === 'add-department' && selectedNode) {
        form.setFieldsValue({ type: 'department', parentId: selectedNode.key });
      } else if (modalType === 'add-sub-department' && selectedNode) {
        form.setFieldsValue({ type: 'department', parentId: selectedNode.key });
      }
    }
  }, [isModalVisible, modalType, selectedNode, form]);

  const handleDeleteNode = (node: OrgTreeNode) => {
    confirm({
      title: `确定要删除 ${node.title} 吗？`,
      content: '删除后不可恢复。',
      onOk() {
        console.log('Delete', node.key);
        // Implement actual delete logic here (API call)
      },
    });
  };

  const handleAddMember = () => {
    if (selectedNode && selectedNode.type === 'department') {
      Modal.info({
        title: '添加成员',
        content: `为部门 "${selectedNode.title}" 添加成员的逻辑`,
        // Here you would open a user selection modal
      });
    }
  };

  const handleRemoveMember = (member: DepartmentMember) => {
    confirm({
      title: `确定要将 ${member.username} 从 ${selectedNode?.title} 移除吗？`,
      content: '移除后该成员将不再属于此部门。',
      onOk() {
        console.log('Remove member', member.userId, 'from', selectedNode?.key);
        // Implement actual remove logic here (API call)
      },
    });
  };

  const organizationMembers = useMemo(() => {
    if (!selectedNode) {
      return [];
    }

    const relevantKeysForMembers: string[] = [];

    // Helper function to get node title by key
    const getNodeTitleByKey = (key: string, nodes: OrgTreeNode[]): string | undefined => {
      for (const node of nodes) {
        if (node.key === key) {
          return node.title;
        }
        if (node.children) {
          const foundTitle = getNodeTitleByKey(key, node.children);
          if (foundTitle) {
            return foundTitle;
          }
        }
      }
      return undefined;
    };

    // Add the selected node's key if it has direct members
    if (MOCK_ORGANIZATION_MEMBERS[selectedNode.key]) {
      relevantKeysForMembers.push(selectedNode.key);
    }

    // Helper function to collect descendant department keys (only departments, not sub-orgUnits)
    const collectDescendantDepartmentKeys = (node: OrgTreeNode) => {
      if (node.children) {
        for (const child of node.children) {
          if (child.type === 'department') {
            relevantKeysForMembers.push(child.key);
            collectDescendantDepartmentKeys(child); // Recurse for sub-departments
          }
          // If child.type is 'orgUnit', we do NOT recurse further down this branch
          // for the current selectedNode's employee list.
        }
      }
    };

    collectDescendantDepartmentKeys(selectedNode);

    const members: (DepartmentMember & { belongingToName?: string })[] = [];
    for (const key of relevantKeysForMembers) {
      if (MOCK_ORGANIZATION_MEMBERS[key]) {
        const nodeTitle = getNodeTitleByKey(key, MOCK_ORGANIZATION_STRUCTURE_TREE_DATA);
        members.push(...MOCK_ORGANIZATION_MEMBERS[key].map(member => ({ ...member, belongingToName: nodeTitle })));
      }
    }
    return members;
  }, [selectedNode]);

  const memberColumns = [
    { title: '部门', dataIndex: 'belongingToName', key: 'belongingToName' },
    { title: '姓名', dataIndex: 'username', key: 'username' },
    { title: '工号', dataIndex: 'employeeId', key: 'employeeId' },
    { title: '联系方式', dataIndex: 'contact', key: 'contact' },
    {
      title: '所属角色',
      dataIndex: 'assignedRoleNames',
      key: 'assignedRoleNames',
      render: (roles: string[]) => (
        <>
          {roles.map(role => (
            <Tag key={role}>{role}</Tag>
          ))}
        </>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (text: string, record: DepartmentMember) => (
        <Space size="middle">
          <Button type="link" onClick={() => console.log('View user detail', record.userId)}>查看用户详情</Button>
          <Button type="link" danger onClick={() => handleRemoveMember(record)}>移除</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100%', background: '#fff' }}>
      <Sider width={300} style={{ background: '#fff', borderRight: '1px solid #f0f0f0', padding: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={handleAddTopLevelOrgUnit} icon={<PlusOutlined />} block>
            新增顶级组织单元
          </Button>
        </div>
        <OrgTree
          treeData={MOCK_ORGANIZATION_STRUCTURE_TREE_DATA}
          onSelect={handleSelect}
          onNodeOperation={handleNodeOperation}
          onDeleteNode={handleDeleteNode}
        />
      </Sider>
      <Content style={{ padding: '16px 24px', background: '#fff' }}>
        {selectedNode ? (
          <>
            <Card
              title={selectedNode.title}
              extra={
                <Space>
                  <Button icon={<EditOutlined />} onClick={() => handleNodeOperation('edit', selectedNode)}>编辑</Button>
                  <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteNode(selectedNode)}>删除</Button>
                </Space>
              }
              style={{ marginBottom: 24 }}
            >
              <p><strong>类型:</strong> {selectedNode.type === 'orgUnit' ? '组织单元' : '部门'}</p>
              {selectedNode.code && <p><strong>编码:</strong> {selectedNode.code}</p>}
              {selectedNode.description && <p><strong>描述:</strong> {selectedNode.description}</p>}
              {selectedNode.type === 'orgUnit' && selectedNode.unitType && (
                <p><strong>组织单元类型:</strong> {selectedNode.unitType === 'headquarters' ? '总部' : selectedNode.unitType === 'region' ? '大区' : selectedNode.unitType === 'branch' ? '分公司' : selectedNode.unitType === 'division' ? '事业部' : '未知'}</p>
              )}
              {selectedNode.parentId && <p><strong>上级:</strong> {selectedNode.parentId}</p>}
              {/* Add more details as needed */}
            </Card>

            <Card
              title={selectedNode.type === 'department' ? '部门成员' : '组织成员'}
              extra={
                <Button type="primary" icon={<UserAddOutlined />} onClick={handleAddMember}>
                  添加成员
                </Button>
              }
            >
              <Table
                columns={memberColumns}
                dataSource={organizationMembers}
                rowKey="userId"
                pagination={false}
              />
            </Card>
          </>
        ) : (
          <Card>
            <p>请从左侧选择一个组织单元或部门查看详情。</p>
          </Card>
        )}

        <Modal
          title={
            modalType === 'add' ? '新增顶级组织单元' :
            modalType === 'edit' ? '编辑' :
            modalType === 'add-child-org' ? `在 ${selectedNode?.title} 下新增子组织单元` :
            modalType === 'add-department' ? `在 ${selectedNode?.title} 下新增部门` :
            modalType === 'add-sub-department' ? `在 ${selectedNode?.title} 下新增子部门` :
            ''
          }
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => setIsModalVisible(false)}
          destroyOnHidden
        >
          <OrgUnitOrDepartmentForm form={form} modalType={modalType} selectedNode={selectedNode} />
        </Modal>
      </Content>
    </Layout>
  );
};

export default OrganizationStructurePage;
