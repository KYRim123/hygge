"use client";
import Image from "next/image";
import style from "./index.module.css";
import { chuky, iconLogo } from "../../../../public/assets";

export default function Invoice({ data }) {
  const date = new Date(data?.ngay_mua);
  return (
    <div className="relative">
      <div className="grid grid-cols-2">
        <div className={style.logo}>
          <Image
            src={iconLogo}
            width={340}
            height={150}
            alt="logo"
            style={{ objectFit: "contain", width: "none", height: "none" }}
            priority={false}
          />
        </div>
        <div>
          <div className={style.title_invoice}>invoice</div>
          <div className={style.hot_line}>
            <b>HOTLINE : </b>0912345678
          </div>
          <div className={style.address}>
            <b>ADDRESS : </b>01 - ABC street - Da Nang city
          </div>
          <div className={style.invoice_num}>
            {" "}
            <b>INVOICE NUMBER : </b> : {data?.id}{" "}
          </div>
        </div>
      </div>
      <div>
        <div className={style.info_customer}>
          <b>Name : {data?.thong_tin_nguoi_nhan?.ten_nguoi_nhan}</b>
        </div>
        <div className={style.info_customer}>
          <b>Phone : {data?.thong_tin_nguoi_nhan?.so_dien_thoai}</b>
        </div>
        <div className={style.info_customer}>
          <b>Address : {data?.thong_tin_nguoi_nhan?.dia_chi}</b>
        </div>
      </div>
      <div className={style.table_invoice}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Number</th>
              <th>Unit Price</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data?.chi_tiet_hoa_don?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.san_pham?.ten_san_pham}</td>
                <td>{item?.so_luong}</td>
                <td>{item?.gia_tien}</td>
                <td>{item?.so_luong * item?.gia_tien}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="grid grid-cols-2">
          <div className="text-center">
            <div>
              Date {date.getDate()} Month {date.getMonth() + 1} Year {date.getFullYear()}
            </div>
            <div>
              <b>Invoice Writer</b>
            </div>
            <div className="my-2 text-[#00cc98]">Hygge Shop</div>
          </div>
          <div>
            <div>TAX : {data?.tax} </div>
            <div>SHIP : {data?.ship}</div>
            <div>TOTAL : {data?.gia_tien_thanh_toan}</div>
          </div>
        </div>
        <div></div>
      </div>
      <div className={style.chu_ky}>
        {data?.trang_thai_thanh_toan == "Đã Thanh Toán" && (
          <Image
            src={chuky}
            alt="chuky"
          ></Image>
        )}
      </div>
    </div>
  );
}
