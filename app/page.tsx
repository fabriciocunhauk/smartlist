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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "./components/ThemeProvider";

const ListSchema = z.object({
  listItem: z.string().min(2, "Minimum of 2 characters is required"),
});

const schoolbell = Schoolbell({
  weight: "400",
  subsets: ["latin"],
});

type ListItem = {
  name: string;
  status: boolean;
};

export default function Home() {
  const [list, setList] = useState<ListItem[]>([]);
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof ListSchema>>({
    resolver: zodResolver(ListSchema),
  });

  useEffect(() => {
    const storedList = localStorage.getItem("list_item");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  const onSubmit = (data: z.infer<typeof ListSchema>) => {
    const updatedList = [{ name: data.listItem, status: false }, ...list];
    localStorage.setItem("list_item", JSON.stringify(updatedList));
    setList(updatedList);
    reset();
  };

  const handleDelete = (itemToDelete: string) => {
    const updatedList = list.filter((item) => item.name !== itemToDelete);
    localStorage.setItem("list_item", JSON.stringify(updatedList));
    setList(updatedList);
  };

  const handleMarkedAsDone = (itemToMark: string) => {
    const updatedList = list.map((item) =>
      item.name === itemToMark ? { ...item, status: !item.status } : item
    );
    localStorage.setItem("list_item", JSON.stringify(updatedList));
    setList(updatedList);
  };

  return (
    <div className={theme.secondary}>
      <Header />
      <Container>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 mt-24">
          <div className="flex flex-col gap-4 w-full mb-10">
            <label htmlFor="listItem" className="sr-only">
              Add shopping list item
            </label>
            <input
              type="text"
              id="listItem"
              className="border rounded w-full h-11 pl-4 uppercase"
              placeholder="Add To Shopping List"
              {...register("listItem")}
            />
            {errors.listItem && (
              <span className="text-xs text-red-500 mx-auto">
                {errors.listItem.message}
              </span>
            )}
          </div>
          <Button type="submit">
            <MdFormatListBulletedAdd className="w-10 h-7 text-white" />
          </Button>
        </form>

        <div
          className={`flex flex-col gap-4 overflow-auto h-[400px] sm:h-[450px] md:h-[900px] lg:h-[1200px] pb-32 ${schoolbell.className}`}
        >
          {list.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full border-darkGray/20 border-b pb-2"
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
                  onClick={() => handleDelete(item.name)}
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
                  onClick={() => handleMarkedAsDone(item.name)}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Navbar />
    </div>
  );
}
