import getIndexedDb from "./getIndexedDb";

export async function getDataFromIndexedDb<T = any>(dbName: string, storeName: string): Promise<T | null> {
  try {
    const store = await getIndexedDb(dbName, storeName, "readonly");

    const requests = await new Promise<IDBRequest>((resolve, reject) => {
      const request = store.getAll();
      request.addEventListener('success', () => resolve(request));
      request.addEventListener('error', reject);
    });

    return requests.result[0] as T;
  } catch (error) {
    console.error(`Error fetching from IndexedDB (${dbName}/${storeName}):`, error);
    return null;
  }
}
