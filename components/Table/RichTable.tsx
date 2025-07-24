'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Table, Input, Button, Space, Select, Tag, PaginationProps } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';

const { Search } = Input;
const { Option } = Select;

interface RichTableProps<T> {
  columns: ColumnsType<T>;
  fetchData: (params: { page: number; pageSize: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; search?: string; filters?: Record<string, any> }) => Promise<{ data: T[]; total: number }>;
  rowKey: string;
  searchPlaceholder?: string;
  filterOptions?: { key: string; label: string; options: { value: string; label: string; color?: string }[] }[];
  showReloadButton?: boolean;
  onRowSelect?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  initialPageSize?: number;
  initialSortBy?: string;
  initialSortOrder?: 'asc' | 'desc';
  initialSearch?: string;
  initialFilters?: Record<string, any>;
}

function RichTable<T extends object>({
  columns,
  fetchData,
  rowKey,
  searchPlaceholder = '搜索...',
  filterOptions,
  showReloadButton = true,
  onRowSelect,
  initialPageSize = 10,
  initialSortBy,
  initialSortOrder,
  initialSearch,
  initialFilters,
}: RichTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: initialPageSize,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (total) => `共 ${total} 条`,
  });
  const [sortBy, setSortBy] = useState<string | undefined>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(initialSortOrder);
  const [search, setSearch] = useState<string | undefined>(initialSearch);
  const [filters, setFilters] = useState<Record<string, any> | undefined>(initialFilters);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        sortBy,
        sortOrder,
        search,
        filters,
      };
      const result = await fetchData(params);
      setData(result.data);
      setPagination((prev) => ({
        ...prev,
        total: result.total,
      }));
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize, sortBy, sortOrder, search, filters, fetchData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleTableChange = (newPagination: TablePaginationConfig, _filters: any, sorter: any) => {
    setPagination(newPagination);
    if (sorter.field) {
      setSortBy(sorter.field as string);
      setSortOrder(sorter.order === 'ascend' ? 'asc' : 'desc');
    } else {
      setSortBy(undefined);
      setSortOrder(undefined);
    }
    // Note: Ant Design's table filters are handled differently if you want to use them directly.
    // For simplicity, our `filters` state is managed by the custom filter dropdowns.
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset to first page on search
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === 'all' ? undefined : value,
    }));
    setPagination((prev) => ({ ...prev, current: 1 })); // Reset to first page on filter change
  };

  const handleReload = () => {
    setSearch(initialSearch);
    setFilters(initialFilters);
    setSortBy(initialSortBy);
    setSortOrder(initialSortOrder);
    setPagination((prev) => ({ ...prev, current: 1, pageSize: initialPageSize }));
    setSelectedRowKeys([]);
    // loadData will be called by useEffect due to state changes
  };

  const rowSelection = onRowSelect
    ? {
        selectedRowKeys,
        onChange: (newSelectedRowKeys: React.Key[], selectedRows: T[]) => {
          setSelectedRowKeys(newSelectedRowKeys);
          onRowSelect(newSelectedRowKeys, selectedRows);
        },
      }
    : undefined;

  return (
    <div className="rich-table-container">
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
        <Space>
          <Search
            placeholder={searchPlaceholder}
            onSearch={handleSearch}
            style={{ width: 200 }}
            allowClear
            defaultValue={initialSearch}
          />
          {filterOptions?.map((filter) => (
            <Select
              key={filter.key}
              defaultValue="all"
              style={{ width: 120 }}
              onChange={(value) => handleFilterChange(filter.key, value)}
            >
              <Option value="all">{`所有${filter.label}`}</Option>
              {filter.options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          ))}
        </Space>
        {showReloadButton && (
          <Button icon={<ReloadOutlined />} onClick={handleReload}>
            重置
          </Button>
        )}
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowSelection={rowSelection}
        scroll={{ x: 'max-content' }} // Enable horizontal scrolling for many columns
      />
    </div>
  );
}

export default RichTable;
