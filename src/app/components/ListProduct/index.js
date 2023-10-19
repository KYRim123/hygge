import React from "react";
import ProductItem from "../ProductItem/index";

export default function ListProduct({ prop_items }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {prop_items.map((item, index) => (
        <ProductItem
          id={item.id}
          key={index}
          name={item.ten_san_pham}
          img={item.hinh_anh[0].hinh_anh_san_pham}
          sale={item.khuyen_mai}
          price={item.gia}
          loai_sp={item.loai_san_pham}
        ></ProductItem>
      ))}
    </div>
  );
}
