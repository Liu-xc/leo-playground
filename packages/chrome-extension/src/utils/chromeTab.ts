import { useCallback, useEffect, useState } from 'react';
import { IndexedDBKit } from './indexedDB';
import { MD5 } from 'crypto-js';

const TAB_MANAGER_DB = 'TAB_MANAGER_DB';
enum TabManagerStores {
  WINDOWS = 'WINDOWS',
  TABS = 'TABS',
  GROUPS = 'GROUPS',
  HISTORY = 'HISTORY'
}

export class TabManager {
  static native = chrome;

  static instance: TabManager;

  private tabDB: IndexedDBKit<chrome.tabs.Tab> | null = null;
  private groupDB: IndexedDBKit<chrome.tabGroups.TabGroup> | null = null;
  private readonly cbs = Array<() => void>();

  constructor() {
    this.init();
  }

  init = () => {
    this.tabDB = new IndexedDBKit(TAB_MANAGER_DB, TabManagerStores.TABS, (value) => MD5(`${value.url}-${value.title}`).toString());
    this.groupDB = new IndexedDBKit(TAB_MANAGER_DB, TabManagerStores.GROUPS, (value) => String(value.id));
  }

  getAllTabs = async () => {
    return await this.getTabs({});
  }

  getTabs = chrome.tabs.query;

  getAllGroups = async () => {
    return await chrome.tabGroups.query({});
  }

  getHistory = async () => {
    return await chrome.history.search({
      maxResults: 50,
      text: ''
    });
  }

  saveTabs = async (tabs: chrome.tabs.Tab[]) => {
    return await Promise.all(tabs.map(async t => await this.tabDB?.update(t)));
  }

  closeTabs = chrome.tabs.remove;

  group = chrome.tabs.group;

  updateGroup = chrome.tabGroups.update;

  highlight = chrome.tabs.highlight;

  getWindow = chrome.windows.get;

  updateWindow = chrome.windows.update;

  listenChange = (cb: () => void) => {
    this.cbs.push(cb);
  }

  onChange = () => {
    this.cbs.forEach(cb => { cb(); });
  }
}

export const useTabManager = () => {
  const [tabManager, setTabManager] = useState(new TabManager());

  const listener = useCallback(() => {
    setTabManager(new TabManager());
  }, []);

  useEffect(() => {
    chrome.tabs.onCreated.addListener(listener);
    chrome.tabs.onUpdated.addListener(listener);
    chrome.tabs.onMoved.addListener(listener);
    chrome.tabs.onRemoved.addListener(listener);
    chrome.tabGroups.onCreated.addListener(listener);
    chrome.tabGroups.onUpdated.addListener(listener);
    chrome.tabGroups.onMoved.addListener(listener);
    chrome.tabGroups.onRemoved.addListener(listener);

    return () => {
      chrome.tabs.onCreated.removeListener(listener);
      chrome.tabs.onUpdated.removeListener(listener);
      chrome.tabs.onMoved.removeListener(listener);
      chrome.tabs.onRemoved.removeListener(listener);
      chrome.tabGroups.onCreated.removeListener(listener);
      chrome.tabGroups.onUpdated.removeListener(listener);
      chrome.tabGroups.onMoved.removeListener(listener);
      chrome.tabGroups.onRemoved.removeListener(listener);
    }
  }, [listener]);

  return tabManager;
}
