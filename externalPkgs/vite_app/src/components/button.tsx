import React from 'react';
import styles from '@styles/button.module.less';
import classnames from 'classnames';

export const Button = () => {
  const handleClick = () => {
    import('@utils/print').then(({ print }) => print('hello world'));
  };

  return (
    <div onClick={handleClick} className={classnames(styles.btn, 'global-btn')}>
      Click Me
    </div>
  );
};
