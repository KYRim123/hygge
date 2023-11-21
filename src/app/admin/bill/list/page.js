"use client";
import style from "./index.module.css";
import React, { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";
import ModalUpdateStatusInvoice from "@/app/components/ModalUpdateStatusInvoice";
import ModalUpdatePayInvoice from "@/app/components/ModalUpdatePayInvoice";
import { api_get_ListAllHoaDon, api_get_TrangThaiAdmin, api_post_HoaDonUpdatePay, api_post_HoaDonUpdateStatus } from "@/app/lib/api";

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
    html: "#list_bill",
    theme: "grid",
    headStyles: { fillColor: [100, 100, 100] },
    columns: [
      { header: "#", dataKey: "#" },
      { header: "ID", dataKey: "id" },
      { header: "Account", dataKey: "account" },
      { header: "Total Price", dataKey: "total_price" },
      { header: "Purchase Date", dataKey: "purchase_date" },
      { header: "Payment Status", dataKey: "payment_status" },
      { header: "Order Status", dataKey: "order_status" },
    ],
  });

  pdf.save("danh_sach_hoa_don.pdf");
};

export default function ListBill() {
  const { data: session } = useSession();
  const [data, set_data] = useState();
  const [pre_page, set_pre_page] = useState(20);
  const [search, set_search] = useState("");
  const [pre_search, set_pre_search] = useState("");
  const [list_status, set_list_status] = useState([]);
  const [show_modal_update_status_invoice, set_show_modal_update_status_invoice] = useState(false);
  const [show_modal_update_pay_invoice, set_show_modal_update_pay_invoice] = useState(false);
  const [id_invoice, set_id_invoice] = useState(0);
  const [name_status, set_name_status] = useState("Trạng Thái Order");
  const [name_pay, set_name_pay] = useState("Trạng Thái Thanh Toán");
  const fetchDataStatus = async () => {
    try {
      const mang = JSON.parse(session?.admin?.chucvu);
      const response = await axios.post(api_get_TrangThaiAdmin, {
        role: mang,
      });
      if (response?.data?.status == true) {
        const formattedData = response?.data?.data?.map((item) => ({
          id: item.id,
          name: item.trang_thai,
        }));
        set_list_status(formattedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data.");
    }
  };
  useEffect(() => {
    fetchDataStatus();
  }, [session?.admin?.chucvu]);
  const fetchData = async (url) => {
    try {
      const mang = JSON.parse(session?.admin?.chucvu);
      const response = await axios.post(url, {
        pre_page: pre_page,
        search: search,
        role: mang,
      });
      if (response.data.status == true) {
        set_data(response.data.data);
        set_search("");
        set_pre_search(search);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data.");
    }
  };
  useEffect(() => {
    fetchData(api_get_ListAllHoaDon);
  }, [pre_page, session?.admin?.chucvu]);

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
    const url = `${process.env.HTTPS_URL}/api/hoa-don/list-all`;
    fetchData(url);
  };

  const handleUpdateStatusInvoice = (id, name, note) => {
    const updateStatus = async () => {
      try {
        const response = await axios.post(api_post_HoaDonUpdateStatus, {
          id: id_invoice,
          id_trang_thai: id,
          id_nhan_vien: session?.admin?.id,
          ghi_chu: note,
        });
        if (response.data.status == true) {
          toast.success("Update Status Success");
          fetchData(api_get_ListAllHoaDon);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data.");
      }
    };
    updateStatus();
  };

  const handleUpdatePayInvoice = (id, name) => {
    const updateStatus = async () => {
      try {
        const mang = JSON.parse(session?.admin?.chucvu);
        const response = await axios.post(api_post_HoaDonUpdatePay, {
          id: id_invoice,
          id_trang_thai_thanh_toan: id,
          role: mang,
        });
        if (response.data.status == true) {
          toast.success("Update Status Success");
          const url = `${process.env.HTTPS_URL}/api/hoa-don/list-all`;
          fetchData(url);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("An error occurred while fetching data.");
      }
    };
    updateStatus();
  };

  return (
    <div className="px-6">
      {show_modal_update_status_invoice ? (
        <ModalUpdateStatusInvoice
          setShowModal={set_show_modal_update_status_invoice}
          handleUpdateStatusInvoice={handleUpdateStatusInvoice}
          listStatus={list_status}
          idInvoice={id_invoice}
          titleSelect={name_status}
        ></ModalUpdateStatusInvoice>
      ) : (
        ""
      )}
      {show_modal_update_pay_invoice ? (
        <ModalUpdatePayInvoice
          setShowModal={set_show_modal_update_pay_invoice}
          handleUpdatePayInvoice={handleUpdatePayInvoice}
          idInvoice={id_invoice}
          listStatus={list_status}
          titleSelect={name_pay}
        ></ModalUpdatePayInvoice>
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
        className={style.table_list_bill}
        id="list_bill"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Account</th>
            <th>Total Price</th>
            <th>Purchase Date</th>
            <th>Payment Status</th>
            <th>Order Status</th>
            <th className="remove-column">View</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1 + pre_page * (data.current_page - 1)}</td>
              <td>{item.id}</td>
              <td>{item.nguoi_dung.tai_khoan}</td>
              <td className={style.price}>{item.gia_tien_thanh_toan}</td>
              <td>{item.ngay_mua}</td>
              <td>
                <div
                  className={style.status_order}
                  onClick={() => {
                    set_show_modal_update_pay_invoice(true);
                    set_id_invoice(item.id);
                    set_name_pay(item?.trang_thai_thanh_toan);
                  }}
                >
                  {item?.trang_thai_thanh_toan}
                </div>
              </td>
              <td>
                <div
                  className={style.status_order}
                  onClick={() => {
                    set_show_modal_update_status_invoice(true);
                    set_id_invoice(item.id);
                    set_name_status(item.trang_thai.trang_thai);
                  }}
                >
                  {item.trang_thai.trang_thai}
                </div>
              </td>
              <td className="remove-column">
                <div className={style.actions}>
                  <Link href={"/admin/bill/status/" + item.id}>
                    <AiOutlineFileSearch className={style.action}></AiOutlineFileSearch>{" "}
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
