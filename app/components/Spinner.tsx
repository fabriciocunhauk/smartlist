import React from "react";

function Spinner() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="border-4 border-white border-l-blue-500 rounded-full w-30 h-30 animate-spin">
        <svg className="size-10 animate-spin" viewBox="0 0 24 24"></svg>
      </div>
    </div>
  );
}

export default Spinner;
