import fs, { constants } from 'fs';
import childProcess from 'child_process';
import path from 'path';

const indexFilePath = path.resolve(__dirname, './index.ts');
const indexJsFilePath = path.resolve(__dirname, './index.js');

const compileSource = () => {
  console.log('compile start');
  childProcess.execSync(`tsc --skipLibCheck ${indexFilePath}`)
  console.log('compile end');
};

let child: childProcess.ChildProcess;

const startServer = () => {
  try {
    console.log('try start server');

    fs.accessSync(indexJsFilePath, constants.R_OK);
  } catch (error) {
    console.error(error);
    compileSource();
  } finally {
    console.log('end start server');

  }

  child = childProcess.fork(indexJsFilePath);
};

const stopServer = () => child?.kill?.();

childProcess.execSync('npx kill-port --port 8080');
startServer();


fs.watchFile(indexFilePath, () => {
  stopServer();
  startServer();
});
