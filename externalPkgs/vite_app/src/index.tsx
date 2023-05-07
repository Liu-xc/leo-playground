import { forOwn } from 'lodash-es';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from './components/button';
import axios from 'axios';

setTimeout(() => {
  const p = document.createElement('p');
  p.innerText = 'hello';
  document.querySelector('body')?.appendChild(p);
}, 500);

import('./utils/index').then(({ towSum }) => {
  console.log(towSum(1, 3));
});

forOwn(
  {
    a: 1,
  },
  (v, k) => {
    console.log(v, k);
  }
);

axios.get('https://sponsors.vuejs.org/vite.json').then((res) => {
  console.log('request res: ', res);
});
const root = createRoot(document.body);
root.render(<Button />);
