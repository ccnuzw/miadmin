import React from 'react';
import { Tree, Dropdown, Menu, Space } from 'antd';
import type { TreeProps } from 'antd';
import {
  FolderOutlined,
  TeamOutlined,
  DeploymentUnitOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { OrgTreeNode } from '@/lib/constants';

interface OrgTreeProps extends Omit<TreeProps, 'treeData'> {
  treeData: OrgTreeNode[];
  onNodeOperation: (type: string, node: OrgTreeNode) => void;
  onDeleteNode: (node: OrgTreeNode) => void;
}

const OrgTree: React.FC<OrgTreeProps> = ({ treeData, onNodeOperation, onDeleteNode, ...rest }) => {
  const getMenuItems = (node: OrgTreeNode) => [
    { key: 'edit', label: '编辑', icon: <EditOutlined /> },
    node.type === 'orgUnit' && { key: 'add-child-org', label: '添加子组织单元', icon: <PlusOutlined /> },
    { key: 'add-department', label: '添加部门', icon: <PlusOutlined /> },
    node.type === 'department' && { key: 'add-sub-department', label: '添加子部门', icon: <PlusOutlined /> },
    { key: 'delete', label: '删除', icon: <DeleteOutlined />, danger: true },
  ].filter(Boolean);

  const renderTreeNodes = (data: OrgTreeNode[]) =>
    data.map(node => {
      const icon = node.type === 'orgUnit' ? <FolderOutlined /> : <TeamOutlined />;

      return (
        <Tree.TreeNode
          key={node.key}
          title={
            <Space>
              {icon}
              {node.title}
            </Space>
          }
          icon={icon}
          dataRef={node}
        >
          {node.children && renderTreeNodes(node.children)}
        </Tree.TreeNode>
      );
    });

  return (
    <Tree
      showIcon
      defaultExpandAll
      treeData={treeData}
      titleRender={(nodeData: any) => {
        const node = nodeData as OrgTreeNode;
        const icon = node.type === 'orgUnit' ? <FolderOutlined /> : <TeamOutlined />;

        return (
          <Space>
            {icon}
            {node.title}
          </Space>
        );
      }}
      {...rest}
    />
  );
};

export default OrgTree;
