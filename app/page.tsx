"use client";
import Card from "./components/Card";
import Container from "./components/Container";
import { SiTicktick } from "react-icons/si";
import { RiCloseCircleLine } from "react-icons/ri";
import { MdFormatListBulletedAdd } from "react-icons/md";
import Button from "./components/Button";
import { useEffect, useState } from "react";
import { classNames } from "./utils/appearance";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

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
    const updatedList = [...list, { name: listItem, status: false }];
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
      <Container classes={{ container: "pb-24" }}>
        <form onSubmit={handleSave} className="flex gap-4 mt-24">
          <input
            type="text"
            onChange={(event) => setListItem(event.target.value)}
            className="border rounded w-full h-11 mb-10 pl-4 uppercase"
            placeholder="Add To Shopping List"
            value={listItem}
          />
          <Button type="submit">
            <MdFormatListBulletedAdd className="w-6 h-6 text-white" />
          </Button>
        </form>

        <div className="flex flex-col gap-4 overflow-auto justify-between h-[640px]">
          {list.map((list, index) => (
            <Card
              key={index}
              classes={{
                card: "flex items-center justify-between w-full h-20 border rounded",
              }}
            >
              <span className=" uppercase">{list.name}</span>
              <div className="flex items-center gap-4">
                <RiCloseCircleLine
                  className="w-6 h-6 text-red-500 cursor-pointer"
                  onClick={() => handleDelete(list.name)}
                />
                <SiTicktick
                  className={classNames(
                    "w-5 h-5 text-gray-500 cursor-pointer",
                    list.status && "text-green-500"
                  )}
                  onClick={() => handleMarkedAsDone(list.name)}
                />
              </div>
            </Card>
          ))}
        </div>
      </Container>
      <Navbar />
    </>
  );
}
