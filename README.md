# Next.js 响应式 B 端管理系统基础框架

本项目旨在构建一个基于现代前端技术栈的响应式 B 端管理系统基础框架。它将提供一个坚实的基础，包含用户管理、角色管理、权限管理、仪表盘、系统设置等核心模块，并具备完善的导航和操作日志功能，以便后续快速扩展和维护。

## 技术栈

- **前端框架**: Next.js (App Router)
- **UI 库**: Ant Design
- **核心库**: React
- **编程语言**: TypeScript
- **样式**: Tailwind CSS (可选)

## 目录结构

```
.
├── app/
│   ├── (main)/             # 主布局组，包含侧边栏、头部、内容区
│   │   ├── layout.tsx      # 主布局文件
│   │   ├── page.tsx        # 仪表盘页面
│   │   ├── users/          # 用户管理模块 (管理系统用户)
│   │   │   ├── page.tsx    # 用户列表页面
│   │   │   ├── [id]/       # 用户详情/编辑页面
│   │   │   │   └── page.tsx
│   │   │   └── new/        # 新增用户页面
│   │   │       └── page.tsx
│   │   ├── roles/          # 角色管理模块 (管理系统角色)
│   │   │   ├── page.tsx    # 角色列表页面
│   │   │   ├── [id]/       # 角色详情/编辑页面
│   │   │   │   └── page.tsx
│   │   │   └── new/        # 新增角色页面
│   │   │       └── page.tsx
│   │   ├── permissions/    # 权限管理模块 (管理具体权限点)
│   │   │   └── page.tsx    # 权限点列表/配置页面
│   │   ├── settings/       # 系统设置模块
│   │   │   ├── page.tsx    # 系统设置主页 (通用设置)
│   │   │   ├── notifications/ # 通知设置
│   │   │   │   └── page.tsx
│   │   │   └── logs/       # 日志管理
│   │   │       └── page.tsx
│   ├── login/              # 登录页面
│   │   └── page.tsx
│   ├── api/                # 后端API路由（Next.js API Routes）
│   │   ├── auth/           # 认证相关API
│   │   │   └── login.ts
│   │   ├── users/          # 用户管理API
│   │   │   └── route.ts
│   │   ├── roles/          # 角色管理API
│   │   │   └── route.ts
│   │   ├── permissions/    # 权限管理API
│   │   │   └── route.ts
│   │   └── ...
├── components/             # 通用UI组件
│   ├── Layout/             # 布局组件
│   │   ├── MainLayout.tsx  # 主布局组件，包含侧边栏和顶部导航
│   │   ├── Header.tsx      # 顶部Header
│   │   └── Sidebar.tsx     # 侧边栏
│   ├── BreadcrumbNav.tsx   # 面包屑导航组件
│   ├── Table/              # 表格组件封装 (带搜索、分页、筛选)
│   │   └── GeneralTable.tsx
│   ├── Form/               # 表单组件封装
│   │   └── GeneralForm.tsx
│   ├── DashboardCard.tsx   # 仪表盘数据卡片组件
│   ├── GlobalLoading.tsx   # 全局Loading组件
│   └── ...
├── lib/                    # 工具库和辅助函数
│   ├── api.ts              # API请求封装 (axios/fetch)
│   ├── auth.ts             # 认证相关工具
│   ├── constants.ts        # 常量定义
│   ├── utils.ts            # 通用工具函数
│   └── types.ts            # 全局类型定义
├── public/                 # 静态资源
├── styles/                 # 全局样式
│   └── globals.css
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```
