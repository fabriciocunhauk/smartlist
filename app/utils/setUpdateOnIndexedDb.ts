import { getObjectStoreId } from "./getObjecStoreId";

interface Theme {
  id?: number;
  colorCode: string;
  text: string,
    primary: string,
    secondary: string
}

export const setUpdateOnIndexedDb = async (
  dbName: string,
  storeName: string,
  id: number,
  updatedData: Theme
) => {
  const objectStoreId = await getObjectStoreId(dbName, storeName);
  const request = indexedDB.open(dbName);

  return new Promise((resolve, reject) => {
    request.onsuccess = (event: any) => {
      const db = event.target.result;
      const transaction = db.transaction(storeName, 'readwrite');
      const objectStore = transaction.objectStore(storeName);

      const getBikesRequest = objectStore.get(objectStoreId);

      getBikesRequest.onsuccess = async (event: { target: { result: Theme[]; }; }) => {
        const existingData = event.target.result || [];

        const dataIndex = existingData.findIndex((data) => data.id === id);

        if (dataIndex !== -1) {
          existingData[dataIndex] = updatedData;
          await objectStore.clear();
          await objectStore.put(existingData);
          resolve(existingData[dataIndex]);
        } else {
          console.warn("Data not found in IndexedDB");
          reject(new Error("Data not found"));
        }
      };

      transaction.oncomplete = () => {
        console.log("Data updated in IndexedDB");
      };

      transaction.onerror = (event: { target: { error: any; }; }) => {
        console.error("Error updating data in IndexedDB:", event.target.error);
        reject(event.target.error); 
      };
    };

    request.onerror = (event: any) => {
      console.error("Error opening IndexedDB:", event.target.error);
      reject(event.target.error); 
    };
  });
};
