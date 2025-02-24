import getIndexedDb from "./getIndexedDb";

export async function getObjectStoreId(dbName: string, storeName: string): Promise<number | null> {
  try {
    const store = await getIndexedDb(dbName, storeName, "readonly");

    const request = store.getAll();
    const result = await new Promise<any>((resolve, reject) => {
      request.addEventListener("success", () => resolve(request.result));
      request.addEventListener("error", reject);
    });

    return result[0].id;
  } catch (error) {
    console.error("Error fetching from IndexedDB:", error);
    return null;
  }
}
