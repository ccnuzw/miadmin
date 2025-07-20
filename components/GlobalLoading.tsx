import React from 'react';
import { Spin } from 'antd';

interface GlobalLoadingProps {
  loading: boolean;
}

const GlobalLoading: React.FC<GlobalLoadingProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 9999,
    }}>
      <Spin size="large" />
    </div>
  );
};

export default GlobalLoading;
