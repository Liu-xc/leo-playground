import React from 'react';
import { createRoot } from 'react-dom/client';
import { sumTwo } from './utils';
import axios from 'axios';
import { Gallery } from './components/gallery';
import styles from './styles.less';

console.log(sumTwo(1, 2));
console.log('hello world');
console.log('HMR');

// 会被 tree shaking
const fn = () => sumTwo(1, 2);

const root = createRoot(document.body);
root.render(
  <div className={styles.customStyle}>
    hello react! <Gallery />{' '}
  </div>
);

axios
  .get('https://mcs.zijieapi.com/webid', {
    params: {
      app_id: 2018,
      referer: 'https://p689ikx6dw.feishu.cn/',
      url: 'https://juejin.cn/post/7077918263954374670#heading-8',
      user_agent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
      user_unique_id: '',
    },
  })
  .then((res) => {
    console.log(res);
  });
