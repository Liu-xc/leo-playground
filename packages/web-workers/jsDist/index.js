export const getDedicatedWorker = () => new Worker('./dedicated-worker.js');
export const getSharedWorker = () => new SharedWorker('./shared-worker.js');
