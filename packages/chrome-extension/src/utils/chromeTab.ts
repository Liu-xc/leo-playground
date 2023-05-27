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

  constructor() {
    if (TabManager.instance) {
      return TabManager.instance;
    }

    TabManager.instance = this;

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
}

export const tabManager = new TabManager();
