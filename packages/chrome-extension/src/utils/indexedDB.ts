/**
 * 维护历史 tab 信息、数据
 * - 窗口
 *   - group
 *     - tab
 *   - tab
 *
 * - history
*/

import { get, isNil } from 'lodash-es';

const promisifyDBRequest = async (request: IDBRequest, options?: {
  onupgradeneeded?: IDBOpenDBRequest['onupgradeneeded']
}) => {
  return await new Promise((_resolve, _reject) => {
    if (options?.onupgradeneeded) {
      (request as IDBOpenDBRequest).onupgradeneeded = options.onupgradeneeded;
    }

    request.onsuccess = (ev: Event) => {
      _resolve((ev.target as any).result);
    };
    request.onerror = (ev: Event) => {
      _reject((ev.target as any).result);
    };
  });
}

export class IndexedDBKit<ValueType> {
  static native = indexedDB;

  constructor(private readonly dbName: string, private readonly objStoreName: string, private readonly keyPath?: string | ((v: ValueType) => string)) {

  }

  private readonly getKey = (value: ValueType) => {
    if (!this.keyPath) {
      return '';
    }

    if (typeof this.keyPath === 'string') {
      return get(value, this.keyPath);
    }

    if (typeof this.keyPath === 'function') {
      return this.keyPath(value);
    }

    return '';
  }

  private readonly openDB = async () => {
    return await promisifyDBRequest(indexedDB.open(this.dbName), {
      onupgradeneeded: (ev) => {
        const db = get(ev, 'target.result', null) as unknown as IDBDatabase;
        if (db) {
          db.createObjectStore(this.objStoreName);
        }
      }
    }) as IDBDatabase;
  }

  private readonly getObjectStore = async (mode: IDBTransactionMode = 'readonly') => {
    const db = await this.openDB();
    const transaction = db.transaction(this.objStoreName, mode);

    return transaction.objectStore(this.objStoreName);
  }

  update = async (value: ValueType, key?: string) => {
    const k = key ?? this.getKey(value);

    if (!k) {
      throw new Error('key is empty !');
    }

    const store = await this.getObjectStore('readwrite');
    return await promisifyDBRequest(store.put(value, k));
  }

  remove = async (key: string) => {
    const store = await this.getObjectStore('readwrite');
    return await promisifyDBRequest(store.delete(key));
  }

  add = async (value: ValueType, key?: string) => {
    const k = key ?? this.getKey(value);

    if (!k) {
      throw new Error('key is empty !');
    }

    const store = await this.getObjectStore('readwrite');
    return await promisifyDBRequest(store.add(value, k));
  }

  readData = async (cb: (cursor: IDBCursor & { value: ValueType }, reject: (reason?: any) => void) => void, query?: IDBValidKey | IDBKeyRange | null, direction?: IDBCursorDirection) => {
    const store = await this.getObjectStore();
    await new Promise<void>((_resolve, _reject) => {
      const request = store.openCursor(query, direction);
      request.onsuccess = (ev: Event) => {
        const cur = (ev.target as any).result as IDBCursor & { value: ValueType };
        if (cur) {
          cb(cur, _resolve);
        } else {
          _resolve();
        }
      };

      request.onerror = _reject;
    });
  }

  getAllData = async () => {
    const data = new Set();
    await this.readData((cursor, reject) => {
      const { value } = cursor;
      if (isNil(value)) {
        reject('value is nil !');
      } else {
        data.add(value);
      }
    });

    return data;
  }
}
