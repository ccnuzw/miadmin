# Next.js 响应式 B 端管理系统基础框架项目生成文档

## 1. 项目概览

本项目旨在构建一个基于现代前端技术栈的响应式 B 端管理系统基础框架。它将提供一个坚实的基础，包含用户管理、角色管理、权限管理、仪表盘、系统设置等核心模块，并具备完善的导航和操作日志功能，以便后续快速扩展和维护。

### 1.1 技术栈

- **前端框架**: Next.js (App Router) - 提供服务器端渲染 (SSR) 和静态站点生成 (SSG) 能力，优化性能和 SEO，并利用 App Router 进行更灵活的路由和数据获取。

- **UI 库**: Ant Design - 丰富的组件库，提供高质量的 UI 组件，加速开发进程并确保设计一致性。

- **核心库**: React - 构建用户界面的基础库。

- **编程语言**: TypeScript - 强类型语言，提升代码质量和可维护性，减少运行时错误。

- **样式**: Tailwind CSS (可选，用于辅助 Ant Design 布局，或根据需要自定义)

### 1.2 目录结构

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

---

## 2. 主页布局与仪表盘设计

### 2.1 主布局 (MainLayout - `app/(main)/layout.tsx`)

- **整体结构**: 采用 **Ant Design 的 `Layout` 组件** 实现经典的两栏布局。
  
  - **侧边栏 (Sider)**：位于左侧，宽度固定为 `200px` (可折叠)。
    
    - **Logo区域**: 顶部显示系统 Logo 和系统名称。
    
    - **菜单导航 (Menu)**：基于 Ant Design `Menu` 组件，渲染主要导航菜单。菜单项应根据用户权限动态生成。
      
      - 包含一级菜单和二级菜单。
      
      - 菜单项点击后，跳转到对应的页面，并同步更新 URL。
      
      - 支持菜单折叠功能。
  
  - **内容区域 (Content)**：位于右侧，占据剩余宽度。
    
    - **顶部 Header (Header)**：
      
      - **折叠/展开侧边栏按钮**: 左侧图标，点击切换侧边栏的展开/折叠状态。
      
      - **面包屑导航**: 紧随折叠按钮右侧，动态显示当前页面的路径。
      
      - **右侧功能区**:
        
        - **消息通知图标**: 点击显示消息列表。
        
        - **用户头像/名称**: 显示当前登录用户的头像和名称。
        
        - **下拉菜单**: 包含“个人设置”、“修改密码”、“退出登录”等选项。
    
    - **主内容区**: `children` 区域，渲染当前路由对应的页面内容，**带内边距**。

### 2.2 仪表盘 (Dashboard - `app/(main)/page.tsx`)

- **布局**: 使用 **Ant Design 的 `Row` 和 `Col` 组件** 进行栅格布局，实现响应式展示。

- **内容**:
  
  - **顶部数据概览卡片**: 一行排列 3-4 个 Ant Design `Card` 组件，每个卡片显示一个关键指标。
    
    - **用户总数**: 显示系统注册用户总数。
    
    - **今日新增用户**: 显示当天新注册用户数量。
    
    - **待处理事项**: 如待审核用户、待处理请求等，点击可跳转到相应列表。
    
    - **活跃用户数**: 近期活跃用户统计。
    
    - **样式**: 使用 Ant Design `Statistic` 组件，配合图标和颜色。
  
  - **中间图表展示区**: 一行排列 2 个图表，各占 12 列 (中等屏幕)。
    
    - **用户增长趋势图**: 折线图，展示用户数量随时间的变化。
    
    - **角色分布饼图**: 饼图，展示不同角色用户的比例。
    
    - **操作类型统计柱状图**: 各类操作在系统中的占比。
    
    - **技术栈**: 可使用 `Ant Design Charts` 或其他图表库 (如 ECharts/Recharts)。
  
  - **底部最新动态/常用功能**:
    
    - **最新操作日志列表**: 显示最近的 N 条系统操作日志，包括操作用户、操作内容、时间。
    
    - **常用功能快捷入口**: 按钮或卡片形式，直接跳转到用户管理、角色管理等常用页面。

