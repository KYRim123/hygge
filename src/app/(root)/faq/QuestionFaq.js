import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function QuestionFaq({ contentItem, contentIndex }) {
  const [showContent, setShowContent] = useState(false);

  const handleShowContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div
      className=" w-[600px]"
      key={contentIndex}
    >
      <div className="flex justify-between items-start transition ">
        <p className="text-3xl flex-1 font-semibold leading-10">
          {contentIndex + 1}.{contentItem.cau_hoi}
        </p>
        <button
          onClick={handleShowContent}
          className="border-inherit border-[1px] w-12 h-12 flex justify-center items-center rounded-full"
        >
          {showContent ? (
            <BiChevronDown
              size={34}
              className={"animate-spin0to180"}
            />
          ) : (
            <BiChevronUp
              size={34}
              className={"animate-spin180to0"}
            />
          )}
        </button>
      </div>
      <p
        className={` text-gray-500 text-xl overflow-hidden transition-max-h duration-500 ease-linear ${
          showContent ? "max-h-full opacity-70" : "max-h-0 opacity-0"
        }`}
      >
        {contentItem?.cau_tra_loi}
      </p>
    </div>
  );
}
