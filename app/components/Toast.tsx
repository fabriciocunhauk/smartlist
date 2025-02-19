import { classNames } from "../utils/appearance";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkSharp, IoWarningOutline } from "react-icons/io5";

interface ToastPropTypes {
  setToastAlertSettings: (toastAlertSettings: {
    active: boolean;
    color: "error" | "warning";
    message: string;
  }) => any;

  toastAlertSettings: {
    active: boolean;
    color: string;
    message: string;
  };
}

function Toast({ setToastAlertSettings, toastAlertSettings }: ToastPropTypes) {
  let bgColor = "";

  if (toastAlertSettings.color === "error") {
    bgColor = "bg-red-500 text-white";
  }

  if (toastAlertSettings.color === "warning") {
    bgColor = "bg-lightOrange text-orange";
  }

  return (
    <div
      className={classNames(
        "mx-auto space-y-3 z-50 transition duration-300 ease-in-out absolute -top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px]",
        toastAlertSettings.active ? "translate-y-16" : "-translate-y-20"
      )}
    >
      <div
        className={classNames(
          "border border-gray-200 font-semibold text-gray-800 rounded-lg dark:border-white/20 p-2 py-4",
          `${bgColor}`
        )}
        role="alert"
      >
        <div className="flex gap-2">
          <div className="m-auto inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg">
            {toastAlertSettings.color === "error" ? (
              <IoWarningOutline className="size-14" />
            ) : (
              <IoCheckmarkSharp className="size-14" />
            )}
          </div>
          <span className="m-auto text-sm">{toastAlertSettings.message}</span>
          <button
            type="button"
            onClick={() =>
              setToastAlertSettings({
                active: false,
                color: "error",
                message: toastAlertSettings.message,
              })
            }
            className="m-auto inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
          >
            <span className="sr-only">Close</span>
            <IoMdClose className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toast;
