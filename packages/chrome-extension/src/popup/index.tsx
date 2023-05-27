import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { tabManager } from '../utils';
import styles from './popup.module.less';
import type { ChromeTabItem } from '../types';
import { TabList } from './components/tabItem';

const App = () => {
  const [activeTab, setActiveTab] = useState<ChromeTabItem[]>([]);
  const [allTabs, setAllTabs] = useState<ChromeTabItem[]>([]);

  useEffect(() => {
    tabManager
      .getTabs({
        active: true
      })
      .then((res) => {
        setActiveTab(res);
        console.log(res);
      });
  }, []);

  useEffect(() => {
    tabManager.getAllGroups().then((res) => {
      console.log(res);
    });
  }, []);

  useEffect(() => {
    tabManager.getAllTabs().then((res) => {
      setAllTabs(res);
    });
  }, []);

  return (
    <div className={styles.appRoot}>
      <TabList tabItems={allTabs} />
    </div>
  );
};

const appRoot = document.createElement('div');
document.body.appendChild(appRoot);

const root = createRoot(appRoot);

root.render(<App />);
