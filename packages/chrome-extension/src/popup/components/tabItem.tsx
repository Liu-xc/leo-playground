import React, { useCallback, useState } from 'react'
import type { TabItemType } from '../../types'
import { Avatar, Checkbox, Image, List } from 'antd'
import { ChromeOutlined } from '@ant-design/icons'
import styles from './index.module.less'

interface TabItemProps {
  tabItems: TabItemType[]
}

export const TabList = (props: TabItemProps) => {
  const { tabItems } = props

  const [checked, setChecked] = useState<TabItemType[]>([])

  const toggleItem = useCallback(
    (item: TabItemType) => {
      const { id, windowId } = item
      const listCopy = checked.slice()

      const index = listCopy.findIndex(
        (v) => v.windowId === windowId && v.id === id
      )
      if (index > -1) {
        listCopy.splice(index, 1)
      } else {
        listCopy.push(item)
      }

      setChecked(listCopy)
    },
    [checked]
  )

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
                checked.find(
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
                <ChromeOutlined rev style={{ fontSize: '16px' }} />
                  )
            }
            className={styles.avatar}
          />
          <div className={styles.content}>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.desc}>{item.url}</div>
          </div>
        </List.Item>
      )}
    />
  )
}
