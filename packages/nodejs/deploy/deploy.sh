#!/bin/bash
npm i -g pnpm ts-node
pnpm i 
npx kill-port 8080
node src/server/index
