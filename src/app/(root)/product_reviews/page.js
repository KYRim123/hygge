"use client";

import { useState } from "react";

const ProductReviews = () => {
  const tabAll = 0;
  const [crTab, setCrTab] = useState(tabAll);
  const tabs = [
    { nameTab: "The product has been evaluated" },
    { nameTab: "The product has not been rated yet" },
  ];
  const handleClickTab = (index) => {
    setCrTab(index);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        {tabs.length > 0 &&
          tabs.map((tab, index) => (
            <div
              key={index}
              className={`flex-grow text-center capitalize text-lg cursor-pointer border-b-[2px] transition-all ${
                index === crTab ? "text-main-100 border-main-100 " : "border-gray-100"
              }`}
              onClick={() => handleClickTab(index)}
            >
              <span className="py-2 block">{tab.nameTab}</span>
            </div>
          ))}
      </div>
      <div className="mt-2 h-[500px]">
        <div className="h-full overflow-y-scroll">a</div>
      </div>
    </div>
  );
};

export default ProductReviews;
