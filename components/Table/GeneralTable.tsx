import React from 'react';
import { Table, Grid } from 'antd';
import type { TableProps } from 'antd';

const { useBreakpoint } = Grid;

interface GeneralTableProps extends TableProps<any> {
  // You can add common props for your tables here
}

const GeneralTable: React.FC<GeneralTableProps> = (props) => {
  const screens = useBreakpoint();

  const paginationConfig = props.pagination === false ? false : {
    ...(props.pagination as object),
    simple: !screens.lg,
  };

  return (
    <Table
      scroll={{ x: 'max-content' }}
      pagination={paginationConfig}
      {...props}
    />
  );
};

export default GeneralTable;
