
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LayoutType = 'default' | 'classic' | 'single-column' | 'two-column';

interface ThemeContextType {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [layout, setLayout] = useState<LayoutType>('default');

  return (
    <ThemeContext.Provider value={{ layout, setLayout }}>
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
