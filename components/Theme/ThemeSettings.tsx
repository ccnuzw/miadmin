
"use client";

import React, { useState, useEffect } from 'react';
import { Button, Modal, Radio, Space, Input, Slider, Switch, Divider, Row, Col, theme, ColorPicker, Card } from 'antd';
import { SettingOutlined, BulbOutlined } from '@ant-design/icons';
import {
  useTheme,
  LayoutType,
} from '@/lib/theme-context';
import { THEME_PRESETS, ThemePreset } from '@/lib/theme-presets';

// 辅助组件：颜色设置项
interface ColorSettingItemProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const ColorSettingItem: React.FC<ColorSettingItemProps> = ({ label, value, onChange }) => {
  const [tempColor, setTempColor] = useState(value);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    setTempColor(value); // 当外部 value 变化时，更新临时颜色
  }, [value]);

  const handleColorChange = (color: any) => {
    // ColorPicker 的 onChange 返回的是 Color 对象，需要转换为 hex 字符串
    setTempColor(typeof color === 'string' ? color : color.toHexString());
  };

  const handleConfirm = () => {
    onChange(tempColor);
    setPickerOpen(false);
  };

  const handleCancel = () => {
    setTempColor(value); // 恢复到原始值
    setPickerOpen(false);
  };

  return (
    <Col span={12}>
      <label>{label}:</label>
      <Space>
        <ColorPicker
          value={tempColor}
          onChange={handleColorChange}
          open={pickerOpen}
          onOpenChange={setPickerOpen}
          panelRender={(panel) => (
            <div className="custom-color-picker-panel">
              {panel}
              <Divider style={{ margin: '8px 0' }} />
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Button size="small" onClick={handleCancel}>取消</Button>
                <Button size="small" type="primary" onClick={handleConfirm}>确认</Button>
              </Space>
            </div>
          )}
        >
          {/* 仅显示一个小方块作为触发器 */}
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 4,
              border: '1px solid #d9d9d9',
              backgroundColor: tempColor,
              cursor: 'pointer',
            }}
          />
        </ColorPicker>
      </Space>
    </Col>
  );
};

