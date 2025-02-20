import getIndexedDb from "./getIndexedDb";

export async function getDataFromIndexedDb(dbName: string, storeName: string) {

  try {
      const store = await getIndexedDb(dbName, storeName, "readonly");

    const requests = await new Promise((resolve, reject) => {
      const request = store.getAll();
      request.addEventListener('success', () => resolve(request));
      request.addEventListener('error', reject);
    }) as IDBRequest;

    return requests.result[0];
  } catch (error) {
    console.error("Error fetching from IndexedDB:", error);
    return null;
  }
}
