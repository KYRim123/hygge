"use client";
import style from "./index.module.css";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineFileSearch } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";
import { BsSearch } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Link from "next/link";
import ModalViewDescription from "@/app/components/ModalViewDescription";
import Image from "next/image";

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
    html: "#list_product",
    theme: "grid",
    headStyles: { fillColor: [100, 100, 100] },
    columns: [
      { header: "ID", dataKey: "id" },
      { header: "Name", dataKey: "name" },
      { header: "Original Price", dataKey: "original_price" },
      { header: "Sale", dataKey: "sale" },
      { header: "Discounted Price", dataKey: "discounted_price" },
      { header: "Category", dataKey: "category" },
      { header: "Image", dataKey: "image" },
    ],
  });

  pdf.save("danh_sach_san_pham.pdf");
};

export default function ListProduct() {
  const [data, set_data] = useState();
  const [pre_page, set_pre_page] = useState(20);
  const [search, set_search] = useState("");
  const [pre_search, set_pre_search] = useState("");
  const [short_description, set_short_description] = useState("");
  const [description, set_description] = useState("");
  const [show_modal_description, set_show_modal_description] = useState(false);
  const [url_pre, set_url_pre] = useState("");
  const fetchData = useCallback(async (url) => {
    try {
      set_url_pre(url);
      const response = await axios.post(url, { pre_page: pre_page, search: search });
      if (response.data.status == true) {
        set_data(response.data.data);
        set_search("");
        set_pre_search(search);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data.");
    }
  });
  
  useEffect(() => {
    const url = "http://xuantuyen1207.website/api/product/list-all";
    fetchData(url);
  }, [pre_page, fetchData]);

  const discountedPrice = (price, sale) => {
    return price - (price * sale) / 100;
  };

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
    const url = "http://xuantuyen1207.website/api/product/list-all";
    fetchData(url);
  };

  const handleShowModalDescription = (sh_des, des) => {
    set_short_description(sh_des);
    set_description(des);
    set_show_modal_description(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.post("http://xuantuyen1207.website/api/product/destroy", { id: id });
      if (response.data.status === true) {
        fetchData(url_pre);
        console.log(response.data.status);
      } else {
        console.log("Xóa sản phẩm không thành công");
      }
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
    }
  };

  console.log(data);
  return (
    <div className="px-6">
      {show_modal_description ? (
        <ModalViewDescription
          setShowModal={set_show_modal_description}
          description={description}
          short_description={short_description}
        ></ModalViewDescription>
      ) : (
        ""
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
          <Link href="/admin/products/create">
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
        className={style.table_list_product}
        id="list_product"
      >
        <thead>
          <tr>
            <th dataKey="id">#</th>
            <th dataKey="name">Name</th>
            <th dataKey="original-price">Original Price</th>
            <th dataKey="sale">Sale</th>
            <th dataKey="discounted-price">Discounted Price</th>
            <th dataKey="category">Category</th>
            <th
              dataKey="image"
              className="remove-column"
            >
              Image
            </th>
            <th
              dataKey="action"
              className="remove-column"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1 + pre_page * (data.current_page - 1)}</td>
              <td>{item.ten_san_pham}</td>
              <td className={style.price}>${item.gia}</td>
              <td className={style.sale}>{item.khuyen_mai}%</td>
              <td className={style.price}>${discountedPrice(item.gia, item.khuyen_mai)}</td>
              <td>{item.loai_san_pham.ten_loai_san_pham}</td>
              <td className={style.body_img}>
                {item.hinh_anh.map((img) => (
                  <Image
                    className={style.img_product}
                    key={img.id}
                    src={`${"http://xuantuyen1207.website/upload/" + img.hinh_anh_san_pham}`}
                    alt="â"
                    width={300}
                    height={300}
                  />
                ))}
              </td>
              <td className="remove-column">
                <div className={style.actions}>
                  <AiOutlineFileSearch
                    className={style.action}
                    onClick={() => handleShowModalDescription(item.mo_ta_ngan, item.mo_ta)}
                  ></AiOutlineFileSearch>{" "}
                  <Link href={`${"/admin/products/edit/" + item.id}`}>
                    <AiOutlineEdit className={style.action}></AiOutlineEdit>{" "}
                  </Link>
                  <MdDeleteForever
                    className={style.action}
                    onClick={() => handleDeleteProduct(item.id)}
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
