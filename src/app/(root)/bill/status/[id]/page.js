"use client";
import style from "./index.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { api_get_TrangThaiDonHang } from "@/app/lib/api";

export default function StatusBill() {
  const [data, set_data] = useState();
  const PARAMS = useParams().id;
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(api_get_TrangThaiDonHang + PARAMS)
        .then((res) => {
          if (res.data.status == true) {
            set_data(res.data.data);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    };
    if (PARAMS != null) {
      fetchData();
    }
  }, [PARAMS]);
  return (
    <div className="p-4">
      <div>
        <div className={style.header_body}>
          <div className="flex">
            <p className={`${"mr-1"} ${style.text_title}`}>Mã Hoá Đơn : </p>
            {data?.id}
          </div>
          <div className="flex">
            <p className={`${"mr-1"} ${style.text_title}`}>Khách Hàng : </p>
            {data?.nguoi_dung.ten_nguoi_dung}
          </div>
          <div className={`${style.class} ${"grid grid-cols-3"}`}>
            <div className="flex">
              <p className={`${"mr-1"} ${style.text_title}`}>Tài Khoản : </p>
              {data?.nguoi_dung.tai_khoan}
            </div>
            <div className="flex">
              <p className={`${"mr-1"} ${style.text_title}`}>SĐT : </p>
              {data?.nguoi_dung.so_dien_thoai}
            </div>
            <div className="flex">
              <p className={`${"mr-1"} ${style.text_title}`}>Email : </p>
              {data?.nguoi_dung.email}
            </div>
          </div>
          <div className={`${style.class} ${"grid grid-cols-3"}`}>
            <div className="flex">
              <p className={`${"mr-1"} ${style.text_title}`}>Tổng Tiền : </p>${data?.gia_tien_thanh_toan}
            </div>
            <div className="flex">
              <p className={`${"mr-1"} ${style.text_title}`}>Thanh Toán : </p>
              {data?.trang_thai_thanh_toan}
            </div>
            {data?.ngay_thanh_toan != null ? (
              <div className="flex">
                <p className={`${"mr-1"} ${style.text_title}`}>Ngày Thanh Toán : </p>
                {data?.ngay_thanh_toan}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className={`${style.title_status_main} ${"text-center"}`}>Trạng Thái Đơn Hàng</div>
          <div>
            {data?.trang_thai_hoa_don.map((item, index) => (
              <div
                className={style.line_status}
                key={index}
              >
                <div className={style.number_status}>{index + 1}</div>
                <div className={style.title_status}>{item.trang_thai.trang_thai}</div>
                <div className={style.status_command}>
                  <div className="flex">
                    <div className="flex">
                      <p className={`${"mr-1"} ${style.text_title}`}>Ngày Cập Nhập : </p>
                      {item?.ngay_cap_nhap}
                    </div>
                  </div>
                  <div>
                    <p className={style.text_title}>Chú Thích :</p>
                    <div className={style.note_status}> {item?.ghi_chu}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
