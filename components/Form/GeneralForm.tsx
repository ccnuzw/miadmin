import React from 'react';
import { Form } from 'antd';
import type { FormProps } from 'antd';

interface GeneralFormProps extends FormProps {
  // You can add common props for your forms here
}

const GeneralForm: React.FC<GeneralFormProps> = (props) => {
  return (
    <Form {...props} />
  );
};

export default GeneralForm;
