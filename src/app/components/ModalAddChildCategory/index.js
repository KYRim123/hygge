import React, { useEffect, useRef, useState } from "react";
import ClickOutSide from "../hook/ClickOutSide";
import style from "./index.module.css";
import SelectDropdown from "../SelectDropdown";
import axios from "axios";

export default function ModalAddCategoryChild({setShowModal , handleAddNewCategoryChild, categories , idCategory,titleCategory}) {
    const selectRef = useRef(null);
    const [name_new_category_child,set_name_new_category_child] = useState('');
    const [id_category,set_id_category] = useState(idCategory);
    const [selected_item_prop,set_selected_item_prop] = useState(titleCategory || '')
    const [new_categories,set_new_categories] = useState(categories || []);
    const [name_category,set_name_category] = useState('');
    useEffect(()=>{
      const formattedData = categories.map(item => ({
        id: item.id,
        name: item.ten_dong_san_pham
      }));
      set_new_categories(formattedData);
    },[categories])
    const handleCloseBox = () => {
        setShowModal(false);
      };
    const handleSelectCategory = (id,name) => {
        set_id_category(id)
        set_name_category(name)
    }
    
  return (
    <>
    
        <div>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-500 bg-opacity-50"
          > <ClickOutSide
          selectRef={selectRef}
          closeBox={handleCloseBox}
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl" style={{ width: '600px' }}>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    ADD CHILD CATEGORY
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
                <SelectDropdown
                    styleDrop={{ width: '100%' }}
                    styleDropBox={{ height: '200px' , overflowY : 'scroll'}}
                    items={new_categories}
                    title_select="Category"
                    handleSelect={handleSelectCategory}
                    selectedItemProp={selected_item_prop}
                ></SelectDropdown>
                <div className={style.title_input}>Input New Category</div> 
                <input className={style.input_form_input} type="text" placeholder={"Create a New Category"} value={name_new_category_child} onChange={(e)=>set_name_new_category_child(e.target.value)}>
                </input>
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
                    disabled={id_category === 0 || name_new_category_child === '' ? true : false}
                    style={{ backgroundColor: id_category === 0 || name_new_category_child === '' ? "#ccc" : '' }}
                    onClick={() => {setShowModal(false);handleAddNewCategoryChild(name_new_category_child,id_category,name_category)}}
                  >
                    ADD NEW
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