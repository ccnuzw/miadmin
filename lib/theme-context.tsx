"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ThemePreset } from './theme-presets'; // 导入 ThemePreset 类型

export type LayoutType = 'default' | 'classic' | 'single-column' | 'two-column';

interface ThemeContextType {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  borderRadius: number;
  setBorderRadius: (radius: number) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  colorSuccess: string;
  setColorSuccess: (color: string) => void;
  colorWarning: string;
  setColorWarning: (color: string) => void;
  colorError: string;
  setColorError: (color: string) => void;
  colorInfo: string;
  setColorInfo: (color: string) => void;
  colorText: string;
  setColorText: (color: string) => void;
  colorTextSecondary: string;
  setColorTextSecondary: (color: string) => void;
  colorBgContainer: string;
  setColorBgContainer: (color: string) => void;
  colorBgLayout: string;
  setColorBgLayout: (color: string) => void;
  colorBorder: string;
  setColorBorder: (color: string) => void;
  fontSizeLG: number;
  setFontSizeLG: (size: number) => void;
  fontSizeSM: number;
  setFontSizeSM: (size: number) => void;
  lineHeight: number;
  setLineHeight: (height: number) => void;
  marginMD: number;
  setMarginMD: (margin: number) => void;
  paddingMD: number;
  setPaddingMD: (padding: number) => void;
  borderRadiusSM: number;
  setBorderRadiusSM: (radius: number) => void;
  borderRadiusLG: number;
  setBorderRadiusLG: (radius: number) => void;
  lineWidth: number;
  setLineWidth: (width: number) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  controlHeight: number;
  setControlHeight: (height: number) => void;
  applyPreset: (preset: ThemePreset) => void; // 添加 applyPreset 到接口
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [layout, setLayoutState] = useState<LayoutType>('default');
  const [primaryColor, setPrimaryColorState] = useState<string>('#1677FF');
  const [borderRadius, setBorderRadiusState] = useState<number>(6);
  const [darkMode, setDarkModeState] = useState<boolean>(false);
  const [colorSuccess, setColorSuccessState] = useState<string>('#52c41a');
  const [colorWarning, setColorWarningState] = useState<string>('#faad14');
  const [colorError, setColorErrorState] = useState<string>('#ff4d4f');
  const [colorInfo, setColorInfoState] = useState<string>('#1677ff');
  const [colorText, setColorTextState] = useState<string>('#000000E0');
  const [colorTextSecondary, setColorTextSecondaryState] = useState<string>('#000000A6');
  const [colorBgContainer, setColorBgContainerState] = useState<string>('#FFFFFF');
  const [colorBgLayout, setColorBgLayoutState] = useState<string>('#F5F5F5');
  const [colorBorder, setColorBorderState] = useState<string>('#D9D9D9');
  const [fontSizeLG, setFontSizeLGState] = useState<number>(16);
  const [fontSizeSM, setFontSizeSMState] = useState<number>(12);
  const [lineHeight, setLineHeightState] = useState<number>(1.57);
  const [marginMD, setMarginMDState] = useState<number>(16);
  const [paddingMD, setPaddingMDState] = useState<number>(16);
  const [borderRadiusSM, setBorderRadiusSMState] = useState<number>(4);
  const [borderRadiusLG, setBorderRadiusLGState] = useState<number>(8);
  const [lineWidth, setLineWidthState] = useState<number>(1);
  const [fontSize, setFontSizeState] = useState<number>(14);
  const [controlHeight, setControlHeightState] = useState<number>(32);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLayoutState((localStorage.getItem('theme-layout') as LayoutType) || 'default');
      setPrimaryColorState(localStorage.getItem('theme-primary-color') || '#1677FF');
      setBorderRadiusState(Number(localStorage.getItem('theme-border-radius')) || 6);
      setDarkModeState(localStorage.getItem('theme-dark-mode') === 'true');
      setColorSuccessState(localStorage.getItem('theme-color-success') || '#52c41a');
      setColorWarningState(localStorage.getItem('theme-color-warning') || '#faad14');
      setColorErrorState(localStorage.getItem('theme-color-error') || '#ff4d4f');
      setColorInfoState(localStorage.getItem('theme-color-info') || '#1677ff');
      setColorTextState(localStorage.getItem('theme-color-text') || '#000000E0');
      setColorTextSecondaryState(localStorage.getItem('theme-color-text-secondary') || '#000000A6');
      setColorBgContainerState(localStorage.getItem('theme-color-bg-container') || '#FFFFFF');
      setColorBgLayoutState(localStorage.getItem('theme-color-bg-layout') || '#F5F5F5');
      setColorBorderState(localStorage.getItem('theme-color-border') || '#D9D9D9');
      setFontSizeLGState(Number(localStorage.getItem('theme-font-size-lg')) || 16);
      setFontSizeSMState(Number(localStorage.getItem('theme-font-size-sm')) || 12);
      setLineHeightState(Number(localStorage.getItem('theme-line-height')) || 1.57);
      setMarginMDState(Number(localStorage.getItem('theme-margin-md')) || 16);
      setPaddingMDState(Number(localStorage.getItem('theme-padding-md')) || 16);
      setBorderRadiusSMState(Number(localStorage.getItem('theme-border-radius-sm')) || 4);
      setBorderRadiusLGState(Number(localStorage.getItem('theme-border-radius-lg')) || 8);
      setLineWidthState(Number(localStorage.getItem('theme-line-width')) || 1);
      setFontSizeState(Number(localStorage.getItem('theme-font-size')) || 14);
      setControlHeightState(Number(localStorage.getItem('theme-control-height')) || 32);
    }
  }, []);

  const setLayout = (value: LayoutType) => {
    setLayoutState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-layout', value);
  };
  const setPrimaryColor = (value: string) => {
    setPrimaryColorState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-primary-color', value);
  };
  const setBorderRadius = (value: number) => {
    setBorderRadiusState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-border-radius', String(value));
  };
  const setDarkMode = (value: boolean) => {
    setDarkModeState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-dark-mode', String(value));
  };
  const setColorSuccess = (value: string) => {
    setColorSuccessState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-color-success', value);
  };
  const setColorWarning = (value: string) => {
    setColorWarningState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-color-warning', value);
  };
  const setColorError = (value: string) => {
    setColorErrorState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-color-error', value);
  };
  const setColorInfo = (value: string) => {
    setColorInfoState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-color-info', value);
  };
  const setColorText = (value: string) => {
    setColorTextState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-color-text', value);
  };
  const setColorTextSecondary = (value: string) => {
    setColorTextSecondaryState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-color-text-secondary', value);
  };
  const setColorBgContainer = (value: string) => {
    setColorBgContainerState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-color-bg-container', value);
  };
  const setColorBgLayout = (value: string) => {
    setColorBgLayoutState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-color-bg-layout', value);
  };
  const setColorBorder = (value: string) => {
    setColorBorderState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-color-border', value);
  };
  const setFontSizeLG = (value: number) => {
    setFontSizeLGState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-font-size-lg', String(value));
  };
  const setFontSizeSM = (value: number) => {
    setFontSizeSMState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-font-size-sm', String(value));
  };
  const setLineHeight = (value: number) => {
    setLineHeightState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-line-height', String(value));
  };
  const setMarginMD = (value: number) => {
    setMarginMDState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-margin-md', String(value));
  };
  const setPaddingMD = (value: number) => {
    setPaddingMDState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-padding-md', String(value));
  };
  const setBorderRadiusSM = (value: number) => {
    setBorderRadiusSMState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-border-radius-sm', String(value));
  };
  const setBorderRadiusLG = (value: number) => {
    setBorderRadiusLGState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-border-radius-lg', String(value));
  };
  const setLineWidth = (value: number) => {
    setLineWidthState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-line-width', String(value));
  };
  const setFontSize = (value: number) => {
    setFontSizeState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-font-size', String(value));
  };
  const setControlHeight = (value: number) => {
    setControlHeightState(value);
    if (typeof window !== 'undefined') localStorage.setItem('theme-control-height', String(value));
  };

  // 新增 applyPreset 函数
  const applyPreset = (preset: ThemePreset) => {
    setLayout(preset.layoutType);
    setPrimaryColor(preset.colors.primaryColor);
    setColorSuccess(preset.colors.colorSuccess);
    setColorWarning(preset.colors.colorWarning);
    setColorError(preset.colors.colorError);
    setColorInfo(preset.colors.colorInfo);
    setColorText(preset.colors.colorText);
    setColorTextSecondary(preset.colors.colorTextSecondary);
    setColorBgContainer(preset.colors.colorBgContainer);
    setColorBgLayout(preset.colors.colorBgLayout);
    setColorBorder(preset.colors.colorBorder);
    setFontSize(preset.typography.fontSize);
    setFontSizeLG(preset.typography.fontSizeLG);
    setFontSizeSM(preset.typography.fontSizeSM);
    setLineHeight(preset.typography.lineHeight);
    setMarginMD(preset.spacing.marginMD);
    setPaddingMD(preset.spacing.paddingMD);
    setBorderRadius(preset.borders.borderRadius); // 基础圆角
    setBorderRadiusSM(preset.borders.borderRadiusSM);
    setBorderRadiusLG(preset.borders.borderRadiusLG);
    setLineWidth(preset.borders.lineWidth);
    setControlHeight(preset.controls.controlHeight);
    setDarkMode(preset.mode.darkMode);
  };

  return (
    <ThemeContext.Provider value={{
      layout, setLayout,
      primaryColor, setPrimaryColor,
      borderRadius, setBorderRadius,
      darkMode, setDarkMode,
      colorSuccess, setColorSuccess,
      colorWarning, setColorWarning,
      colorError, setColorError,
      colorInfo, setColorInfo,
      colorText, setColorText,
      colorTextSecondary, setColorTextSecondary,
      colorBgContainer, setColorBgContainer,
      colorBgLayout, setColorBgLayout,
      colorBorder, setColorBorder,
      fontSizeLG, setFontSizeLG,
      fontSizeSM, setFontSizeSM,
      lineHeight, setLineHeight,
      marginMD, setMarginMD,
      paddingMD, setPaddingMD,
      borderRadiusSM, setBorderRadiusSM,
      borderRadiusLG, setBorderRadiusLG,
      lineWidth, setLineWidth,
      fontSize, setFontSize,
      controlHeight, setControlHeight,
      applyPreset, // 暴露 applyPreset
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};