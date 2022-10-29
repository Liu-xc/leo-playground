import React, { useMemo } from 'react';
import FieldForm from './FieldForm';
import SchemaForm from './SchemaForm';
import DemoTabs, { DemoTabsProps } from '../../components/DemoTabs';

const DynamicFormPlayground = () => {
  const items: DemoTabsProps['items'] = useMemo(() => {
    return [
      {
        label: 'Field写法',
        key: 'Field写法',
        children: <FieldForm />,
      },
      {
        label: 'Schema写法',
        key: 'Schema写法',
        children: <SchemaForm />,
      },
    ];
  }, []);

  return (
    <div>
      <DemoTabs items={items} />
    </div>
  );
};

export default DynamicFormPlayground;