---

## 3. 导航与模块设计

### 3.1 面包屑菜单设计 (BreadcrumbNav.tsx)

- **位置**: 集成在 `Header.tsx` 组件中。

- **动态生成**: 根据 `usePathname` 获取当前路由路径，并结合预定义的菜单映射配置来生成面包屑项。

- **可点击性**: 除了当前页面（最后一项），所有面包屑项均可点击并导航至对应路由。

- **路由映射**: 维护一个 `src/lib/constants.ts` 文件，定义路由路径与显示名称的映射关系，例如：
  
  TypeScript
  
  ```
  // src/lib/constants.ts
  export const breadcrumbRoutesMap: { [key: string]: string } = {
    '/': '首页',
    '/users': '用户管理',
    '/users/new': '新增用户',
    '/roles': '角色管理',
    '/roles/new': '新增角色',
    '/permissions': '权限管理',
    '/settings': '系统设置',
    '/settings/notifications': '通知设置',
    '/settings/logs': '日志管理',
    // 动态路由处理示例 (需在组件中获取ID对应的名称)
    // '/users/[id]': '用户详情', // 实际显示为 "用户详情: XXX"
    // '/roles/[id]': '角色详情', // 实际显示为 "角色详情: YYY"
  };
  ```

### 3.2 一级菜单模块及其对应的二级界面与功能

#### 3.2.1 仪表盘 (Dashboard)

- **一级菜单**: **首页** (Icon: `AntDesignOutlined` 或 `DashboardOutlined`)

- **对应二级界面**: 无二级菜单，直接对应主页。

- **主要功能**:
  
  - **数据概览**: 显示用户总数、今日新增用户、待处理事项、活跃用户等核心业务数据统计。
  
  - **可视化图表**: 展示用户增长趋势、角色分布等数据图表。
  
  - **最新动态**: 显示最新操作日志、系统公告等。
  
  - **快捷入口**: 常用功能（如用户列表、新增用户）的快速跳转按钮。

- **路由**: `/`

#### 3.2.2 用户管理 (User Management)

- **一级菜单**: **用户管理** (Icon: `UserOutlined`)

- **对应二级界面**:
  
  - **用户列表页面** (`/users`)
    
    - **主要功能**:
      
      - **表格展示**: 分页显示系统所有用户列表，包含用户名、邮箱、手机号、所属角色（可多选显示，用 Tag 组件）、状态（启用/禁用，用 Switch 或 Badge 显示）、创建时间、最后登录时间等。
      
      - **搜索**: 提供按“用户名”、“邮箱”、“手机号”的模糊搜索。
      
      - **筛选**: 提供按“用户状态”、“所属角色”的筛选（多选）。
      
      - **排序**: 支持按创建时间、最后登录时间进行排序。
      
      - **操作列**:
        
        - **编辑按钮**: 跳转到用户详情/编辑页面 (`/users/[id]`)。
        
        - **禁用/启用开关/按钮**: 切换用户账号启用/禁用状态，附带 `Modal.confirm` 确认提示。
        
        - **重置密码按钮**: 弹出 `Modal.confirm` 确认框，重置密码。
        
        - **删除按钮**: 弹出 `Modal.confirm` 确认框，删除用户。
      
      - **新增用户按钮**: 点击跳转到新增用户页面 (`/users/new`)。
  
  - **用户详情/编辑页面** (`/users/[id]`)
    
    - **主要功能**:
      
      - **基本信息表单**: 预填充用户详细信息（用户名、邮箱、手机号等），支持编辑和校验。
      
      - **角色分配**: 提供多选框或标签组件，可为用户**分配或移除一个或多个角色**。
      
      - **用户状态**: 开关或 Radio，控制用户账号的启用/禁用状态。
      
      - **密码重置**: 独立操作按钮，方便管理员为特定用户重置密码。
      
      - **保存/取消按钮**: 保存修改或取消返回列表页。
  
  - **新增用户页面** (`/users/new`)
    
    - **主要功能**:
      
      - **表单输入**: 收集新用户的用户名、邮箱、手机号、初始密码、确认密码。
      
      - **初始角色分配**: 可选择一个或多个初始角色。
      
      - **提交/取消按钮**: 提交新用户数据或取消返回用户列表。

