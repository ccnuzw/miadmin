import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MOCK_MENU_PERMISSIONS, MenuItem } from '@/lib/constants';

export interface Tab {
  key: string;
  title: string;
  path: string;
}

interface TabsContextType {
  tabs: Tab[];
  activeKey: string;
  addTab: (tab: Tab) => void;
  removeTab: (key: string) => void;
  setActiveKey: (key: string) => void;
  closeOthers: (targetKey: string) => void;
  closeLeft: (targetKey: string) => void;
  closeRight: (targetKey: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

// 辅助函数：标准化路径 (移除尾部斜杠、查询参数、哈希)
const normalizePath = (path: string): string => {
  let normalized = path.split('?')[0].split('#')[0];
  if (normalized.endsWith('/') && normalized !== '/') {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
};

// 辅助函数：根据路径查找菜单标题
const getMenuTitleByPath = (currentPath: string, menuItems: MenuItem[]): string => {
  const normalizedCurrentPath = normalizePath(currentPath);

  const findTitle = (path: string, items: MenuItem[]): string | undefined => {
    for (const item of items) {
      const normalizedItemPath = item.path ? normalizePath(item.path) : undefined;

      // 1. 精确匹配
      if (normalizedItemPath === normalizedCurrentPath) {
        return item.label;
      }

      // 2. 动态路由匹配 (例如 /users/[id] 匹配 /users/123)
      if (normalizedItemPath && normalizedItemPath.includes('[id]')) {
        const regexPattern = new RegExp(`^${normalizedItemPath.replace('[id]', '[^/]+')}`);
        if (regexPattern.test(normalizedCurrentPath)) {
          return item.label;
        }
      }

      // 3. 递归搜索子菜单
      if (item.children) {
        const childTitle = findTitle(path, item.children);
        if (childTitle) {
          return childTitle;
        }
      }
    }
    return undefined;
  };

  const title = findTitle(currentPath, menuItems);
  if (title) {
    return title;
  }

  // 4. 特殊处理 /users/new 和 /roles/new 等非动态ID但又不是根路径的子页面
  // 检查 MOCK_MENU_PERMISSIONS 中是否存在完全匹配的路径，即使它被标记为 hidden
  for (const item of menuItems) {
    if (item.path === currentPath) {
      return item.label;
    }
    if (item.children) {
      const childTitle = getMenuTitleByPath(currentPath, item.children); // 再次递归，但这次不进行动态匹配，只找精确匹配
      if (childTitle && childTitle !== '未知页面') { // 避免返回嵌套的未知页面
        return childTitle;
      }
    }
  }

  // 5. 最终回退
  return normalizedCurrentPath === '/' ? '首页' : '未知页面';
};

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeKey, setActiveKey] = useState<string>('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname) {
      const title = getMenuTitleByPath(pathname, MOCK_MENU_PERMISSIONS);
      const newTab: Tab = {
        key: pathname,
        title: title,
        path: pathname,
      };

      setTabs((prevTabs) => {
        if (!prevTabs.some((tab) => tab.key === newTab.key)) {
          return [...prevTabs, newTab];
        }
        return prevTabs;
      });
      setActiveKey(pathname);
    }
  }, [pathname]);

  const addTab = useCallback((newTab: Tab) => {
    setTabs((prevTabs) => {
      if (!prevTabs.some((tab) => tab.key === newTab.key)) {
        return [...prevTabs, newTab];
      }
      return prevTabs;
    });
    setActiveKey(newTab.key);
  }, []);

  const removeTab = useCallback((key: string) => {
    setTabs((prevTabs) => {
      const filteredTabs = prevTabs.filter((tab) => tab.key !== key);
      if (filteredTabs.length === 0) {
        router.push('/');
        setActiveKey('/');
        return [];
      }
      if (activeKey === key) {
        const newActiveTab = filteredTabs[filteredTabs.length - 1];
        router.push(newActiveTab.path);
        setActiveKey(newActiveTab.key);
      }
      return filteredTabs;
    });
  }, [activeKey, router]);

  const closeOthers = useCallback((targetKey: string) => {
    setTabs((prevTabs) => {
      const homeTab = prevTabs.find(tab => tab.key === '/');
      const targetTab = prevTabs.find(tab => tab.key === targetKey);
      let newTabs: Tab[] = [];

      if (homeTab && targetKey !== '/') {
        newTabs.push(homeTab);
      }
      if (targetTab) {
        newTabs.push(targetTab);
      }

      if (!newTabs.some(tab => tab.key === activeKey)) {
        const newActiveKey = targetTab ? targetTab.key : (homeTab ? homeTab.key : '');
        if (newActiveKey) {
          router.push(newTabs.find(tab => tab.key === newActiveKey)?.path || '/');
          setActiveKey(newActiveKey);
        }
      }
      return newTabs;
    });
  }, [activeKey, router]);

  const closeLeft = useCallback((targetKey: string) => {
    setTabs((prevTabs) => {
      const targetIndex = prevTabs.findIndex(tab => tab.key === targetKey);
      if (targetIndex === -1) return prevTabs;

      const homeTab = prevTabs.find(tab => tab.key === '/');
      let newTabs: Tab[] = [];

      if (homeTab && prevTabs.indexOf(homeTab) < targetIndex) {
        newTabs.push(homeTab);
      }
      newTabs = [...newTabs, ...prevTabs.slice(targetIndex)];

      if (!newTabs.some(tab => tab.key === activeKey)) {
        const newActiveKey = targetKey;
        router.push(newTabs.find(tab => tab.key === newActiveKey)?.path || '/');
        setActiveKey(newActiveKey);
      }
      return newTabs;
    });
  }, [activeKey, router]);

  const closeRight = useCallback((targetKey: string) => {
    setTabs((prevTabs) => {
      const targetIndex = prevTabs.findIndex(tab => tab.key === targetKey);
      if (targetIndex === -1) return prevTabs;

      const homeTab = prevTabs.find(tab => tab.key === '/');
      let newTabs: Tab[] = [];

      newTabs = [...prevTabs.slice(0, targetIndex + 1)];
      if (homeTab && prevTabs.indexOf(homeTab) > targetIndex) {
        newTabs.unshift(homeTab);
      }

      if (!newTabs.some(tab => tab.key === activeKey)) {
        const newActiveKey = targetKey;
        router.push(newTabs.find(tab => tab.key === newActiveKey)?.path || '/');
        setActiveKey(newActiveKey);
      }
      return newTabs;
    });
  }, [activeKey, router]);

  return (
    <TabsContext.Provider value={{ tabs, activeKey, addTab, removeTab, setActiveKey, closeOthers, closeLeft, closeRight }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};
