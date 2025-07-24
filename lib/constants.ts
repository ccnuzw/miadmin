// Define your constants here
export const SITE_NAME = 'MiAdmin';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

// 组织/部门树数据类型 - 更新以包含 type
export type OrgTreeNode = {
  key: string;
  title: string;
  type: 'orgUnit' | 'department'; // 新增类型字段
  children?: OrgTreeNode[];
  parentId?: string; // 可选，方便查找上级
  // 更多组织单元/部门相关属性
  code?: string;
  managerId?: string; // 负责人用户ID
  description?: string;
  // 如果是组织单元，可以有更多特定属性，如区域等
  unitType?: 'headquarters' | 'region' | 'branch' | 'division'; // 组织单元的细分类型
};

export type DepartmentMember = {
  userId: string;
  username: string;
  employeeId: string;
  contact: string;
  assignedRoleNames: string[];
};

export type MenuItem = {
  key: string;
  label: string;
  path: string;
  icon?: string;
  children?: MenuItem[];
  hidden?: boolean;
};

// 模拟组织部门树数据 - 更复杂的多级混合结构
export const MOCK_ORGANIZATION_STRUCTURE_TREE_DATA: OrgTreeNode[] = [
  {
    key: 'org-hq',
    title: '全球总部',
    type: 'orgUnit',
    unitType: 'headquarters',
    code: 'HQ',
    description: '公司核心管理机构',
    children: [
      {
        key: 'org-north',
        title: '北方大区',
        type: 'orgUnit',
        unitType: 'region',
        code: 'NORTH_REGION',
        description: '负责北方区域业务',
        parentId: 'org-hq',
        children: [
          {
            key: 'org-bj',
            title: '北京分公司',
            type: 'orgUnit',
            unitType: 'branch',
            code: 'BJ_BRANCH',
            description: '北京区域业务中心',
            parentId: 'org-north',
            children: [
              {
                key: 'dept-bj-sales',
                title: '销售部',
                type: 'department',
                code: 'BJ_SALES',
                description: '北京区域销售',
                parentId: 'org-bj',
              },
              {
                key: 'dept-bj-hr',
                title: '人力资源部',
                type: 'department',
                code: 'BJ_HR',
                description: '北京区域人力',
                parentId: 'org-bj',
              },
            ],
          },
          {
            key: 'dept-north-rd',
            title: '北方研发中心',
            type: 'department',
            code: 'NORTH_RD',
            description: '北方区域技术研发',
            parentId: 'org-north',
            children: [
                { key: 'dept-north-rd-fe', title: '前端组', type: 'department', code: 'NORTH_FE', parentId: 'dept-north-rd' },
                { key: 'dept-north-rd-be', title: '后端组', type: 'department', code: 'NORTH_BE', parentId: 'dept-north-rd' },
            ]
          },
        ],
      },
      {
        key: 'org-south',
        title: '南方大区',
        type: 'orgUnit',
        unitType: 'region',
        code: 'SOUTH_REGION',
        description: '负责南方区域业务',
        parentId: 'org-hq',
        children: [
          {
            key: 'org-sh',
            title: '上海分公司',
            type: 'orgUnit',
            unitType: 'branch',
            code: 'SH_BRANCH',
            description: '上海区域业务中心',
            parentId: 'org-south',
            children: [
              {
                key: 'dept-sh-marketing',
                title: '市场部',
                type: 'department',
                code: 'SH_MKT',
                description: '上海区域市场推广',
                parentId: 'org-sh',
              },
            ],
          },
        ],
      },
      {
        key: 'dept-hq-finance',
        title: '财务部',
        type: 'department',
        code: 'HQ_FINANCE',
        description: '集团财务管理',
        parentId: 'org-hq',
      },
    ],
  },
  {
    key: 'org-subsidiary',
    title: '智慧云子公司',
    type: 'orgUnit',
    unitType: 'branch', // 独立子公司视为一种分支组织单元
    code: 'ZW_CLOUD',
    description: '独立运营的云计算业务',
    children: [
      { key: 'dept-cloud-dev', title: '云产品研发部', type: 'department', code: 'CLOUD_DEV', parentId: 'org-subsidiary' },
      { key: 'dept-cloud-ops', title: '云运维部', type: 'department', code: 'CLOUD_OPS', parentId: 'org-subsidiary' },
    ],
  },
];


// 模拟角色数据 (用于用户分配角色) - 保持不变
export const MOCK_ROLES = [
  { id: 'role-admin', name: '系统管理员' },
  { id: 'role-manager', name: '部门经理' }, // 可以关联到部门负责人
  { id: 'role-developer', name: '开发人员' },
  { id: 'role-guest', name: '访客' },
  { id: 'role-product', name: '产品经理' },
  { id: 'role-hr', name: '人力资源' },
  { id: 'role-sales', name: '销售人员' }, // 新增
  { id: 'role-marketing', name: '市场人员' }, // 新增
];

