"use client";
import Container from "./components/Container";
import { MdFormatListBulletedAdd } from "react-icons/md";
import Button from "./components/Button";
import { useEffect, useState } from "react";
import { classNames } from "./utils/appearance";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { Schoolbell } from "next/font/google";
import { IoCheckmarkSharp } from "react-icons/io5";
import { TbPlaylistX } from "react-icons/tb";

const schoolbell = Schoolbell({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const [listItem, setListItem] = useState("");
  const [list, setList] = useState<{ name: string; status: boolean }[]>([]);

  useEffect(() => {
    const storedList = localStorage.getItem("list_item");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedList = [{ name: listItem, status: false }, ...list];
    localStorage.setItem("list_item", JSON.stringify(updatedList));
    setList(updatedList);
    setListItem("");
  };

  const handleDelete = (itemToDelete: string) => {
    const updatedList = list.filter((list) => list.name !== itemToDelete);
    localStorage.setItem("list_item", JSON.stringify(updatedList));
    setList(updatedList);
  };

  const handleMarkedAsDone = (itemToMark: string) => {
    const updatedList = list.map((list) =>
      list.name === itemToMark ? { ...list, status: !list.status } : list
    );

    localStorage.setItem("list_item", JSON.stringify(updatedList));
    setList(updatedList);
  };

  return (
    <>
      <Header />
      <Container>
        <form onSubmit={handleSave} className="flex gap-4 mt-24">
          <input
            type="text"
            onChange={(event) => setListItem(event.target.value)}
            className="border rounded w-full h-11 mb-10 pl-4 uppercase"
            placeholder="Add To Shopping List"
            value={listItem}
          />
          <Button type="submit">
            <MdFormatListBulletedAdd className="w-10 h-7 text-white" />
          </Button>
        </form>

        <div
          className={`flex flex-col gap-4 overflow-auto h-[400px] md:h-[500px] lg:h-[1000px] pb-10 ${schoolbell.className}`}
        >
          {list.map((list, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full border-darkGray/20 border-b pb-2"
            >
              <span
                className={classNames(
                  "tracking-widest uppercase font-bold text-xl",
                  list.status && "line-through animate-fade-in-left"
                )}
              >
                {list.name}
              </span>
              <div className="flex items-center gap-4">
                <TbPlaylistX
                  className="w-6 h-6 text-red-500 cursor-pointer"
                  onClick={() => handleDelete(list.name)}
                />
                <IoCheckmarkSharp
                  className={classNames(
                    "w-6 h-6 cursor-pointer",
                    list.status && "text-green-500"
                  )}
                  onClick={() => handleMarkedAsDone(list.name)}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Navbar />
    </>
  );
}
