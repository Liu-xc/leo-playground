import React, { useCallback } from 'react'
import type { ChromeTabItem, TabItemType } from '../../types'
import { Avatar, Checkbox, Image, List } from 'antd'
import { ChromeFilled } from '@ant-design/icons'
import styles from '../popup.module.less'
import { useTabManager } from '../../utils'

interface TabItemProps {
  tabItems: TabItemType[];
  onSelect: (tabs: ChromeTabItem[]) => void;
  selectedTabs: TabItemType[];
}

export const TabList = (props: TabItemProps) => {
  const { tabItems, onSelect, selectedTabs } = props
  const tabManager = useTabManager();

  const toggleItem = useCallback(
    (item: TabItemType) => {
      const { id, windowId } = item
      const listCopy = selectedTabs.slice()

      const index = listCopy.findIndex(
        (v) => v.windowId === windowId && v.id === id
      )
      if (index > -1) {
        listCopy.splice(index, 1)
      } else {
        listCopy.push(item)
      }

      onSelect(listCopy)
    },
    [onSelect, selectedTabs]
  );

  const viewTab = useCallback(async (item: TabItemType) => {
    const { index, windowId } = item;
    index && await tabManager.highlight({
      tabs: index,
      windowId
    });
    await tabManager.updateWindow(windowId, { focused: true }).catch(console.error);
  }, [tabManager]);

  return (
    <List
      className={styles.tabList}
      dataSource={tabItems}
      renderItem={(item) => (
        <List.Item
          key={`${item.windowId}-${String(item.id)}`}
          className={styles.listItem}
        >
          <div className={styles.checkBox}>
            <Checkbox
              checked={Boolean(
                selectedTabs.find(
                  (v) => v.windowId === item.windowId && v.id === item.id
                )
              )}
              onChange={() => { toggleItem(item) }}
            />
          </div>
          <Avatar
            src={
              item.favIconUrl
                ? (
                <Image
                  src={item.favIconUrl}
                  style={{ width: 16 }}
                  preview={false}
                />
                  )
                : (
                <ChromeFilled rev style={{ fontSize: '16px', color: 'GrayText' }} />
                  )
            }
            className={styles.avatar}
          />
          <div className={styles.content}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.desc}>{item.url}</div>
          </div>
          <div className={styles.view} onClick={() => { viewTab(item); }}>查看</div>
        </List.Item>
      )}
    />
  )
}
