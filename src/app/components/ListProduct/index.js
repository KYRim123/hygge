import React from "react";
import style from "./index.module.css";
import ProductItem from "../ProductItem/index";

export default function ListProduct({ prop_items }) {
  return (
    <div className={style.list_product}>
      {prop_items.map((item, index) => (
        <ProductItem
          id={item.id}
          key={index}
          name={item.ten_san_pham}
          img={item.hinh_anh[0].hinh_anh_san_pham}
          sale={item.khuyen_mai}
          type={item.id_loai_san_pham}
          price={item.gia}
        ></ProductItem>
      ))}
    </div>
  );
}
