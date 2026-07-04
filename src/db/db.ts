import type { CashBookProps } from "../types/cashbook";

/** indexedDBのデータベース名 */
const dbName = "cashbookApp";
/** indexedDBのオブジェクトストア(テーブル)名 */
const storeName = "entries";

const dbVersion = 1;

/**
 * データベースを開く
 * @returns
 */
function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    /** データベースを開く */
    const request = indexedDB.open(dbName, dbVersion);
    request.onupgradeneeded = (event) => {
      // データベースの初回作成、またはバージョンが更新されている場合
      const db = (event.target as IDBOpenDBRequest).result;

      // このデータベース用のオブジェクトストアを作成する
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    // 開いた
    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };
    // 開かない
    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

/**
 * データを取得する
 * @returns
 */
export function getEntries(): Promise<CashBookProps[]> {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      /** トランザクション (読み取り専用) */
      const transaction = db.transaction(storeName, "readonly");
      /** 対象のオブジェクトストア */
      const store = transaction.objectStore(storeName);
      /** データ取得 */
      const request = store.getAll();

      // 取得できた
      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest<CashBookProps[]>).result);
      };
      // 取得できない
      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  });
}

/**
 * データを追加する
 * @param {*} entry 追加するデータ
 * @returns
 */
export function saveEntry(entry: Omit<CashBookProps, "id">): Promise<void> {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      /** トランザクション (書き込み) */
      const transaction = db.transaction(storeName, "readwrite");
      /** 対象のオブジェクトストア */
      const store = transaction.objectStore(storeName);
      // 追加
      console.log(entry);
      const request = store.add(entry);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  });
}

/**
 * データを更新する
 * @param {*} id
 * @param {*} updatedData
 * @returns
 */
export function updateEntry(
  id: number,
  updatedData: Omit<CashBookProps, "id">,
): Promise<void> {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put({ ...updatedData, id }); // 更新処理

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  });
}

/**
 * データを削除する
 * @param {*} id
 * @returns
 */
export function deleteEntry(id: number): Promise<void> {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(id); // 削除処理

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  });
}

/**
 * データを取得(ID)する
 * @param {*} id
 * @returns
 */
export function getEntryById(id: number): Promise<CashBookProps | undefined> {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest<CashBookProps>).result);
      };
      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  });
}

/**
 * データを一括削除／登録する
 * @param {*} entries 追加するデータ
 * @returns
 */
export function bulkDeleteInsertEntry(
  entries: Omit<CashBookProps, "id">[],
): Promise<void> {
  return openDatabase().then((db) => {
    return new Promise((resolve, reject) => {
      /** トランザクション (書き込み) */
      const transaction = db.transaction(storeName, "readwrite");
      /** 対象のオブジェクトストア */
      const store = transaction.objectStore(storeName);

      // トランザクションイベントで成否を管理
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);

      // 全削除
      store.clear();

      // 追加
      for (const entry of entries) {
        const req = store.add(entry);
        req.onerror = (event) => {
          console.error("add error:", (event.target as IDBRequest).error);
        };
      }
    });
  });
}
