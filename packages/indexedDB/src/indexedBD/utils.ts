export const promisify = (request: IDBRequest) => {
  const p = new Promise((res, rej) => {
    request.onsuccess = (ev) => res((ev?.target as any)?.result);
    request.onerror = (ev) => rej((ev?.target as any)?.result);
  });

  return p;
}

export const openDB = async (name: string, options?: {
  onupgradeneeded?: IDBOpenDBRequest['onupgradeneeded']
}) => {
  const request = indexedDB.open(name);
  if (options?.onupgradeneeded) {
    request.onupgradeneeded = options.onupgradeneeded
  }

  return promisify(request);
}

export const getObjectStore = (db: IDBDatabase, name: string, mode: IDBTransactionMode = 'readonly') => {
  const transaction = db.transaction(name, mode);
  const objectStore = transaction.objectStore(name);

  return objectStore;
}

export const addValueToStore = async (objectStore: IDBObjectStore, item: { key: string, value: unknown }) => {
  const request = objectStore.put(item.value);
  return promisify(request);
}

export const getValueFromStore = async (objectStore: IDBObjectStore, key: string) => {
  const request = objectStore.get(key);

  return promisify(request);
}