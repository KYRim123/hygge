"use client";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";
import style from "./index.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal";
import TextArea from "antd/es/input/TextArea";
import { AiOutlineEdit } from "react-icons/ai";
import { CiCircleRemove } from "react-icons/ci";

export default function FAQAdmin() {
  const [data, set_data] = useState();
  const [title_faq, set_title_faq] = useState();
  const [id_title_faq, set_id_title_faq] = useState();
  const [input_title_faq, set_input_title_faq] = useState("");
  const [show_modal_add, set_show_modal_add] = useState(false);
  const [show_modal_edit, set_show_modal_edit] = useState(false);
  const [question, set_question] = useState();
  const [answer, set_answer] = useState();
  const [data_edit,set_data_edit] = useState();
  const dataChuDeFAQ = async () => {
    await axios
      .get(`${process.env.HTTPS_URL}/api/chu-de-faq/list`)
      .then((res) => {
        if (res.data.status == true) {
          const formattedData = res.data.data.map((item) => ({
            id: item.id,
            name: item.ten_chu_de,
          }));
          set_title_faq(formattedData);
        } else {
        }
      })
      .catch((err) => {});
  };

  const postFAQ = async (id) => {
    await axios
      .post(`${process.env.HTTPS_URL}/api/faq/list-faq`, { id: id })
      .then((res) => {
        if (res.data.status == true) {
          set_data(res.data.data);
        } else {
        }
      })
      .catch((err) => {});
  };
  useEffect(() => {
    dataChuDeFAQ();
  }, []);

  const handleSelectTitleFAQ = (id, name) => {
    set_id_title_faq(id);
    postFAQ(id);
  };

  const handleOnClickAddTitleFAQ = async () => {
    await axios
      .post(`${process.env.HTTPS_URL}/api/chu-de-faq/create`, { ten_chu_de: input_title_faq })
      .then((res) => {
        if (res.data.status == true) {
          toast.success("Thêm Thành Công!");
          set_input_title_faq("");
          dataChuDeFAQ();
        } else {
          toast.error("");
        }
      })
      .catch((err) => {
        toast.success(err);
      });
  };

  const handleOnClickAddFAQ = async () => {
    await axios
      .post(`${process.env.HTTPS_URL}/api/faq/create`, {
        id_chu_de: id_title_faq,
        cau_hoi: question,
        cau_tra_loi: answer,
      })
      .then((res) => {
        if (res.data.status == true) {
          toast.success("Thêm Thành Công!");
          set_input_title_faq("");
          postFAQ(id_title_faq);
        } else {
          toast.error("");
        }
      })
      .catch((err) => {
        toast.success(err);
      });
  };

  const handleOnClickSaveFAQ = async () => {
    await axios
      .post(`${process.env.HTTPS_URL}/api/faq/update`, data_edit)
      .then((res) => {
        if (res.data.status == true) {
          toast.success("Lưu Thành Công!");
          postFAQ(id_title_faq);
        } else {
          toast.error("");
        }
      })
      .catch((err) => {
        toast.success(err);
      });
  };

  const handleRemoveFAQ = async (id) => {
    await axios
      .post(`${process.env.HTTPS_URL}/api/faq/destroy`, {
        id: id,
      })
      .then((res) => {
        if (res.data.status == true) {
          toast.success("Xoá Thành Công!");
          postFAQ(id_title_faq);
        } else {
          toast.error("");
        }
      })
      .catch((err) => {
        toast.success(err);
      });
  };

  const handleEditFAQ = (id,question,answer) =>{
    const item_pre = {
      id : id,
      cau_hoi : question,
      cau_tra_loi : answer
    }
    set_data_edit(item_pre)
    set_show_modal_edit(true);
  }

  const handleSetDataEdit = (title,name) => {
    const item_pre = {...data_edit}
    item_pre[title] = name
    set_data_edit(item_pre)
  }

  const handleRemoveTitleFAQ = () => {

  }

  console.log(data_edit);
  return (
    <div className="px-6">
      {show_modal_add ? (
        <Modal
          setShowModal={set_show_modal_add}
          title="Thêm Mới FAQ"
          nameButton="Thêm"
          handleOnClick={handleOnClickAddFAQ}
        >
          <div>
            <div>
              <div className={style.title_input}>Câu Hỏi</div>
              <div className="flex mb-2">
                <TextArea
                  className={style.input_form_input}
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Nhập Câu Hỏi"
                  value={question}
                  onChange={(e) => set_question(e.target.value)}
                  cols={2}
                ></TextArea>
              </div>
            </div>
            <div>
              <div className={style.title_input}>Câu Trả Lời</div>
              <div className="flex">
                <TextArea
                  className={style.input_form_input}
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Nhập Câu Trả Lời"
                  value={answer}
                  onChange={(e) => set_answer(e.target.value)}
                  cols={2}
                ></TextArea>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}

      {show_modal_edit ? (
        <Modal
          setShowModal={set_show_modal_edit}
          title="Cập Nhập FAQ"
          nameButton="Lưu"
          handleOnClick={handleOnClickSaveFAQ}
        >
          <div>
            <div>
              <div className={style.title_input}>Câu Hỏi</div>
              <div className="flex mb-2">
                <TextArea
                  className={style.input_form_input}
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Nhập Câu Hỏi"
                  value={data_edit?.cau_hoi}
                  onChange={(e) => handleSetDataEdit('cau_hoi',e.target.value)}
                  cols={2}
                ></TextArea>
              </div>
            </div>
            <div>
              <div className={style.title_input}>Câu Trả Lời</div>
              <div className="flex">
                <TextArea
                  className={style.input_form_input}
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Nhập Câu Trả Lời"
                  value={data_edit?.cau_tra_loi}
                  onChange={(e) => handleSetDataEdit('cau_tra_loi',e.target.value)}
                  cols={2}
                ></TextArea>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
      <div>
        <div className={style.title_input}>Thêm Chủ Đề FAQ</div>
        <div className="flex mb-6">
          <input
            className={style.input_form_input}
            type="text"
            placeholder="Nhập Chủ Đề Cần Thêm"
            value={input_title_faq}
            onChange={(e) => set_input_title_faq(e.target.value)}
          ></input>
          <button
            className={style.btn_add_faq}
            onClick={handleOnClickAddTitleFAQ}
          >
            Thêm
          </button>
        </div>
      </div>
      <div className="">
        <div className="flex">
          <div>
            <div className="w-[300px] mb-4">
              <div className={style.title_input}>Chọn Chủ Đề</div>
              <div>
                <SelectDropdownAdmin
                  items={title_faq}
                  title_select="Chủ Đề FAQ"
                  handleSelect={handleSelectTitleFAQ}
                ></SelectDropdownAdmin>
              </div>
            </div>
          </div>
          <div className="ml-6">
            <div className={style.title_input}>Thêm FAQ</div>
            <div className="flex mb-6">
              <button
                className={style.btn_add_faq}
                disabled={id_title_faq == null ? true : false}
                style={id_title_faq == null ? { backgroundColor: "#ccc" } : ""}
                onClick={() => set_show_modal_add(true)}
              >
                Thêm
              </button>
            </div>
          </div>
          <div className="ml-6">
            <div className={style.title_input}>Xoá Chủ Đề FAQ</div>
            <div className="flex mb-6">
              <button
                className={style.btn_add_faq}
                disabled={id_title_faq == null ? true : false}
                style={id_title_faq == null ? { backgroundColor: "#ccc" } : { backgroundColor: "#f14e45" }}
                onClick={() => handleRemoveTitleFAQ()}
              >
                Xoá Chủ Đề
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          {data?.map((item, index) => (
            <div
              key={index}
              className="mb-4"
            >
              <b>{item.cau_hoi}</b>
              <span className="float-right">
                <div className="flex">
                  <AiOutlineEdit
                    className="cursor-pointer text-cyan-500"
                    style={{ height: "19px", width: "19px" }}
                    onClick={()=>handleEditFAQ(item.id,item.cau_hoi,item.cau_tra_loi)}
                  ></AiOutlineEdit>
                  <CiCircleRemove
                    className="cursor-pointer ml-3 text-red-500"
                    style={{ height: "19px", width: "19px" }}
                    onClick={() => handleRemoveFAQ(item.id)}
                  ></CiCircleRemove>
                </div>
              </span>
              <div className="">
                <li>{item.cau_tra_loi}</li>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center"></div>
      </div>
    </div>
  );
}
