import React, { useEffect, useRef, useState } from "react";
import ClickOutSide from "../hook/ClickOutSide";
import style from "./index.module.css";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
const STAR = [1, 2, 3, 4, 5];

export default function ModalReview({ setShowModal, handleAddNewReview }) {
  const selectRef = useRef(null);
  const [comment, set_comment] = useState("");
  const [star, set_star] = useState(5);
  const handleCloseBox = () => {
    setShowModal(false);
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
            <div
              className="relative w-auto my-6 mx-auto max-w-3xl"
              style={{ width: "600px" }}
            >
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">ADD REVIEW</h3>
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
                  <div className={style.title_input}>Vote Star</div>
                  <div className="flex justify-center">
                    {STAR.map((st, index) =>
                      st * 1 <= star ? (
                        <AiFillStar
                          key={index}
                          className={style.star_1}
                          size={30}
                          color="#cc005e"
                          onMouseEnter={() => set_star(st)}
                        />
                      ) : (
                        <AiOutlineStar
                          key={index}
                          className={style.star_5}
                          size={30}
                          color="#cc005e"
                          onMouseEnter={() => set_star(st)}
                        />
                      ),
                    )}
                  </div>
                  <div className={style.title_input}>Input New Reivew</div>
                  <textarea
                    className={style.input_form_input}
                    placeholder={"Create a New Review"}
                    name=""
                    id=""
                    cols="30"
                    rows="3"
                    value={comment}
                    onChange={(e) => set_comment(e.target.value)}
                  ></textarea>
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
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    disabled={comment === "" ? true : false}
                    style={{ backgroundColor: comment === "" ? "#ccc" : "" }}
                    onClick={() => {
                      setShowModal(false);
                      handleAddNewReview(comment, star);
                    }}
                  >
                    Review
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
