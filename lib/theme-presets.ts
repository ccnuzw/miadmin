
import { LayoutType } from './theme-context';

export interface ThemePreset {
  name: string;
  description: string;
  colors: {
    primaryColor: string;
    colorSuccess: string;
    colorWarning: string;
    colorError: string;
    colorInfo: string;
    colorText: string;
    colorTextSecondary: string;
    colorBgContainer: string;
    colorBgLayout: string;
    colorBorder: string;
  };
  typography: {
    fontSize: number;
    fontSizeLG: number;
    fontSizeSM: number;
    lineHeight: number;
  };
  spacing: {
    marginMD: number;
    paddingMD: number;
  };
  borders: {
    borderRadius: number;
    borderRadiusSM: number;
    borderRadiusLG: number;
    lineWidth: number;
  };
  controls: {
    controlHeight: number;
  };
  mode: {
    darkMode: boolean;
  };
  layoutType: LayoutType; // 预设中也包含布局类型
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    name: "活力蓝调",
    description: "现代、充满活力的蓝色主题",
    colors: {
      primaryColor: "#1890ff",
      colorSuccess: "#52c41a",
      colorWarning: "#faad14",
      colorError: "#ff4d4f",
      colorInfo: "#1890ff",
      colorText: "#333333",
      colorTextSecondary: "#666666",
      colorBgContainer: "#ffffff",
      colorBgLayout: "#f0f2f5",
      colorBorder: "#d9d9d9",
    },
    typography: {
      fontSize: 14,
      fontSizeLG: 16,
      fontSizeSM: 12,
      lineHeight: 1.57,
    },
    spacing: {
      marginMD: 16,
      paddingMD: 16,
    },
    borders: {
      borderRadius: 6,
      borderRadiusSM: 4,
      borderRadiusLG: 8,
      lineWidth: 1,
    },
    controls: {
      controlHeight: 32,
    },
    mode: {
      darkMode: false,
    },
    layoutType: "default",
  },
  {
    name: "静谧灰阶",
    description: "简洁、沉稳的灰色主题",
    colors: {
      primaryColor: "#595959",
      colorSuccess: "#69b1ff",
      colorWarning: "#ffc53d",
      colorError: "#ff7875",
      colorInfo: "#9254de",
      colorText: "#262626",
      colorTextSecondary: "#595959",
      colorBgContainer: "#f5f5f5",
      colorBgLayout: "#e8e8e8",
      colorBorder: "#bfbfbf",
    },
    typography: {
      fontSize: 13,
      fontSizeLG: 15,
      fontSizeSM: 11,
      lineHeight: 1.6,
    },
    spacing: {
      marginMD: 12,
      paddingMD: 12,
    },
    borders: {
      borderRadius: 4,
      borderRadiusSM: 2,
      borderRadiusLG: 6,
      lineWidth: 1,
    },
    controls: {
      controlHeight: 30,
    },
    mode: {
      darkMode: false,
    },
    layoutType: "default",
  },
  {
    name: "深海魅影",
    description: "舒适的夜间深色主题",
    colors: {
      primaryColor: "#108ee9",
      colorSuccess: "#36cfc9",
      colorWarning: "#ffc53d",
      colorError: "#f5222d",
      colorInfo: "#108ee9",
      colorText: "#e6e6e6",
      colorTextSecondary: "#b0b0b0",
      colorBgContainer: "#141414",
      colorBgLayout: "#001529",
      colorBorder: "#434343",
    },
    typography: {
      fontSize: 14,
      fontSizeLG: 16,
      fontSizeSM: 12,
      lineHeight: 1.57,
    },
    spacing: {
      marginMD: 16,
      paddingMD: 16,
    },
    borders: {
      borderRadius: 6,
      borderRadiusSM: 4,
      borderRadiusLG: 8,
      lineWidth: 1,
    },
    controls: {
      controlHeight: 32,
    },
    mode: {
      darkMode: true,
    },
    layoutType: "default",
  },
  {
    name: "专业雅致",
    description: "经典、专业的商务主题",
    colors: {
      primaryColor: "#007AFF",
      colorSuccess: "#34C759",
      colorWarning: "#FF9500",
      colorError: "#FF3B30",
      colorInfo: "#5AC8FA",
      colorText: "#1C1C1E",
      colorTextSecondary: "#6A6A6A",
      colorBgContainer: "#FFFFFF",
      colorBgLayout: "#F2F2F7",
      colorBorder: "#E0E0E0",
    },
    typography: {
      fontSize: 15,
      fontSizeLG: 17,
      fontSizeSM: 13,
      lineHeight: 1.4,
    },
    spacing: {
      marginMD: 16,
      paddingMD: 16,
    },
    borders: {
      borderRadius: 8,
      borderRadiusSM: 4,
      borderRadiusLG: 12,
      lineWidth: 1,
    },
    controls: {
      controlHeight: 36,
    },
    mode: {
      darkMode: false,
    },
    layoutType: "default",
  },
];
