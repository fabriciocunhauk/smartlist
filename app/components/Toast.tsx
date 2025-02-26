"use client";

import { classNames } from "../utils/appearance";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkSharp, IoWarningOutline } from "react-icons/io5";
import { useToastMessage } from "../context/ToastMessageContext";

const Toast = () => {
  const { active, color, message, setToastContent } = useToastMessage();

  const getBackgroundColor = () => {
    switch (color) {
      case "success":
        return "bg-green-500/80";
      case "error":
        return "bg-red-500/80";
      default:
        return "bg-transparent";
    }
  };

  const handleClose = () => {
    setToastContent({
      active: false,
      color,
      message,
    });
  };

  return (
    <div
      className={classNames(
        "mx-auto space-y-3 z-50 transition-all delay-200 duration-300 ease-in-out fixed -top-14 left-1/2 transform -translate-x-1/2 w-full lg:w-[400px] px-4",
        active ? "translate-y-16" : "-translate-y-28"
      )}
    >
      <div>
        <div
          className={classNames(
            "border font-semibold rounded-lg border-white p-3 text-center text-white flex gap-2 items-center",
            getBackgroundColor()
          )}
          role="alert"
        >
          <div className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg">
            {color === "error" ? (
              <IoWarningOutline className="size-8" />
            ) : (
              <IoCheckmarkSharp className="size-8" />
            )}
          </div>

          <span className="flex-grow text-sm">{message}</span>

          <button
            type="button"
            onClick={handleClose}
            className="flex justify-center items-center size-12 rounded-lg opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
          >
            <span className="sr-only">Close</span>
            <IoMdClose className="size-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
