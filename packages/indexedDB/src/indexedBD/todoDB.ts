import { openDB, getObjectStore, getValueFromStore, addValueToStore } from './utils';

const openTodoDB = async () => {
  return openDB('todo', {
    onupgradeneeded: (ev: IDBVersionChangeEvent) => {
      const db = (ev?.target as any)?.result as IDBDatabase;
      if (!db) {
        return;
      }

      const objectStore = db.createObjectStore('todo', { keyPath: 'title' });
      objectStore.createIndex('title', 'title', { unique: true });
    }
  });
};

const getTodoStore = async (mode: IDBTransactionMode = 'readonly') => {
  const db = await openTodoDB() as IDBDatabase;
  const objectStore = getObjectStore(db, 'todo', mode);

  return objectStore;
};

const getTodoItem = async (key: string) => {
  const objectStore = await getTodoStore();
  const item = await getValueFromStore(objectStore, key);

  return item;
}

const addTodoItem = async (value: {
  title: string;
  ddl: number;
}) => {
  const { title } = value;
  const objectStore = await getTodoStore('readwrite');
  return addValueToStore(objectStore, { key: title, value });
}

export const entry = async () => {
  const title = 'learn IndexedDB';
  await addTodoItem({
    title,
    ddl: Date.now() + 5 * 60 * 1000
  });
  await getTodoItem(title);
};
