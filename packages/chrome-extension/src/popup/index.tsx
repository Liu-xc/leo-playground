import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useTabManager } from '../utils';
import styles from './popup.module.less';
import type { ChromeTabGroup, ChromeTabItem } from '../types';
import { TabList } from './components/tabList';
import { type FilterItem, filterValidator, Header } from './components/header';
import 'antd/dist/antd.css';
import { Bottom } from './components/bottom';

const App = () => {
  const [allTabs, setAllTabs] = useState<ChromeTabItem[]>([]);
  const [filteredTabs, setFilteredTabs] = useState<ChromeTabItem[]>([]);
  const [selectedTabs, setSelectedTabs] = useState<ChromeTabItem[]>([]);
  const [allGroups, setAllGroups] = useState<ChromeTabGroup[]>([]);

  const tabManager = useTabManager();

  useEffect(() => {
    tabManager.getAllGroups().then((res) => {
      setAllGroups(res);
    });
  }, [tabManager]);

  useEffect(() => {
    tabManager.getAllTabs().then((res) => {
      setAllTabs(res);
    });
  }, [tabManager]);

  const [filters, setFilters] = useState<FilterItem[][]>([])

  const onFilterChange = useCallback((f: FilterItem[][]) => {
    setFilters(f);
  }, []);

  useEffect(() => {
    const filtered = filterValidator(allTabs, filters);
    setFilteredTabs(filtered);
  }, [filters, allTabs]);

  const clearSelected = useCallback(() => {
    setSelectedTabs([]);
  }, [])

  return (
    <div className={styles.appRoot}>
      <div className={styles.header}>
        <Header onFilterChange={onFilterChange} allGroups={allGroups} />
      </div>
      <div className={styles.list}>
        <TabList selectedTabs={selectedTabs} tabItems={filteredTabs} onSelect={setSelectedTabs} />
      </div>
      <div className={styles.bottom}>
        <Bottom clearSelected={clearSelected} allTabs={allTabs} selectedTabs={selectedTabs} allGroups={allGroups} />
      </div>
    </div>
  );
};

const appRoot = document.createElement('div');
document.body.appendChild(appRoot);

const root = createRoot(appRoot);

root.render(<App />);
