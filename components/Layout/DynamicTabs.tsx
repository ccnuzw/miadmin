import React from 'react';
import { Tabs, Dropdown, Menu } from 'antd';
import { useTabs } from '@/lib/tabs-context';
import { useRouter } from 'next/navigation';

const DynamicTabs: React.FC = () => {
  const { tabs, activeKey, setActiveKey, removeTab, closeOthers, closeLeft, closeRight } = useTabs();
  const router = useRouter();

  const onChange = (key: string) => {
    setActiveKey(key);
    const targetTab = tabs.find(tab => tab.key === key);
    if (targetTab) {
      router.push(targetTab.path);
    }
  };

  const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      removeTab(targetKey as string);
    }
  };

  const getMenuItems = (targetKey: string) => {
    const targetIndex = tabs.findIndex(tab => tab.key === targetKey);
    const isFirstTab = targetIndex === 0;
    const isLastTab = targetIndex === tabs.length - 1;

    const items = [
      { key: 'closeOthers', label: '关闭其它', disabled: tabs.length <= 1 },
      { key: 'closeLeft', label: '关闭左侧', disabled: isFirstTab || tabs.length <= 1 },
      { key: 'closeRight', label: '关闭右侧', disabled: isLastTab || tabs.length <= 1 },
    ];

    return (
      <Menu onClick={({ key }) => {
        if (key === 'closeOthers') {
          closeOthers(targetKey);
        } else if (key === 'closeLeft') {
          closeLeft(targetKey);
        } else if (key === 'closeRight') {
          closeRight(targetKey);
        }
      }} items={items} />
    );
  };

  return (
    <Tabs
      hideAdd
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={tabs.map((tab) => ({
        label: (
          <Dropdown overlay={getMenuItems(tab.key)} trigger={['contextMenu']}>
            <span>{tab.title}</span>
          </Dropdown>
        ),
        key: tab.key,
        closable: tab.key !== '/', // Home tab is not closable
      }))}
      style={{ marginBottom: 0 }}
    />
  );
};

export default DynamicTabs;
