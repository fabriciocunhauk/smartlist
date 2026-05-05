"use client";

import { useEffect, useState, useCallback } from "react";
import ShoppingListForm from "./ShoppingListForm";
import ListItem, { ListItemType } from "./ListItem";
import { getDataFromIndexedDb } from "../../utils/getDataFromIndexedDb";
import { storeToIndexedDb } from "../../utils/storeToIndexedDb";
import Spinner from "../Spinner";
import { Schoolbell } from "next/font/google";

const schoolbell = Schoolbell({
  weight: "400",
  subsets: ["latin"],
});

const DB_NAME = "list_db";
const STORE_NAME = "list_store";

export default function ShoppingList() {
  const [list, setList] = useState<ListItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListFromIndexedDb = async () => {
      try {
        const storedList = await getDataFromIndexedDb(DB_NAME, STORE_NAME);
        if (storedList) {
          setList(storedList);
        }
      } catch (error) {
        console.error("Failed to fetch list from IndexedDB", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListFromIndexedDb();
  }, []);

  const handleFormSubmit = useCallback((data: { listItem: string }) => {
    setList((prevList) => {
      const updatedList = [{ name: data.listItem, status: false }, ...prevList];
      storeToIndexedDb(updatedList, DB_NAME, STORE_NAME);
      return updatedList;
    });
  }, []);

  const handleDelete = useCallback((itemToDelete: string) => {
    setList((prevList) => {
      const updatedList = prevList.filter((item) => item.name !== itemToDelete);
      storeToIndexedDb(updatedList, DB_NAME, STORE_NAME);
      return updatedList;
    });
  }, []);

  const handleMarkedAsDone = useCallback((itemToMark: string) => {
    setList((prevList) => {
      const updatedList = prevList.map((item) =>
        item.name === itemToMark ? { ...item, status: !item.status } : item
      );
      storeToIndexedDb(updatedList, DB_NAME, STORE_NAME);
      return updatedList;
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <ShoppingListForm onSubmit={handleFormSubmit} />

      <div
        className={`flex flex-col gap-4 overflow-auto h-[460px] md:h-[900px] lg:h-[1050px] pb-32 mt-6 ${schoolbell.className}`}
      >
        {list.length === 0 ? (
          <p className="text-center text-darkGray/60 mt-10">
            Your shopping list is empty. Add some items!
          </p>
        ) : (
          list.map((item) => (
            <ListItem
              key={item.name}
              item={item}
              onDelete={handleDelete}
              onMarkAsDone={handleMarkedAsDone}
            />
          ))
        )}
      </div>
    </>
  );
}
