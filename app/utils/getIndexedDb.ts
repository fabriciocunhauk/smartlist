// Function to open and access the browser database
export default async function getIndexedDb(dbName: string, storeName: string, mode: IDBTransactionMode) {
  const request = indexedDB.open(dbName, 1);
  
  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result;
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, {
        keyPath: "id",
        autoIncrement: true
      });
    }
  };

  const db = await new Promise < IDBDatabase > ((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as IDBDatabase);
    request.onerror = reject;
  });

  const transaction = db.transaction(storeName, mode);
  const store = transaction.objectStore(storeName);

  return store
}
