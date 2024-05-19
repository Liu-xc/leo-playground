#!/bin/bash
npm i -g pnpm pm2 vite typescript
cd ../../
pnpm i
cd ./cloud-web-page
pnpm build
cd ../nodejs
tsc --outDir ./dist
pm2 kill
pm2 start dist/koa-server/index.js -i 4
