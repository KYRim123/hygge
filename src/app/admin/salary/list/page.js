"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import style from "./index.module.css";
import SelectDropdownAdmin from "@/app/components/SelectDropdownAdmin";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space } from "antd";
import { api_get_Luong, api_get_Nv } from "@/app/lib/api";
import { useSession } from "next-auth/react";

dayjs.extend(customParseFormat);

const monthFormat = "YYYY/MM";

export default function ListSalary() {
  const [list_staff, set_list_staff] = useState([]);
  const [choose_id_staff, set_choose_id_staff] = useState();
  const [month, set_month] = useState("");
  const { data: session } = useSession();
  const [data, set_data] = useState();
  const [role, set_role] = useState([]);

  useEffect(() => {
    if (session?.admin?.chucvu) {
      const array_role = JSON.parse(session?.admin?.chucvu);
      set_role(array_role);
    }
  }, [session?.admin?.chucvu]);

  const fetchDataStaff = async () => {
    await axios
      .get(api_get_Nv)
      .then((res) => {
        const formattedData = res.data.data.map((item) => ({
          id: item.id,
          name: item.ten_nhan_vien,
        }));
        set_list_staff(formattedData);
      })
      .catch((res) => {});
  };

  const fetchDataLuong = useCallback(async () => {
    await axios
      .post(api_get_Luong, { id: choose_id_staff, month: month })
      .then((res) => {
        if (res.data.status == true) {
          if (role.includes(25)) {
            set_data(res?.data?.data);
          } else {
            const filter = res?.data?.data.filter((item) => item.id_nhan_vien == session?.admin?.id);
            set_data(filter);
          }
        } else {
        }
      })
      .catch((res) => {});
  }, [choose_id_staff, month, role, session?.admin?.id]);

  useEffect(() => {
    fetchDataStaff();
    fetchDataLuong();
  }, [fetchDataLuong]);

  useEffect(() => {
    if (choose_id_staff != null) {
      fetchDataLuong();
    }
  }, [choose_id_staff, fetchDataLuong]);

  const handleSelectStaff = (id, name) => {
    set_choose_id_staff(id);
  };

  const handleExportPDF = () => {
    generatePDF();
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    autoTable(pdf, {
      html: "#list_luong",
      theme: "grid",
      headStyles: { fillColor: [100, 100, 100] },
    });
    pdf.save(`quan_ly_luong.pdf`);
  };
  //
  const handleDateChange = (date, dateString) => {
    set_month(dateString);
  };

  return (
    <div className="px-6">
      <div className="flex justify-start">
        <div className="w-[300px]">
          <label>Chọn Tháng : </label>
          <DatePicker
            className={style.custom_daytime}
            format={monthFormat}
            picker="month"
            onChange={handleDateChange}
          />
        </div>
        {role.includes(25) && (
          <div className="w-[250px] ml-14">
            <label>Chọn Nhân Viên</label>
            <SelectDropdownAdmin
              title_select="Chọn Nhân Viên"
              items={list_staff}
              handleSelect={handleSelectStaff}
            ></SelectDropdownAdmin>
          </div>
        )}
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
                className={style.table_list_luong}
                id="list_luong"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    {choose_id_staff != null ? "" : <th>Mã NV</th>}
                    <th>Nhân Viên</th>
                    <th>Lương Cơ Bản</th>
                    <th>Công</th>
                    <th>Hệ Số Lương</th>
                    <th>Thưởng</th>
                    <th>Lương Được Nhận</th>
                    {month != "" ? "" : <th>Tháng</th>}
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {choose_id_staff != null ? "" : <td>{item.id_nhan_vien}</td>}
                      <td>{item.nhan_vien?.ten_nhan_vien}</td>
                      <td className={style.price}>${item.nhan_vien?.luong_co_ban}</td>
                      <td className={style.price}>{JSON.parse(item?.cham_cong).length}</td>
                      <td className={style.price}>{item.he_so}</td>
                      <td className={style.price}>${item.thuong}</td>
                      <td className={style.price}>
                        $
                        {(
                          item.nhan_vien?.luong_co_ban *
                            1 *
                            (item.he_so * 1) *
                            ((JSON.parse(item?.cham_cong).length * 1) / 28) +
                          item.thuong * 1
                        ).toFixed(2)}
                      </td>
                      {month != "" ? "" : <td>{item.thang_nam}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
