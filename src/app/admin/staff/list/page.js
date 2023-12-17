"use client";
import style from "./index.module.css";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineFileSearch } from "react-icons/ai";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";
import { BsSearch } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Link from "next/link";
import Image from "next/image";
import ShowImage from "@/app/components/ShowImage";
import { api_get_NvList, api_post_NvRemove } from "@/app/lib/api";
import { MdDeleteForever } from "react-icons/md";

const list_size = [
  { id: 1, name: 10 },
  { id: 2, name: 20 },
  { id: 4, name: 40 },
  { id: 5, name: 70 },
  { id: 6, name: 100 },
  { id: 7, name: 999 },
];

const generatePDF = () => {
  const pdf = new jsPDF();
  autoTable(pdf, {
    html: "#list_staff",
    theme: "grid",
    headStyles: { fillColor: [100, 100, 100] },
    columns: [
      { header: "#", dataKey: "#" },
      { header: "ID", dataKey: "id" },
      { header: "Avatar", dataKey: "avatar" },
      { header: "Name", dataKey: "name" },
      { header: "Phone", dataKey: "phone" },
      { header: "Position", dataKey: "position" },
      { header: "Salary", dataKey: "salary" },
      { header: "CCCD", dataKey: "cccd" },
    ],
  });

  pdf.save("danh_sach_nhan_vien.pdf");
};

export default function ListStaff() {
  const [data, set_data] = useState();
  const [pre_page, set_pre_page] = useState(20);
  const [search, set_search] = useState("");
  const [pre_search, set_pre_search] = useState("");
  const [is_show, set_is_show] = useState(false);
  const [img_show, set_img_show] = useState("");
  const [pre_url, set_pre_url] = useState("");

  const fetchData = async (url) => {
    try {
      set_pre_url(url);
      const response = await axios.post(url, { pre_page: pre_page, search: search });
      if (response.data.status == true) {
        set_data(response.data.data);
        set_pre_search(search);
      }
    } catch (error) {
      toast.error("An error occurred while fetching data.");
    }
  };
  useEffect(() => {
    fetchData(api_get_NvList);
  }, [pre_page]);

  const handleChangePage = (url) => {
    if (url != null) {
      fetchData(url);
    }
  };

  const handleSelectPrePage = (id, name) => {
    set_pre_page(name);
  };

  const handleExportPDF = () => {
    generatePDF();
  };

  const onClickSearch = () => {
    const url = `${process.env.HTTPS_URL}/api/nhan-vien/list`;
    fetchData(url);
  };

  const handleShowImage = (img) => {
    set_is_show(true);
    set_img_show(img);
  };

  const handleDeleteStaff = async (id) => {
    try {
      const response = await axios.post(api_post_NvRemove, { id: id });
      if (response.data.status === true) {
        fetchData(pre_url);
      } else {
      }
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
    }
  };

  return (
    <div className="px-6">
      {is_show && (
        <ShowImage
          setShowImage={set_is_show}
          urlImage={img_show}
        ></ShowImage>
      )}
      <div className={style.header}>
        <div className={style.dropdown_size_page}>
          <SelectDropdownAdmin
            items={list_size}
            selectedItemProp={pre_page}
            handleSelect={handleSelectPrePage}
          ></SelectDropdownAdmin>
        </div>
        <div className={style.search}>
          <input
            className={style.input_search}
            type="text"
            value={search}
            onChange={(e) => set_search(e.target.value)}
          />
          <div
            className={style.form_icon_search}
            onClick={onClickSearch}
          >
            {" "}
            <BsSearch className={style.icon_search}></BsSearch>
          </div>
        </div>
        <div className={style.add_new}>
          <Link href="/admin/staff/create">
            <div className={style.btn_add_new}>ADD</div>
          </Link>
        </div>
        <div className={style.pdf}>
          <div
            className={style.btn_pdf}
            onClick={handleExportPDF}
          >
            PDF
          </div>
        </div>
      </div>
      <div>- Total : {data?.total} Item</div> {pre_search != "" ? <div>- Search : {pre_search}</div> : ""}
      <table
        className={style.table_list_staff}
        id="list_staff"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Salary</th>
            <th>CCCD</th>
            <th
              dataKey="action"
              className="remove-column"
            >
              View
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1 + pre_page * (data.current_page - 1)}</td>
              <td>{item.id}</td>
              <td className={style.body_img}>
                <Image
                  className={style.img_staff}
                  onClick={() => handleShowImage(`${process.env.HTTPS_URL}/upload/${item.anh_nhan_vien}`)}
                  src={`${process.env.HTTPS_URL}/upload/${item.anh_nhan_vien}`}
                  alt="â"
                  width={300}
                  height={300}
                />
              </td>
              <td>{item.ten_nhan_vien}</td>
              <td>{item.so_dien_thoai}</td>
              <td>{item.chuc_vu.ten_chuc_vu}</td>
              <td className={style.price}>${item.luong_co_ban}</td>
              <td className={style.body_img}>
                {item.anh_cccd.map((img, index_img) => (
                  <Image
                    className={style.img_staff}
                    key={index_img}
                    src={`${process.env.HTTPS_URL}/upload/${img}`}
                    onClick={() => handleShowImage(`${process.env.HTTPS_URL}/upload/${img}`)}
                    alt="â"
                    width={300}
                    height={300}
                  />
                ))}
              </td>
              <td className="remove-column">
                <div className={style.actions}>
                  <Link href={`${"/admin/staff/edit/" + item.id}`}>
                    <AiOutlineEdit className={style.action}></AiOutlineEdit>{" "}
                  </Link>
                  <MdDeleteForever
                    className={style.action}
                    onClick={() => handleDeleteStaff(item.id)}
                  ></MdDeleteForever>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={style.footer_table}>
        <div
          className={style.btn_page}
          onClick={() => handleChangePage(data.first_page_url)}
        >
          <BiFirstPage className={style.icon_page}></BiFirstPage>
        </div>
        {data?.links?.map((link, index) => (
          <div
            key={index}
            className={`${style.btn_page} ${link.label == data.current_page ? style.selected : ""}`}
            onClick={() => handleChangePage(link.url)}
          >
            {index == 0 ? (
              <GrFormPrevious className={style.icon_page} />
            ) : index == data?.links.length - 1 ? (
              <GrFormNext className={style.icon_page} />
            ) : (
              link.label
            )}
          </div>
        ))}
        <div
          className={style.btn_page}
          onClick={() => handleChangePage(data.last_page_url)}
        >
          <BiLastPage className={style.icon_page}></BiLastPage>
        </div>
      </div>
    </div>
  );
}
