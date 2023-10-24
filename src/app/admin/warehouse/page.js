"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import style from "./index.module.css";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ListUser() {
  const [list_dsp, set_list_dsp] = useState([]);
  const [list_lsp, set_list_lsp] = useState([]);
  const [list_sp, set_list_sp] = useState([]);
  const [choose_id_dsp, set_choose_id_dsp] = useState();
  const [choose_id_lsp, set_choose_id_lsp] = useState();
  const [choose_id_sp, set_choose_id_sp] = useState();
  const [title_pdf, set_title_pdf] = useState();

  const [data, set_data] = useState();

  const fetchDataDSP = async () => {
    await axios
      .get(`${process.env.HTTP_URL}/api/product-types/list`)
      .then((res) => {
        const formattedData = res.data.data.map((item) => ({
          id: item.id,
          name: item.ten_dong_san_pham,
        }));
        set_list_dsp(formattedData);
      })
      .catch((res) => {});
  };

  const fetchDataLSP = useCallback(async () => {
    await axios
      .post(`${process.env.HTTP_URL}/api/category-types/list-id`, { id: choose_id_dsp })
      .then((res) => {
        if (res.data.status == true) {
          const formattedData = res.data.data.map((item) => ({
            id: item.id,
            name: item.ten_loai_san_pham,
          }));
          set_list_lsp(formattedData);
        } else {
        }
      })
      .catch((res) => {});
  }, [choose_id_dsp]);

  const fetchDataSP = useCallback(async () => {
    await axios
      .post(`${process.env.HTTP_URL}/api/product/list-id`, { id: choose_id_lsp })
      .then((res) => {
        if (res.data.status == true) {
          const formattedData = res.data.data.map((item) => ({
            id: item.id,
            name: item.ten_san_pham,
          }));
          set_list_sp(formattedData);
        } else {
        }
      })
      .catch((res) => {});
  }, [choose_id_lsp]);

  const fetchDataKho = useCallback(async () => {
    await axios
      .post(`${process.env.HTTP_URL}/api/kho/product`, { id: choose_id_sp })
      .then((res) => {
        if (res.data.status == true) {
          set_data(res.data.data);
        } else {
        }
      })
      .catch((res) => {});
  }, [choose_id_sp]);

  useEffect(() => {
    fetchDataDSP();
  }, []);

  useEffect(() => {
    if (choose_id_dsp != null) {
      fetchDataLSP();
    }
  }, [choose_id_dsp, fetchDataLSP]);

  useEffect(() => {
    if (choose_id_lsp != null) {
      fetchDataSP();
    }
  }, [choose_id_lsp, fetchDataSP]);

  useEffect(() => {
    if (choose_id_sp != null) {
      fetchDataKho();
    }
  }, [choose_id_sp, fetchDataKho]);

  const handleSelectDSP = (id, name) => {
    set_choose_id_dsp(id);
  };

  const handleSelectLSP = (id, name) => {
    set_choose_id_lsp(id);
  };

  const handleSelectSP = (id, name) => {
    set_title_pdf(name);
    set_choose_id_sp(id);
  };

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
    const cd_title = title_pdf.toLowerCase().replace(/ /g, "_");
    pdf.save(`danh_sach_${cd_title}.pdf`);
  };

  return (
    <div className="px-6">
      <div className="flex justify-between">
        <div className="w-[250px]">
          <label>Dòng Sản Phẩm</label>
          <SelectDropdownAdmin
            title_select="Chọn Dòng Sản Phẩm"
            items={list_dsp}
            handleSelect={handleSelectDSP}
          ></SelectDropdownAdmin>
        </div>
        <div className="w-[250px]">
          <label>Loại Sản Phẩm</label>
          <SelectDropdownAdmin
            title_select="Chọn Loại Sản Phẩm"
            items={list_lsp}
            handleSelect={handleSelectLSP}
          ></SelectDropdownAdmin>
        </div>

        <div className="w-[250px]">
          <label>Sản Phẩm</label>
          <SelectDropdownAdmin
            title_select="Chọn Sản Phẩm"
            items={list_sp}
            handleSelect={handleSelectSP}
          ></SelectDropdownAdmin>
        </div>
      </div>
      <div>
        <div>
          {data != null && (
            <Fragment>
              <div className={style.pdf}>
                <div
                  className={style.btn_pdf}
                  onClick={handleExportPDF}
                >
                  PDF
                </div>
              </div>
              <table
                className={style.table_list_kho}
                id="list_kho"
              >
                <thead>
                  <tr>
                    <th>ID Nhân viên</th>
                    <th>Số lượng nhập</th>
                    <th>Giá nhập (1đv)</th>
                    <th>Ngày nhập</th>
                  </tr>
                </thead>
                {data != null
                  ? Object.keys(data)
                      .sort((a, b) => b - a)
                      .map((nam) => (
                        <Fragment key={nam}>
                          <tr>
                            <td
                              className={style.title_nam}
                              colSpan={6}
                            >
                              {" "}
                              Năm: {nam}
                            </td>
                          </tr>
                          {Object.keys(data[nam])
                            .sort((a, b) => b - a)
                            .map((thang) => (
                              <Fragment key={thang}>
                                <tr>
                                  <td
                                    className={`${style.title_thang} "pl-10"`}
                                    style={{ paddingLeft: "40px" }}
                                    colSpan={6}
                                  >
                                    Tháng: {thang}
                                  </td>
                                </tr>
                                {data[nam][thang]
                                  .sort((a, b) => new Date(b.item.ngay_nhap) - new Date(a.item.ngay_nhap))
                                  .map((item) => (
                                    <tr key={item.item.id}>
                                      <td>{item.item.nhan_vien.ten_nhan_vien}</td>
                                      <td className={style.price}>{item.item.so_luong_nhap}</td>
                                      <td className={style.price}>${item.item.gia_nhap}</td>
                                      <td className={style.price}>{item.item.ngay_nhap}</td>
                                    </tr>
                                  ))}
                              </Fragment>
                            ))}
                        </Fragment>
                      ))
                  : ""}
              </table>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
