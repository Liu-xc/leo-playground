// import { getDedicatedWorker, getSharedWorker } from '../web-workers';
import { getDedicatedWorker, getSharedWorker } from 'leo-web-workers';

const worker = getDedicatedWorker();
worker.postMessage('hello');
worker.onmessage = (msg: any) => console.log('msg from worker', msg);

const sharedWorker = getSharedWorker();
sharedWorker.port.postMessage('hello');
sharedWorker.port.onmessage = (msg: any) => console.log('msg from sharedWorker', msg);

export const sumTwo = (a: number, b: number) => a + b + 1;