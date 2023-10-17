import React, { useEffect, useRef, useState } from "react";
import ClickOutSide from "../hook/ClickOutSide";
import style from "./index.module.css";

export default function ModalViewDescription({setShowModal,short_description,description}) {
    const selectRef = useRef(null);
    const handleCloseBox = () => {
        setShowModal(false);
      };

  return (
    <>
    
        <div>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-500 bg-opacity-50"
          > <ClickOutSide
          selectRef={selectRef}
          closeBox={handleCloseBox} 
        >
            <div className={`"relative w-auto my-6 mx-auto max-w-3xl" ${style.body}`}>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    View Description
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <div className={style.title}>Short Description</div> 
                <div >{short_description}</div> 
                <div className={style.title}>Description</div> 
                <div className={style.text} dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            </ClickOutSide>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      
        </div>
    </>
  );
}