const ThemeSettings: React.FC = () => {
  const [open, setOpen] = useState(false);
  const {
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
    applyPreset,
  } = useTheme();

  const { token: { colorText: antdColorText } } = theme.useToken();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleLayoutChange = (e: any) => {
    setLayout(e.target.value as LayoutType);
  };

  const handleSliderChange = (setter: (value: number) => void) => (value: number) => {
    setter(value);
  };

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
  };

  const handleApplyPreset = (preset: ThemePreset) => {
    applyPreset(preset);
  };

  // 布局缩略图组件
  const LayoutThumbnail: React.FC<{ type: LayoutType; currentLayout: LayoutType; onClick: (type: LayoutType) => void }> = ({ type, currentLayout, onClick }) => {
    const isSelected = type === currentLayout;
    const borderColor = isSelected ? primaryColor : 'transparent';
    const borderWidth = isSelected ? 2 : 1;

    const commonStyle = {
      border: `${borderWidth}px solid ${borderColor}`,
      borderRadius: 4,
      cursor: 'pointer',
      padding: 4,
      display: 'flex',
      flexDirection: 'column' as 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
      height: 60,
      backgroundColor: colorBgLayout,
      position: 'relative' as 'relative',
      overflow: 'hidden',
    };

    const sidebarStyle = {
      backgroundColor: primaryColor,
      width: '25%',
      height: '100%',
      borderRadius: 2,
    };

    const headerStyle = {
      backgroundColor: primaryColor,
      width: '100%',
      height: '20%',
      borderRadius: 2,
    };

    const contentStyle = {
      backgroundColor: colorBgContainer,
      flex: 1,
      borderRadius: 2,
      border: `1px solid ${colorBorder}`,
    };

    return (
      <Col span={6} onClick={() => onClick(type)}>
        <div style={commonStyle}>
          {type === 'default' && (
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
              <div style={sidebarStyle} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 4 }}>
                <div style={headerStyle} />
                <div style={{ ...contentStyle, marginTop: 4 }} />
              </div>
            </div>
          )}
          {type === 'classic' && (
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
              <div style={sidebarStyle} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 4 }}>
                <div style={headerStyle} />
                <div style={{ ...contentStyle, marginTop: 4 }} />
              </div>
            </div>
          )}
          {type === 'single-column' && (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
              <div style={headerStyle} />
              <div style={{ ...contentStyle, marginTop: 4 }} />
            </div>
          )}
          {type === 'two-column' && (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
              <div style={headerStyle} />
              <div style={{ display: 'flex', flex: 1, marginTop: 4 }}>
                <div style={{ ...sidebarStyle, width: '25%', height: '100%' }} />
                <div style={{ ...contentStyle, flex: 1, marginLeft: 4 }} />
              </div>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: 4, fontSize: 12, color: antdColorText }}>
          {type === 'default' && '默认'}
          {type === 'classic' && '经典'}
          {type === 'single-column' && '单栏'}
          {type === 'two-column' && '双栏'}
        </div>
      </Col>
    );
  };

  return (
    <>
      <Button
        type="primary"
        icon={<SettingOutlined />}
        size="large"
        shape="circle"
        onClick={showModal}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 999,
        }}
      />
      <Modal
        title="主题设置"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <h3 style={{ color: antdColorText }}>布局方式</h3>
          <Row gutter={[16, 16]}>
            <LayoutThumbnail type="default" currentLayout={layout} onClick={setLayout} />
            <LayoutThumbnail type="classic" currentLayout={layout} onClick={setLayout} />
            <LayoutThumbnail type="single-column" currentLayout={layout} onClick={setLayout} />
            <LayoutThumbnail type="two-column" currentLayout={layout} onClick={setLayout} />
          </Row>

          <Divider />

          <h3 style={{ color: antdColorText }}>主题预设</h3>
          <Row gutter={[16, 16]}>
            {THEME_PRESETS.map((preset) => (
              <Col span={12} key={preset.name}>
                <Card
                  hoverable
                  onClick={() => handleApplyPreset(preset)}
                  style={{ borderColor: primaryColor, borderWidth: layout === preset.layoutType && darkMode === preset.mode.darkMode ? 2 : 0 }} // 选中状态的边框
                >
                  <Card.Meta
                    title={preset.name}
                    description={preset.description}
                  />
                  <div style={{ display: 'flex', marginTop: 8 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: preset.colors.primaryColor, marginRight: 4 }} />
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: preset.colors.colorSuccess, marginRight: 4 }} />
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: preset.colors.colorWarning, marginRight: 4 }} />
                    <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: preset.colors.colorError }} />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Divider />

          <h3 style={{ color: antdColorText }}>颜色</h3>
          <Row gutter={[16, 16]}>
            <ColorSettingItem label="主色调" value={primaryColor} onChange={setPrimaryColor} />
            <ColorSettingItem label="成功色" value={colorSuccess} onChange={setColorSuccess} />
            <ColorSettingItem label="警告色" value={colorWarning} onChange={setColorWarning} />
            <ColorSettingItem label="错误色" value={colorError} onChange={setColorError} />
            <ColorSettingItem label="信息色" value={colorInfo} onChange={setColorInfo} />
            <ColorSettingItem label="主要文本色" value={colorText} onChange={setColorText} />
            <ColorSettingItem label="次要文本色" value={colorTextSecondary} onChange={setColorTextSecondary} />
            <ColorSettingItem label="容器背景色" value={colorBgContainer} onChange={setColorBgContainer} />
            <ColorSettingItem label="布局背景色" value={colorBgLayout} onChange={setColorBgLayout} />
            <ColorSettingItem label="边框色" value={colorBorder} onChange={setColorBorder} />
          </Row>

          <Divider />

          <h3 style={{ color: antdColorText }}>字体</h3>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <label style={{ color: antdColorText }}>基础字体大小:</label>
              <Slider min={12} max={18} step={1} value={fontSize} onChange={handleSliderChange(setFontSize)} />
            </Col>
            <Col span={12}>
              <label style={{ color: antdColorText }}>大号字体大小:</label>
              <Slider min={14} max={20} step={1} value={fontSizeLG} onChange={handleSliderChange(setFontSizeLG)} />
            </Col>
            <Col span={12}>
              <label style={{ color: antdColorText }}>小号字体大小:</label>
              <Slider min={10} max={16} step={1} value={fontSizeSM} onChange={handleSliderChange(setFontSizeSM)} />
            </Col>
            <Col span={12}>
              <label style={{ color: antdColorText }}>行高:</label>
              <Slider min={1} max={2.5} step={0.01} value={lineHeight} onChange={handleSliderChange(setLineHeight)} />
            </Col>
          </Row>

          <Divider />

          <h3 style={{ color: antdColorText }}>间距</h3>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <label style={{ color: antdColorText }}>中等外边距:</label>
              <Slider min={0} max={32} step={1} value={marginMD} onChange={handleSliderChange(setMarginMD)} />
            </Col>
            <Col span={12}>
              <label style={{ color: antdColorText }}>中等内边距:</label>
              <Slider min={0} max={32} step={1} value={paddingMD} onChange={handleSliderChange(setPaddingMD)} />
            </Col>
          </Row>

          <Divider />

          <h3 style={{ color: antdColorText }}>圆角与边框</h3>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <label style={{ color: antdColorText }}>基础圆角大小:</label>
              <Slider min={0} max={16} step={1} value={borderRadius} onChange={handleSliderChange(setBorderRadius)} />
            </Col>
            <Col span={12}>
              <label style={{ color: antdColorText }}>小圆角大小:</label>
              <Slider min={0} max={8} step={1} value={borderRadiusSM} onChange={handleSliderChange(setBorderRadiusSM)} />
            </Col>
            <Col span={12}>
              <label style={{ color: antdColorText }}>大圆角大小:</label>
              <Slider min={0} max={24} step={1} value={borderRadiusLG} onChange={handleSliderChange(setBorderRadiusLG)} />
            </Col>
            <Col span={12}>
              <label style={{ color: antdColorText }}>线宽:</label>
              <Slider min={1} max={4} step={1} value={lineWidth} onChange={handleSliderChange(setLineWidth)} />
            </Col>
          </Row>

          <Divider />

          <h3 style={{ color: antdColorText }}>模式</h3>
          <Switch
            checkedChildren={<BulbOutlined />}
            unCheckedChildren={<BulbOutlined />}
            checked={darkMode}
            onChange={handleDarkModeChange}
          />
        </Space>
      </Modal>
    </>
  );
};

export default ThemeSettings;
