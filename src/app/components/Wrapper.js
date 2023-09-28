import React from "react";

export default function Wrapper({ children }) {
  return (
    <div className="flex justify-center">
      <div className="w-[1250px]">{children}</div>
    </div>
  );
}
