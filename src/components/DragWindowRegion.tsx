import React from "react";

export default function DragWindowRegion() {
  return (
    <div className="flex w-screen items-stretch justify-between">
      <div className="draglayer w-full">
        <div className="flex flex-1 p-2 text-xs whitespace-nowrap text-gray-400 select-none"></div>
      </div>
    </div>
  );
}
