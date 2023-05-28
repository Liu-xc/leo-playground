import React, { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import type { ChromeTabGroup, ChromeTabItem, GroupColor } from '../../types';
import styles from '../popup.module.less';
import { Checkbox, Input, Modal, Select, notification } from 'antd';
import { useTabManager } from '../../utils';

interface BottomProps {
  allTabs: ChromeTabItem[];
  selectedTabs: ChromeTabItem[];
  allGroups: ChromeTabGroup[];
  clearSelected: () => void;
}

export enum TabOptionsKey {
  'close' = 'close',
  'moveToGroup' = 'moveToGroup',
  'createNewGroup' = 'createNewGroup'
}

const tabOptions = [{
  value: TabOptionsKey.close,
  label: '关闭'
}, {
  value: TabOptionsKey.moveToGroup,
  label: '移动到'
}, {
  value: TabOptionsKey.createNewGroup,
  label: '新建组'
}]

const colorOptions = [{
  value: 'grey',
  label: 'grey'
}, {
  value: 'blue',
  label: 'blue'
}, {
  value: 'red',
  label: 'red'
}, {
  value: 'yellow',
  label: 'yellow'
}, {
  value: 'green',
  label: 'green'
}, {
  value: 'pink',
  label: 'pink'
}, {
  value: 'purple',
  label: 'purple'
}, {
  value: 'cyan',
  label: 'cyan'
}, {
  value: 'orange',
  label: 'orange'
}]

export const Bottom = (props: BottomProps) => {
  const { allTabs, selectedTabs, allGroups, clearSelected } = props;

  const tabManager = useTabManager();

  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const [optionValue, setOptionValue] = useState(null);
  const selectedIds = useMemo(() => selectedTabs.map(t => t.id).filter(Boolean) as number[], [selectedTabs]);
  const [isSetTargetGroup, setIsSetTargetGroup] = useState(false);
  const [isCloseTab, setIsCloseTab] = useState(false);

  const handleOption = useCallback((v: TabOptionsKey) => {
    switch (v) {
      case TabOptionsKey.close:
        setIsCloseTab(true);
        break;

      case TabOptionsKey.createNewGroup:
        setIsCreateGroup(true);
        break;
      case TabOptionsKey.moveToGroup:
        setIsSetTargetGroup(true);
        break;
      default:
        break;
    }
  }, []);

  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupColor, setNewGroupColor] = useState('blue');
  const onNewGroupNameChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setNewGroupName(ev.target.value);
  }, []);
  const onNewGroupColorChange = useCallback((color: string) => {
    setNewGroupColor(color);
  }, []);
  const cancelCreateGroup = useCallback(() => {
    setNewGroupName('');
    setNewGroupColor('blue');
    setIsCreateGroup(false);
    setOptionValue(null);
  }, []);
  const createNewGroup = useCallback(() => {
    if (!newGroupName) {
      notification.error({ message: '未命名' });
      return;
    }
    tabManager.group({ tabIds: selectedIds }).then(groupId => {
      tabManager.updateGroup(groupId, {
        color: newGroupColor as GroupColor,
        title: newGroupName
      });
    })

    cancelCreateGroup();
    clearSelected();
  }, [selectedIds, newGroupName, newGroupColor, cancelCreateGroup, tabManager, clearSelected]);

  const [targetGroup, setTargetGroup] = useState<number>();
  const onCancelMove = useCallback(() => {
    setIsSetTargetGroup(false);
    setOptionValue(null);
  }, []);
  const onConfirmTargetGroup = useCallback(() => {
    if (!targetGroup) {
      notification.error({ message: '未选择分组' });
      return;
    }
    tabManager.group({
      tabIds: selectedIds,
      groupId: targetGroup
    });
    onCancelMove();
    clearSelected();
  }, [targetGroup, selectedIds, onCancelMove, tabManager, clearSelected]);

  const onCancelClose = useCallback(() => {
    setIsCloseTab(false);
  }, []);
  const onConfirmClose = useCallback(() => {
    tabManager.closeTabs(selectedIds);
    clearSelected();
  }, [selectedIds, tabManager, clearSelected]);

  return (
    <div className={styles.bottomContainer}>
      <div className={styles.totalTabs}>共：{allTabs.length}</div>
      <div className={styles.selectedTabs}>选中：{selectedTabs.length}</div>
      <div className={styles.selectedTabs} onClick={clearSelected}>
        清除选中
      </div>
      <div className={styles.options}>
        操作：
        <Select value={optionValue} className={styles.selector} options={tabOptions} onChange={handleOption} />
      </div>
      <Modal
        title="新建组"
        open={isCreateGroup}
        onCancel={cancelCreateGroup}
        onOk={createNewGroup}
      >
        <Input value={newGroupName} onChange={onNewGroupNameChange} />
        <Select style={{ width: '100px' }} value={newGroupColor} options={colorOptions} onChange={onNewGroupColorChange}/>
      </Modal>
      <Modal
        title="移动到"
        open={isSetTargetGroup}
        onCancel={onCancelMove}
        onOk={onConfirmTargetGroup}
      >
        <Select style={{ width: '300px' }} value={targetGroup} options={allGroups.map(g => ({ value: g.id, label: g.title || '未命名' }))} onChange={setTargetGroup}/>
      </Modal>
      <Modal
        title="关闭"
        open={isCloseTab}
        onCancel={onCancelClose}
        onOk={onConfirmClose}
      >
        确认关闭选中页面？
      </Modal>
    </div>
  )
}
