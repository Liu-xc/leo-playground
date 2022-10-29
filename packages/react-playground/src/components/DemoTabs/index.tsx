import React from 'react';
import { Tabs, TabsProps } from 'antd';

export type DemoTabsProps = TabsProps;

const DemoTabs: React.FC<DemoTabsProps> = (props) => {
  return <Tabs {...props} />;
};

export default DemoTabs;