// 模拟部门成员数据 (用于部门详情页列表)
// 结构更新：使用部门的key作为键，value是该部门下的成员列表
export const MOCK_DEPARTMENT_MEMBERS: { [deptKey: string]: DepartmentMember[] } = {
  'dept-bj-sales': [ // 北京分公司销售部成员
    { userId: 'user-001', username: '张三', employeeId: 'E001', contact: '13812345678', assignedRoleNames: ['销售人员'] },
    { userId: 'user-004', username: '刘丽', employeeId: 'E004', contact: '13611112222', assignedRoleNames: ['访客'] },
  ],
  'dept-bj-hr': [ // 北京分公司人力资源部成员
    { userId: 'user-005', username: '赵敏', employeeId: 'E005', contact: '13733334444', assignedRoleNames: ['人力资源'] },
  ],
  'dept-north-rd-fe': [ // 北方研发中心前端组
    { userId: 'user-002', username: '李四', employeeId: 'E002', contact: '13987654321', assignedRoleNames: ['开发人员'] },
  ],
  'dept-hq-finance': [ // 总部财务部
    { userId: 'user-006', username: '钱德勒', employeeId: 'E006', contact: '13098765432', assignedRoleNames: ['部门经理'] },
  ],
  'dept-cloud-dev': [ // 智慧云子公司云产品研发部
    { userId: 'user-007', username: '孙悟空', employeeId: 'E007', contact: '15912345678', assignedRoleNames: ['开发人员'] },
  ]
  // ... 其他部门的成员
};


// 菜单权限数据 (组织架构菜单，保持不变)
export const MOCK_MENU_PERMISSIONS: MenuItem[] = [
  {
    key: 'dashboard_showcase',
    label: '仪表盘展示',
    path: '/dashboard',
    icon: 'DashboardOutlined',
    children: [
      { key: 'dashboard', label: '首页', path: '/' },
      { key: 'new-dashboard', label: '新仪表盘', path: '/new-dashboard' },
      { key: 'component-showcase', label: '组件展示', path: '/component-showcase' },
      { key: 'list-showcase', label: '列表展示', path: '/list-showcase' },
    ],
  },
  { key: 'user_management', label: '用户管理', path: '/users', icon: 'UserOutlined', children: [
    { key: 'user_list', label: '用户列表', path: '/users' },
    { key: 'user_detail', label: '用户详情', path: '/users/[id]', hidden: true },
    { key: 'user_add', label: '新增用户', path: '/users/new', hidden: true },
  ]},
  { key: 'role_management', label: '角色管理', path: '/roles', icon: 'TeamOutlined', children: [
    { key: 'role_list', label: '角色列表', path: '/roles' },
    { key: 'role_detail', label: '角色详情', path: '/roles/[id]', hidden: true },
    { key: 'role_add', label: '新增角色', path: '/roles/new', hidden: true },
  ]},
  { key: 'org_management', label: '组织架构', path: '/org/structure', icon: 'DeploymentUnitOutlined', children: [
    { key: 'org_structure', label: '组织结构管理', path: '/org/structure' },
  ]},
  { key: 'permission_management', label: '权限管理', path: '/permissions', icon: 'SafetyOutlined' },
  { key: 'system_settings', label: '系统设置', path: '/settings', icon: 'SettingOutlined', children: [
    { key: 'general_settings', label: '通用设置', path: '/settings' },
    { key: 'notification_settings', label: '通知设置', path: '/settings/notifications' },
    { key: 'log_management', label: '日志管理', path: '/settings/logs' },
  ]},
];

// 功能权限数据 (组织架构相关权限，保持不变)
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

  { code: 'org:structure:list', name: '组织结构-查看', module: '组织架构', type: '功能', description: '查看组织部门结构树和部门详情' },
  { code: 'org:structure:add_org_unit', name: '组织结构-新增组织单元', module: '组织架构', type: '功能', description: '新增顶级或子级组织单元' },
  { code: 'org:structure:add_department', name: '组织结构-新增部门', module: '组织架构', type: '功能', description: '在组织单元或部门下新增部门' },
  { code: 'org:structure:edit', name: '组织结构-编辑组织/部门', module: '组织架构', type: '功能', description: '编辑组织单元或部门信息' },
  { code: 'org:structure:delete', name: '组织结构-删除组织/部门', module: '组织架构', type: '功能', description: '删除组织单元或部门' },
  { code: 'org:structure:member_add', name: '组织结构-添加成员', module: '组织架构', type: '功能', description: '将用户添加到部门' },
  { code: 'org:structure:member_remove', name: '组织结构-移除成员', module: '组织架构', type: '功能', description: '将用户从部门移除' },

  { code: 'permission:list', name: '权限管理-查看权限点', module: '权限管理', type: '功能', description: '查看系统所有权限点的元数据' },

  { code: 'setting:general', name: '系统设置-通用设置', module: '系统设置', type: '功能', description: '管理系统通用配置' },
  { code: 'setting:notification', name: '系统设置-通知设置', module: '系统设置', type: '功能', description: '管理通知模板和策略' },
  { code: 'setting:log', name: '系统设置-日志查看', module: '系统设置', type: '功能', description: '查看系统操作日志和登录日志' },
];

// 面包屑路由映射 (保持不变)
export const breadcrumbRoutesMap: { [key: string]: string } = {
  '/': '首页',
  '/users': '用户管理',
  '/users/new': '新增用户',
  '/roles': '角色管理',
  '/roles/new': '新增角色',
  '/org': '组织架构',
  '/org/structure': '组织结构管理',
  '/permissions': '权限管理',
  '/settings': '系统设置',
  '/settings/notifications': '通知设置',
  '/settings/logs': '日志管理',
};