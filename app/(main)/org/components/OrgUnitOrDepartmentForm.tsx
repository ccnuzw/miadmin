import React from 'react';
import { Form, Input, Select } from 'antd';
import { OrgTreeNode } from '@/lib/constants';

interface OrgUnitOrDepartmentFormProps {
  form: any; // Ant Design Form instance
  modalType: 'add' | 'edit' | 'add-child-org' | 'add-department' | 'add-sub-department' | '';
  selectedNode: OrgTreeNode | null;
}

const OrgUnitOrDepartmentForm: React.FC<OrgUnitOrDepartmentFormProps> = ({ form, modalType, selectedNode }) => {
  const isOrgUnit = form.getFieldValue('type') === 'orgUnit';
  const isAddingTopLevelOrgUnit = modalType === 'add';

  return (
    <Form form={form} layout="vertical" name="org_unit_department_form">
      <Form.Item
        name="title"
        label="名称"
        rules={[{ required: true, message: '请输入名称' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="code"
        label="编码"
        rules={[{ required: true, message: '请输入编码' }]}
      >
        <Input />
      </Form.Item>

      {!isAddingTopLevelOrgUnit && (
        <Form.Item
          name="parentId"
          label="上级"
          initialValue={selectedNode?.key}
          rules={[{ required: true, message: '请选择上级' }]}
        >
          <Input disabled />
        </Form.Item>
      )}

      <Form.Item
        name="type"
        label="类型"
        rules={[{ required: true, message: '请选择类型' }]}
      >
        <Select disabled={modalType !== 'add' && modalType !== 'add-child-org' && modalType !== 'add-department' && modalType !== 'add-sub-department'}>
          <Select.Option value="orgUnit">组织单元</Select.Option>
          <Select.Option value="department">部门</Select.Option>
        </Select>
      </Form.Item>

      {isOrgUnit && (
        <Form.Item
          name="unitType"
          label="组织单元类型"
          rules={[{ required: true, message: '请选择组织单元类型' }]}
        >
          <Select>
            <Select.Option value="headquarters">总部</Select.Option>
            <Select.Option value="region">大区</Select.Option>
            <Select.Option value="branch">分公司</Select.Option>
            <Select.Option value="division">事业部</Select.Option>
          </Select>
        </Form.Item>
      )}

      <Form.Item
        name="description"
        label="描述"
      >
        <Input.TextArea rows={3} />
      </Form.Item>
    </Form>
  );
};

export default OrgUnitOrDepartmentForm;
