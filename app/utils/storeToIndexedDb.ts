import getIndexedDb from "./getIndexedDb";

interface Theme {
  id?: number;
  colorCode: string;
  text: string;
  primary: string;
  secondary: string;
}

type ListItem = {
  name: string;
  status: boolean;
}[];

export async function storeToIndexedDb(data: Theme | Theme[] | ListItem, dbName: string, storeName: string) {
    const store = await getIndexedDb(dbName, storeName, "readwrite");

  try {
    store.clear();
    const request = store.put(data);

    request.onsuccess = () => {
      // console.log("New data stored in IndexedDB:", request.result);
    };

    request.onerror = (error) => {
      console.error("Error storing new data:", error);
    };
  } catch (error) {
    console.error("Error updating data in IndexedDB:", error);
  }
}
