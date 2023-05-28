import { Checkbox, Input, Tag } from 'antd';
import React, { useCallback, useEffect, useState, type ChangeEvent, useMemo } from 'react';
import type { ChromeTabGroup, ChromeTabItem } from '../../types';
import { debounce, get } from 'lodash-es';
import { type CheckboxChangeEvent } from 'antd/lib/checkbox';
import styles from '../popup.module.less';

export enum FilterType {
  group = 'group',
  tab = 'tab',
}

export interface FilterItem {
  filterType: FilterType;
  key: string;
  value: string | number | boolean;
}

interface HeaderProps {
  onFilterChange: (filters: FilterItem[][]) => void;
  allGroups: ChromeTabGroup[];
}

export const filterValidator = (tabs: ChromeTabItem[], filters: FilterItem[][]) => tabs.filter(t => {
  const [tabFilters = [], groupFilters = []] = filters;

  const isTabValid = tabFilters.length ? tabFilters.some(f => get(t, f.key, '').includes(String(f.value))) : true;
  const isGroupValid = groupFilters.length ? groupFilters.some(f => get(t, f.key) === f.value) : true;

  return isTabValid && isGroupValid;
})

export const Header = (props: HeaderProps) => {
  const { onFilterChange, allGroups } = props;

  const [keyword, setKeyword] = useState('');
  const [isFilterURL, setIsFilterURL] = useState(true);
  const [checkedGroups, setCheckedGroups] = useState<ChromeTabGroup[]>([]);
  const [tabFilters, setTabFilters] = useState<FilterItem[]>([]);
  const [groupFilters, setGroupFilters] = useState<FilterItem[]>([]);

  useEffect(() => {
    const keywordFilter: FilterItem = {
      filterType: FilterType.tab,
      key: 'title',
      value: keyword
    };

    if (isFilterURL) {
      const urlFilter: FilterItem = {
        filterType: FilterType.tab,
        key: 'url',
        value: keyword
      };
      setTabFilters([keywordFilter, urlFilter]);
    } else {
      setTabFilters([keywordFilter]);
    }
  }, [keyword, isFilterURL]);

  useEffect(() => {
    const _groupFilters = checkedGroups.map<FilterItem>(g => ({
      filterType: FilterType.group,
      key: 'groupId',
      value: g.id
    }));

    setGroupFilters(_groupFilters);
  }, [checkedGroups]);

  const debouncedOnFilterChange = useMemo(() => debounce(onFilterChange, 300), [onFilterChange]);

  useEffect(() => {
    debouncedOnFilterChange([tabFilters, groupFilters]);
  }, [tabFilters, groupFilters, debouncedOnFilterChange]);

  const onInput = (ev: ChangeEvent<HTMLInputElement>) => {
    setKeyword(ev.target.value);
  };

  const onCheck = (ev: CheckboxChangeEvent) => {
    setIsFilterURL(ev.target.checked)
  };

  const toggleGroupCheck = useCallback(
    (tg: ChromeTabGroup, checked: boolean) => {
      const copy = checkedGroups.slice();

      if (checked) {
        copy.push(tg);
      } else {
        const index = checkedGroups.findIndex((v) => v.id === tg.id);
        copy.splice(index, 1);
      }

      setCheckedGroups(copy);
    },
    [checkedGroups]
  );

  return (
    <div className={styles.headerContainer}>
      <div className={styles.search}>
        <Input className={styles.keyword} onChange={onInput} />
        <Checkbox className={styles.urlFilter} onChange={onCheck}>开启 URL 匹配</Checkbox>
      </div>
      <div className={styles.tabGroups}>
        {allGroups.map((tg) => {
          const { color, id, title } = tg;

          return (
            <Tag.CheckableTag
              key={tg.id}
              checked={checkedGroups.some((v) => v.id === id)}
              onChange={(checked) => {
                toggleGroupCheck(tg, checked);
              }}
              className={styles.groupTag}
            >
              {title || '未命名'}
            </Tag.CheckableTag>
          );
        })}
      </div>
    </div>
  );
};
