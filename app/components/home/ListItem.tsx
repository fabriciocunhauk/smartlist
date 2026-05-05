import React from "react";
import { TbPlaylistX } from "react-icons/tb";
import { IoCheckmarkSharp } from "react-icons/io5";
import { classNames } from "../../utils/appearance";

export type ListItemType = {
  name: string;
  status: boolean;
};

type ListItemProps = {
  item: ListItemType;
  onDelete: (name: string) => void;
  onMarkAsDone: (name: string) => void;
};

const ListItem = ({ item, onDelete, onMarkAsDone }: ListItemProps) => {
  return (
    <div className="flex items-center justify-between w-full border-darkGray/20 border-b pb-2">
      <span
        className={classNames(
          "tracking-widest uppercase font-bold text-xl",
          item.status && "line-through animate-fade-in-left"
        )}
      >
        {item.name}
      </span>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onDelete(item.name)}
          aria-label={`delete ${item.name}`}
          className="focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
        >
          <TbPlaylistX className="w-6 h-6 text-red-500 cursor-pointer hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={() => onMarkAsDone(item.name)}
          aria-label={
            item.status ? `mark ${item.name} as undone` : `mark ${item.name} as done`
          }
          className="focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
        >
          <IoCheckmarkSharp
            className={classNames(
              "w-6 h-6 cursor-pointer hover:scale-110 transition-transform",
              item.status && "text-green-500"
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default React.memo(ListItem);
