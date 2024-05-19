#!/bin/bash
npm i -g pnpm pm2
pnpm i 
npx kill-port 8080
pm2 start src/server/index.js -i 4