#### 3.2.3 角色管理 (Role Management)

- **一级菜单**: **角色管理** (Icon: `TeamOutlined`)

- **对应二级界面**:
  
  - **角色列表页面** (`/roles`)
    
    - **主要功能**:
      
      - **表格展示**: 分页显示所有角色，包含角色名称、角色编码（可选）、角色描述、关联用户数量。
      
      - **搜索**: 按角色名称或编码搜索。
      
      - **操作列**:
        
        - **编辑按钮**: 跳转到角色详情/编辑页 (`/roles/[id]`)。
        
        - **删除按钮**: 弹出 `Modal.confirm` 确认框，删除角色。若有用户关联，需提示。
      
      - **新增按钮**: 点击跳转到新增角色页 (`/roles/new`)。
  
  - **角色详情/编辑页面** (`/roles/[id]`)
    
    - **主要功能**:
      
      - **基本信息表单**: 编辑角色名称、角色编码、角色描述。
      
      - **权限配置**:
        
        - **菜单权限**: 使用 Ant Design `Tree` 或 `TreeSelect` 组件，树形结构展示所有系统菜单，通过**勾选/取消勾选**分配菜单访问权限，支持父子联动。
        
        - **功能权限**: 使用 `Checkbox.Group` 或表格，列出所有**原子性的功能操作权限点**，通过**复选框或开关**为当前角色分配这些功能权限。
      
      - **保存/取消按钮**: 保存修改或取消返回角色列表。
  
  - **新增角色页面** (`/roles/new`)
    
    - **主要功能**:
      
      - **基本信息表单**: 输入新角色名称、角色编码、角色描述。
      
      - **初始权限配置**: 与角色详情/编辑页面中的“权限配置”区域功能一致，用于为新角色分配初始菜单和功能权限。
      
      - **提交/取消按钮**: 提交新角色数据或取消返回角色列表。

#### 3.2.4 权限管理 (Permission Management)

- **一级菜单**: **权限管理** (Icon: `SafetyOutlined`)

- **对应二级界面**:
  
  - **权限点列表页面** (`/permissions`)
    
    - **主要功能**:
      
      - **表格展示**: 列出系统中所有**可配置的原子性权限点**。
      
      - **字段**: 权限点名称、权限编码（唯一标识符）、所属模块、权限类型（菜单权限/功能权限）、描述。
      
      - **搜索/筛选 (可选)**: 按权限名称、编码或所属模块进行搜索和筛选。
      
      - **说明**: 此页面主要用于查看和管理系统后台定义的**权限元数据**。这些权限点是角色管理的**权限配置**模块的**数据源**。**初期仅作展示。**

#### 3.2.5 系统设置 (System Settings)

- **一级菜单**: **系统设置** (Icon: `SettingOutlined`)

- **对应二级界面**:
  
  - **通用设置页面** (`/settings`)
    
    - **主要功能**:
      
      - **表单配置**: 配置系统名称、Logo 上传、备案信息、版权信息等。
      
      - **保存按钮**: 保存通用设置。
  
  - **通知设置页面** (`/settings/notifications`)
    
    - **主要功能**:
      
      - **通知模板管理**: 管理邮件、短信、站内信等通知模板（列表、编辑、新增）。
      
      - **通知策略配置**: 配置特定事件是否发送通知。
  
  - **日志管理页面** (`/settings/logs`)
    
    - **主要功能**:
      
      - **操作日志列表**: 分页显示所有用户的操作日志，包含操作人、操作时间、操作模块、操作内容、IP 地址等。支持搜索和筛选。
      
      - **登录日志列表**: 分页显示用户登录登出日志，包含用户名、登录时间、登录 IP、登录状态。支持搜索和筛选。

