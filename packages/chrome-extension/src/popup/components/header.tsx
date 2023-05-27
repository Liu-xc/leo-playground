import { Checkbox, Input } from 'antd';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import React, { useCallback, useEffect, useState } from 'react';
import { type ChromeTabGroup } from '../../types';
import { tabManager } from '../../utils';

export enum FilterType {
  group = 'group',
  tab = 'tab',
}

export interface FilterItem {
  filterType: FilterType
  key: string
  value: string | number | boolean
}

interface HeaderProps {
  onFilterChange: (filters: FilterItem[]) => void
}

export const Header = (props: HeaderProps) => {
  const { onFilterChange } = props;

  const [tabGroups, setTabGroups] = useState<ChromeTabGroup[]>([]);

  const [keyword, setKeyword] = useState('');
  const [isFilterURL, setIsFilterURL] = useState(true);
  const [checkedGroups, setCheckedGroups] = useState<ChromeTabGroup[]>([]);

  useEffect(() => {
    tabManager.getAllGroups().then((res) => {
      setTabGroups(res);
    });
  }, []);

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
    <div>
      <div>
        <Input />
        <Checkbox />
      </div>
      <div>
        {tabGroups.map((tg) => {
          const { color, id, title } = tg;

          return (
            <CheckableTag
              key={tg.id}
              checked={checkedGroups.some((v) => v.id === id)}
              onChange={(checked) => {
                toggleGroupCheck(tg, checked);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
