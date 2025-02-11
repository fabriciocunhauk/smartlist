import React from "react";
import Button from "./Button";
import { LuScanText } from "react-icons/lu";
import { FaRegKeyboard } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { LiaStoreAltSolid } from "react-icons/lia";
import { MdOutlineHome } from "react-icons/md";

function Navbar() {
  return (
    <footer className="fixed bottom-0 flex items-center justify-between h-20 w-full p-4 bg-orange text-white">
      <Button
        link="/"
        classes={{
          link: "flex flex-col bg-transparent hover:bg-transparent h-20",
        }}
      >
        <MdOutlineHome className="w-7 h-7" />
        <span className="text-xs">Home</span>
      </Button>
      <Button
        link="/scan-receipt"
        classes={{
          link: "flex flex-col bg-transparent hover:bg-transparent h-20",
        }}
      >
        <LuScanText className="w-7 h-7" />
        <span className="text-xs">Scan</span>
      </Button>
      <Button
        link="/register-product"
        classes={{
          link: "flex flex-col bg-transparent hover:bg-transparent h-20",
        }}
      >
        <FaRegKeyboard className="w-7 h-7" />
        <span className="text-xs">Register</span>
      </Button>
      <Button
        link="/compare-prices"
        classes={{
          link: "flex flex-col bg-transparent hover:bg-transparent h-20",
        }}
      >
        <IoIosList className="w-7 h-7" />
        <span className="text-xs">Compare</span>
      </Button>
      <Button
        link="/history"
        classes={{
          link: "flex flex-col bg-transparent hover:bg-transparent h-20",
        }}
      >
        <LiaStoreAltSolid className="w-7 h-7" />
        <span className="text-xs">History</span>
      </Button>
    </footer>
  );
}

export default Navbar;
