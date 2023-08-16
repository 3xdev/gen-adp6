import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
export type SiderTheme = 'light' | 'dark';
export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};
