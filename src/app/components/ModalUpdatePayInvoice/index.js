import React, { useEffect, useRef, useState } from "react";
import ClickOutSide from "../hook/ClickOutSide";
import style from "./index.module.css";
import SelectDropdown from "../SelectDropdown";
import axios from "axios";

const listPay = [
  { id: 1, name: "Chưa Thanh Toán" },
  { id: 2, name: "Chờ Xác Nhận Thanh Toán" },
  { id: 3, name: "Đã Thanh Toán" },
];

export default function ModalUpdatePayInvoice({
  setShowModal,
  handleUpdatePayInvoice,
  idInvoice,
  titleSelect,
}) {
  const selectRef = useRef(null);
  const [id_pay, set_id_pay] = useState(0);
  const [name_pay, set_name_pay] = useState("");

  const handleCloseBox = () => {
    setShowModal(false);
  };
  const handleSelectPay = (id, name) => {
    set_id_pay(id);
    set_name_pay(name);
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
                  <h3 className="text-3xl font-semibold">CHANGE PAY ORDER</h3>
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
                  <p className={style.id_invoice}>ID INVOICE : {idInvoice}</p>
                  <SelectDropdown
                    styleDrop={{ width: "100%" }}
                    styleDropBox={{ height: "auto", overflowY: "auto" }}
                    items={listPay}
                    title_select={titleSelect}
                    handleSelect={handleSelectPay}
                  ></SelectDropdown>
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
                    disabled={id_pay === 0 ? true : false}
                    style={{ backgroundColor: id_pay === 0 ? "#ccc" : "" }}
                    onClick={() => {
                      setShowModal(false);
                      handleUpdatePayInvoice(id_pay, name_pay);
                    }}
                  >
                    Save
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
