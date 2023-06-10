export const getDedicatedWorker = () => new Worker(new URL('./dedicated-worker.ts', import.meta.url));
export const getSharedWorker = () => new SharedWorker(new URL('./shared-worker.ts', import.meta.url));