---

## 4. 通用功能和约定

### 4.1 认证与授权 (Authentication & Authorization)

#### 4.1.1 登录页面 (`app/login/page.tsx`)

- **布局**:
  
  - 页面采用 **Flexbox 布局**，实现内容**垂直和水平居中**。
  
  - 登录区域使用 **Ant Design 的 `Card` 组件**，卡片宽度固定 (例如 `400px`)，居中显示。
  
  - 卡片内包含：
    
    - **标题**: 例如 "B端管理系统登录"。
    
    - **登录表单**: 使用 **Ant Design `Form` 组件**。
      
      - **用户名输入框**: `Input` 组件，绑定 `name="username"`, `rules: [{ required: true, message: '请输入用户名!' }]`。
      
      - **密码输入框**: `Input.Password` 组件，绑定 `name="password"`, `rules: [{ required: true, message: '请输入密码!' }]`。
      
      - **登录按钮**: `Button` 组件，类型为 `primary`，宽度占满表单。
      
      - **找回密码/注册链接 (可选)**: 底部小字链接。

- **模拟登录逻辑**:
  
  - **预设凭证**:
    
    - **用户名**: `admin`
    
    - **密码**: `12345`
  
  - **表单提交**:
    
    - 当用户点击登录按钮时，获取表单中的用户名和密码。
    
    - **客户端验证**: 检查输入的用户名是否为 `admin` 且密码是否为 `12345`。
    
    - **成功情况**: 如果验证通过，模拟登录成功，调用 `router.push('/')` 跳转到仪表盘页面。同时，**模拟存储一个 JWT token 到 `localStorage`** (例如 `localStorage.setItem('token', 'mock_jwt_token')`)，以便后续路由守卫判断登录状态。
    
    - **失败情况**: 如果验证失败，使用 **Ant Design `message.error()`** 提示 "用户名或密码错误！"。
  
  - **状态管理**: 使用 `useState` 管理表单的加载状态 (`loading`)，在提交期间禁用按钮。

#### 4.1.2 前端路由守卫

- **未登录**: 访问受保护路由时 (例如 `/`, `/users`)，检查 `localStorage` 中是否存在 `token`。如果不存在或无效，重定向到登录页 (`/login`)。

- **已登录**: 访问登录页 (`/login`) 时，如果 `localStorage` 中存在有效 `token`，则重定向到仪表盘 (`/`)。

#### 4.1.3 API 路由保护

- 所有需要认证的 API 路由都应进行 JWT 验证 (后端逻辑)。

### 4.2 响应式设计

- **Ant Design 栅格系统**: 广泛应用于页面布局，确保在不同屏幕尺寸下（桌面、平板、手机）良好展示。

- **媒体查询**: 根据需要使用 CSS 媒体查询进行精细调整。

- **移动端优化**: 针对小屏幕，调整表格显示方式（如卡片式列表）、表单布局、菜单显示（如抽屉菜单）。

### 4.3 全局组件与工具

- **API 请求封装**: `lib/api.ts`，统一处理请求头、错误码、加载状态、重试机制等。

- **全局加载指示器**: `components/GlobalLoading.tsx`，在数据请求期间显示加载动画。

- **消息通知**: 使用 Ant Design `message` 和 `notification` 组件统一提示用户操作结果和系统消息。

- **模态框/抽屉**: 统一使用 Ant Design `Modal` 和 `Drawer` 组件进行确认、新增、编辑等操作。

### 4.4 状态管理

