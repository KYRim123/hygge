"use client";
import style from "./index.module.css";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { AiOutlineFileSearch } from "react-icons/ai";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";
import { BsSearch } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Link from "next/link";

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
    html: "#list_user",
    theme: "grid",
    headStyles: { fillColor: [100, 100, 100] },
    columns: [
      { header: "#", dataKey: "#" },
      { header: "ID", dataKey: "id" },
      { header: "Name User", dataKey: "name" },
      { header: "Account", dataKey: "tai_khoan" },
      { header: "Phone", dataKey: "so_dien_thoai" },
      { header: "Email", dataKey: "email" },
      { header: "Completed", dataKey: "completed" },
    ],
  });

  pdf.save("danh_sach_nguoi_dung.pdf");
};

export default function ListUser() {
  const [data, set_data] = useState();
  const [pre_page, set_pre_page] = useState(20);
  const [search, set_search] = useState("");
  const [pre_search, set_pre_search] = useState("");
  const fetchData = async (url) => {
    try {
      const response = await axios.post(url, { pre_page: pre_page, search: search });
      if (response.data.status == true) {
        set_data(response.data.data);
        set_search("");
        set_pre_search(search);
      }
    } catch (error) {
      toast.error("An error occurred while fetching data.");
    }
  };
  useEffect(() => {
    const url = `${process.env.HTTPS_URL}/api/user/list-all`;
    fetchData(url);
  }, [pre_page, search]);

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
    const url = `${process.env.HTTPS_URL}/api/user/list-all`;
    fetchData(url);
  };

  return (
    <div className="px-6">
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
        className={style.table_list_user}
        id="list_user"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name User</th>
            <th>Account</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Completed</th>
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
              <td>{item.ten_nguoi_dung}</td>
              <td>{item.tai_khoan}</td>
              <td>{item.so_dien_thoai}</td>
              <td>{item.email}</td>
              <td className={style.price}>$500</td>
              <td className="remove-column">
                <div className={style.actions}>
                  <Link href={`${"/admin/user/detail/" + item.id}`}>
                    <AiOutlineFileSearch className={style.action}></AiOutlineFileSearch>
                  </Link>
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
