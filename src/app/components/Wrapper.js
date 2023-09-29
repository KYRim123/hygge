import React from "react";

export default function Wrapper({ children }) {
  return (
    <div className="flex justify-center py-10 px-5 overflow-x-hidden">
      <div className="w-[1250px]">{children}</div>
    </div>
  );
}