- **轻量级**: 优先使用 React `useState` 和 `useContext`。

- **全局状态**: 对于跨组件共享的全局状态（如用户信息、主题设置），可考虑使用 Zustand 或 Jotai。

### 4.5 代码规范与维护

- **TypeScript**: 强制类型检查，定义清晰的接口和类型。

- **ESLint & Prettier**: 配置代码风格和格式化规则。

- **组件化**: 封装可复用组件，提高开发效率和代码一致性。

- **测试 (可选，但推荐)**: 单元测试和集成测试 (如 Jest, React Testing Library)。

---

## 5. AI 生成执行要求

请 AI **从零开始**，基于上述所有详细描述，生成一个 Next.js (App Router), React, Ant Design, TypeScript 的 B 端管理系统项目。

1. **初始化项目**: 使用 `npx create-next-app@latest` 命令创建项目，并配置 TypeScript、ESLint、Tailwind CSS (如果 AI 能集成)。

2. **目录结构**: 严格按照 `1.2 目录结构` 中定义的层级创建所有文件和文件夹。

3. **基础布局**: 实现 `2.1 主布局` 中 `MainLayout` 的结构，包括侧边栏、顶部 Header、内容区。

4. **导航菜单**: 根据 `3.2 一级菜单模块及其对应的二级界面与功能` 中的描述，实现侧边栏菜单，并确保路由正确。

5. **面包屑组件**: 实现 `components/BreadcrumbNav.tsx` 组件，并集成到 Header 中，确保能根据 `3.1 面包屑菜单设计` 的规则动态显示。

6. **仪表盘页面**: 按照 `2.2 仪表盘` 的描述，构建 `/app/(main)/page.tsx`，包含数据卡片和占位图表区域。数据可使用 Mock 数据。

7. **用户管理模块**: 严格按照 `3.2.2 用户管理` 的详细描述，创建 `/app/(main)/users/` 下的 `page.tsx`, `[id]/page.tsx`, `new/page.tsx` 文件，包含基础的表格和表单结构。表格使用 Ant Design Table，表单使用 Ant Design Form。

8. **角色管理模块**: 严格按照 `3.2.3 角色管理` 的详细描述，创建 `/app/(main)/roles/` 下的 `page.tsx`, `[id]/page.tsx`, `new/page.tsx` 文件，包含基础的角色列表和角色编辑/新增表单结构。角色编辑/新增页面中的权限配置应包含**菜单权限树**和**功能权限复选框**的占位组件（使用 Ant Design `Tree` 和 `Checkbox.Group` 配合以下 Mock 数据）。

9. **权限管理模块**: 严格按照 `3.2.4 权限管理` 的详细描述，创建 `/app/(main)/permissions/page.tsx` 文件，包含一个展示权限点列表的基础表格。数据使用以下 Mock 数据。

10. **系统设置模块**: 创建 `/app/(main)/settings/` 下的 `page.tsx`, `notifications/page.tsx`, `logs/page.tsx` 文件，包含基础的表单或列表结构。

11. **登录页面**: 严格按照 `4.1.1 登录页面` 的描述，实现 `/app/login/page.tsx`，包括居中卡片式布局、用户名和密码输入框、登录按钮，并实现 `admin/12345` 的模拟登录逻辑及页面跳转。

12. **API 路由**: 为用户管理、角色管理和权限管理创建基础的 Next.js API Routes (仅占位文件，无需实现复杂逻辑)。

13. **通用组件**: 创建 `components/Layout/` 下的布局组件，以及 `components/BreadcrumbNav.tsx`, `components/Table/GeneralTable.tsx` (基础封装), `components/Form/GeneralForm.tsx` (基础封装), `components/DashboardCard.tsx` (基础卡片) 等通用组件的占位文件或简单实现。

14. **工具库**: 创建 `lib/` 下的 `api.ts`, `auth.ts`, `constants.ts`, `utils.ts`, `types.ts` 占位文件，并包含以下 Mock 权限数据。

