import React from 'react';
import { Form, Grid } from 'antd';
import type { FormProps } from 'antd';

const { useBreakpoint } = Grid;

interface GeneralFormProps extends FormProps {
  // You can add common props for your forms here
}

const GeneralForm: React.FC<GeneralFormProps> = (props) => {
  const screens = useBreakpoint();

  const formLayout = screens.lg ? 'horizontal' : 'vertical';
  const labelCol = screens.lg ? { span: 6 } : { span: 24 };
  const wrapperCol = screens.lg ? { span: 14 } : { span: 24 };

  return (
    <Form
      layout={formLayout}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      {...props}
    />
  );
};

export default GeneralForm;
