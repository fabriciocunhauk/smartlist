import getIndexedDb from "./getIndexedDb";

export async function storeToIndexedDb<T>(data: T, dbName: string, storeName: string) {
  try {
    const store = await getIndexedDb(dbName, storeName, "readwrite");
    store.clear();
    const request = store.put(data);

    request.onsuccess = () => {
      // console.log("New data stored in IndexedDB:", request.result);
    };

    request.onerror = (error) => {
      console.error(`Error storing new data in ${storeName}:`, error);
    };
  } catch (error) {
    console.error(`Error updating data in IndexedDB (${dbName}):`, error);
  }
}
