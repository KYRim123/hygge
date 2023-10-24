import React, { useEffect, useRef, useState } from "react";
import ClickOutSide from "../hook/ClickOutSide";
import style from "./index.module.css";
import Image from "next/image";

export default function ShowImage({ setShowImage, urlImage }) {
  const selectRef = useRef(null);
  const handleCloseBox = () => {
    setShowImage(false);
  };

  return (
    <>
      <div>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-500 bg-opacity-50">
          {" "}
          <ClickOutSide
            selectRef={selectRef}
            closeBox={handleCloseBox}
          >
            <div className={`"relative w-auto my-6 mx-auto max-w-3xl" ${style.body}`}>
              {/*content*/}
              <Image
                className={style.image}
                src={urlImage}
                alt="â"
                width={700}
                height={700}
              />
            </div>
          </ClickOutSide>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    </>
  );
}
