"use client";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";
import style from "./index.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Position() {
  const [data, set_data] = useState();
  const [position, set_position] = useState();
  const [list_power, set_list_power] = useState([]);
  const [id_position, set_id_position] = useState();
  const [input_position, set_input_position] = useState("");
  const dataPower = async () => {
    await axios
      .get(`${process.env.HTTPS_URL}/api/quyen-han/list`)
      .then((res) => {
        if (res.data.status == true) {
          set_data(res.data.data);
        } else {
        }
      })
      .catch((err) => {});
  };

  const dataPosition = async () => {
    await axios
      .get(`${process.env.HTTPS_URL}/api/chuc-vu/list`)
      .then((res) => {
        if (res.data.status == true) {
          const formattedData = res.data.data.map((item) => ({
            id: item.id,
            name: item.ten_chuc_vu,
          }));
          set_position(formattedData);
        } else {
        }
      })
      .catch((err) => {});
  };

  const postPosition = async (id) => {
    await axios
      .post(`${process.env.HTTPS_URL}/api/chuc-vu/quyen-han`, { id: id })
      .then((res) => {
        if (res.data.status == true) {
          set_list_power(res.data.data);
        } else {
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    dataPower();
    dataPosition();
  }, []);
  const handleSelectPosition = (id, name) => {
    set_id_position(id);
    postPosition(id);
  };

  const handleOnClickSavePosition = async () => {
    await axios
      .post(`${process.env.HTTPS_URL}/api/chuc-vu/update`, { id: id_position, list_quyen_han: list_power })
      .then((res) => {
        if (res.data.status == true) {
          toast.success("Lưu Thành Công!");
        } else {
        }
      })
      .catch((err) => {
        toast.success(err);
      });
  };

  const handleOnClickAddPosition = async () => {
    await axios
      .post(`${process.env.HTTPS_URL}/api/chuc-vu/create`, { ten_chuc_vu: input_position })
      .then((res) => {
        if (res.data.status == true) {
          toast.success("Thêm Thành Công!");
          set_input_position("");
          dataPosition();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.success(err);
      });
  };

  const handleChangePosition = (id) => {
    if (id_position != null) {
      if (list_power == null) {
        set_list_power([id]);
      } else if (list_power.includes(id)) {
        set_list_power(list_power.filter((item) => item !== id));
      } else {
        set_list_power([...list_power, id]);
      }
    } else {
      toast.error("Vui Lòng Chọn Chức Vụ Trước !");
    }
  };

  return (
    <div className="px-6">
      <div>
        <div className={style.title_input}>Thêm Chức Vụ</div>
        <div className="flex mb-6">
          <input
            className={style.input_form_input}
            type="text"
            placeholder="Nhập Chức Vụ Cần Thêm"
            value={input_position}
            onChange={(e) => set_input_position(e.target.value)}
          ></input>
          <button
            className={style.btn_add_position}
            onClick={handleOnClickAddPosition}
          >
            Thêm
          </button>
        </div>
      </div>
      <div className="">
        <div className="w-[300px] mb-4">
          <div className={style.title_input}>Chọn Chức Vụ</div>
          <div>
            <SelectDropdownAdmin
              items={position}
              title_select="Chức Vụ"
              handleSelect={handleSelectPosition}
            ></SelectDropdownAdmin>
          </div>
        </div>
        <div className="col-span-2">
          {data
            ?.filter((item) => item.id_master == 0)
            .map((item, index) => (
              <div key={index}>
                <div className="font-bold">{item.ten_quyen_han}</div>
                <div className="mx-4 flex flex-wrap">
                  {data
                    ?.filter((item_child) => item_child.id_master == item.id)
                    .map((item_child, index_child) => (
                      <div
                        key={index_child}
                        className="flex"
                      >
                        <div className="mr-8">
                          <input
                            type="checkbox"
                            checked={list_power?.includes(item_child.id) ? true : false}
                            onChange={() => handleChangePosition(item_child.id)}
                            id={item_child.id_master + "_" + item_child.id}
                          ></input>
                          <label
                            className="ml-1"
                            htmlFor={item_child.id_master + "_" + item_child.id}
                          >
                            {item_child.ten_quyen_han}
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
        <div className="text-center">
          <button
            className={`${style.btn_add_position}`}
            onClick={handleOnClickSavePosition}
          >
            Lưu Thay Đổi
          </button>
        </div>
      </div>
    </div>
  );
}
