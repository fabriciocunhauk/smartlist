import React from "react";

function Spinner() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50">
      <div className="border-4 border-white border-l-orange rounded-full w-30 h-30 animate-spin">
        <svg className="size-10 animate-spin" viewBox="0 0 24 24"></svg>
      </div>
    </div>
  );
}

export default Spinner;
