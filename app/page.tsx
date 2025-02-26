"use client";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { Schoolbell } from "next/font/google";
import { TbPlaylistX } from "react-icons/tb";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { classNames } from "./utils/appearance";
import { useTheme } from "./context/ThemeContext";
import { storeToIndexedDb } from "./utils/storeToIndexedDb";
import { getDataFromIndexedDb } from "./utils/getDataFromIndexedDb";
import ShoppingListForm from "./components/home/ShoppingListForm";

const schoolbell = Schoolbell({
  weight: "400",
  subsets: ["latin"],
});

type ListItem = {
  name: string;
  status: boolean;
};

const ListItemComponent = ({
  item,
  onDelete,
  onMarkAsDone,
}: {
  item: ListItem;
  onDelete: (name: string) => void;
  onMarkAsDone: (name: string) => void;
}) => (
  <div
    className="flex items-center justify-between w-full border-darkGray/20 border-b pb-2"
    key={item.name}
  >
    <span
      className={classNames(
        "tracking-widest uppercase font-bold text-xl",
        item.status && "line-through animate-fade-in-left"
      )}
    >
      {item.name}
    </span>
    <div className="flex items-center gap-4">
      <TbPlaylistX
        aria-label={`delete ${item.name}`}
        className="w-6 h-6 text-red-500 cursor-pointer"
        onClick={() => onDelete(item.name)}
      />
      <IoCheckmarkSharp
        aria-label={
          item.status
            ? `mark ${item.name} as undone`
            : `mark ${item.name} as done`
        }
        className={classNames(
          "w-6 h-6 cursor-pointer",
          item.status && "text-green-500"
        )}
        onClick={() => onMarkAsDone(item.name)}
      />
    </div>
  </div>
);

export default function Home() {
  const [list, setList] = useState<ListItem[]>([]);
  const { theme } = useTheme();
  const dbName = "list_db";
  const storeName = "list_store";

  useEffect(() => {
    const fetchListFromIndexedDb = async () => {
      const storedList = await getDataFromIndexedDb(dbName, storeName);
      if (storedList) setList(storedList);
    };
    fetchListFromIndexedDb();
  }, []);

  const handleFormSubmit = (data: { listItem: string }) => {
    const updatedList = [{ name: data.listItem, status: false }, ...list];
    storeToIndexedDb(updatedList, dbName, storeName);
    setList(updatedList);
  };

  const handleDelete = (itemToDelete: string) => {
    const updatedList = list.filter((item) => item.name !== itemToDelete);
    storeToIndexedDb(updatedList, dbName, storeName);
    setList(updatedList);
  };

  const handleMarkedAsDone = (itemToMark: string) => {
    const updatedList = list.map((item) =>
      item.name === itemToMark ? { ...item, status: !item.status } : item
    );
    storeToIndexedDb(updatedList, dbName, storeName);
    setList(updatedList);
  };

  return (
    <div className={classNames("h-full pt-24", theme.secondary)}>
      <Header />
      <Container>
        <ShoppingListForm onSubmit={handleFormSubmit} />

        <div
          className={`flex flex-col gap-4 overflow-auto h-[460px] md:h-[900px] lg:h-[1050px] pb-32 ${schoolbell.className}`}
        >
          {list.map((item, index) => (
            <ListItemComponent
              key={index}
              item={item}
              onDelete={handleDelete}
              onMarkAsDone={handleMarkedAsDone}
            />
          ))}
        </div>
      </Container>
      <Navbar />
    </div>
  );
}
