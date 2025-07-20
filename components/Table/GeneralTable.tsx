import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface GeneralTableProps extends TableProps<any> {
  // You can add common props for your tables here
}

const GeneralTable: React.FC<GeneralTableProps> = (props) => {
  return (
    <Table {...props} />
  );
};

export default GeneralTable;
