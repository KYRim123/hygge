"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import style from "./index.module.css";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { api_get_Warehouse } from "@/app/lib/api";
import { BsSearch } from "react-icons/bs";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Image from "next/image";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";

const list_size = [
  { id: 1, name: 10 },
  { id: 2, name: 20 },
  { id: 4, name: 40 },
  { id: 5, name: 70 },
  { id: 6, name: 100 },
  { id: 7, name: 999 },
];

export default function ListWareHouse() {
  const [pre_page, set_pre_page] = useState(20);
  const [search, set_search] = useState("");
  const [pre_search, set_pre_search] = useState("");
  const [data, set_data] = useState();

  const fetchData = async (url) => {
    try {
      const response = await axios.post(url, {
        pre_page: pre_page,
        search: search,
      });
      if (response.data.status == true) {
        set_data(response.data.data);
        set_pre_search(search);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    fetchData(api_get_Warehouse);
  }, []);

  const handleExportPDF = () => {
    generatePDF();
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    autoTable(pdf, {
      html: "#list_kho",
      theme: "grid",
      headStyles: { fillColor: [100, 100, 100] },
    });
    pdf.save(`quan_ly_kho.pdf`);
  };

  const handleChangePage = (url) => {
    if (url != null) {
      fetchData(url);
    }
  };

  const handleSelectPrePage = (id, name) => {
    set_pre_page(name);
  };

  const onClickSearch = () => {
    const url = `${process.env.HTTPS_URL}/api/kho/kho`;
    fetchData(url);
  };

  return (
    <div className="px-6">
      <div>
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
        <div>
          <table
            className={style.table_list_warehouse}
            id="list_kho"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Sản Phẩm</th>
                <th>Hình Ảnh</th>
                <th>số Lượng Nhập</th>
                <th>Số Lượng Đã Bán</th>
                <th>Số Lượng Tồn Kho</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.san_pham?.ten_san_pham}</td>
                  <td className={style.body_img}>
                    <Image
                      className={style.img_product}
                      src={`${process.env.HTTPS_URL}/upload/${item?.san_pham?.hinh_anh[0]?.hinh_anh_san_pham}`}
                      alt="â"
                      width={300}
                      height={300}
                    />
                  </td>
                  <td className={style.price}>{item?.so_luong_nhap}</td>
                  <td className={style.price}>{item?.so_luong_da_ban}</td>
                  <td className={style.price}>{item?.so_luong_nhap * 1 - item?.so_luong_da_ban * 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    </div>
  );
}