15. **响应式**: 确保所有布局和组件都考虑响应式设计。

16. **TypeScript**: 所有文件都应使用 `.tsx` 或 `.ts` 扩展名，并尽可能使用 TypeScript 类型定义。

17. **代码注释**: 在关键文件和复杂逻辑处添加简要注释。

### 5.1 模拟权限数据 (用于 `lib/constants.ts` 或 `mock/data.ts`)

TypeScript

```
// 模拟菜单权限数据，用于侧边栏和角色权限配置中的菜单树
export const MOCK_MENU_PERMISSIONS = [
  { key: 'dashboard', title: '首页', path: '/', icon: 'DashboardOutlined' },
  { key: 'user_management', title: '用户管理', path: '/users', icon: 'UserOutlined', children: [
    { key: 'user_list', title: '用户列表', path: '/users' },
    { key: 'user_detail', title: '用户详情', path: '/users/[id]', hidden: true }, // hidden表示菜单不显示，但路径存在
    { key: 'user_add', title: '新增用户', path: '/users/new', hidden: true },
  ]},
  { key: 'role_management', title: '角色管理', path: '/roles', icon: 'TeamOutlined', children: [
    { key: 'role_list', title: '角色列表', path: '/roles' },
    { key: 'role_detail', title: '角色详情', path: '/roles/[id]', hidden: true },
    { key: 'role_add', title: '新增角色', path: '/roles/new', hidden: true },
  ]},
  { key: 'permission_management', title: '权限管理', path: '/permissions', icon: 'SafetyOutlined' },
  { key: 'system_settings', title: '系统设置', path: '/settings', icon: 'SettingOutlined', children: [
    { key: 'general_settings', title: '通用设置', path: '/settings' },
    { key: 'notification_settings', title: '通知设置', path: '/settings/notifications' },
    { key: 'log_management', title: '日志管理', path: '/settings/logs' },
  ]},
];

// 模拟功能权限数据，用于角色权限配置中的功能权限列表和权限管理页面
export const MOCK_FUNCTION_PERMISSIONS = [
  { code: 'user:list', name: '用户列表-查看', module: '用户管理', type: '功能', description: '查看用户列表的基本信息' },
  { code: 'user:add', name: '用户管理-新增用户', module: '用户管理', type: '功能', description: '添加新用户到系统' },
  { code: 'user:edit', name: '用户管理-编辑用户', module: '用户管理', type: '功能', description: '修改用户基本资料和角色' },
  { code: 'user:delete', name: '用户管理-删除用户', module: '用户管理', type: '功能', description: '从系统中删除用户' },
  { code: 'user:reset_password', name: '用户管理-重置密码', module: '用户管理', type: '功能', description: '管理员重置用户密码' },

  { code: 'role:list', name: '角色列表-查看', module: '角色管理', type: '功能', description: '查看角色列表' },
  { code: 'role:add', name: '角色管理-新增角色', module: '角色管理', type: '功能', description: '创建新角色' },
  { code: 'role:edit', name: '角色管理-编辑角色', module: '角色管理', type: '功能', description: '修改角色信息及权限' },
  { code: 'role:delete', name: '角色管理-删除角色', module: '角色管理', type: '功能', description: '删除角色' },

  { code: 'permission:list', name: '权限管理-查看权限点', module: '权限管理', type: '功能', description: '查看系统所有权限点的元数据' },

  { code: 'setting:general', name: '系统设置-通用设置', module: '系统设置', type: '功能', description: '管理系统通用配置' },
  { code: 'setting:notification', name: '系统设置-通知设置', module: '系统设置', type: '功能', description: '管理通知模板和策略' },
  { code: 'setting:log', name: '系统设置-日志查看', module: '系统设置', type: '功能', description: '查看系统操作日志和登录日志' },
];
```
