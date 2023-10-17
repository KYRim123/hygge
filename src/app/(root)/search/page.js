"use client";
import ListProduct from "../../components/ListProduct/index";
import { useState } from "react";
import SelectDropdown from "../../components/SelectDropdown/index";
import style from "./index.module.css";
import axios from "axios";
import useSWR from "swr";
import LoadingA from "@/app/components/LoadingA";

export default function PageSearch() {
  const handleSelectColor = (id, name) => {
    console.log(id, name);
  };
  const text_search = "Eye Care Products for Tired Eyes";

  const list_color = [
    {
      id: 1,
      name: "Red",
    },
    {
      id: 2,
      name: "Blue",
    },
    {
      id: 3,
      name: "Green",
    },
    {
      id: 4,
      name: "Black",
    },
  ];
  const list_category = [
    {
      id: 1,
      name: "SUN CARE",
    },
    {
      id: 2,
      name: "EYE CARE",
    },
    {
      id: 3,
      name: "TREATMENTS",
    },
    {
      id: 4,
      name: "MOISTURIZERS",
    },
    {
      id: 5,
      name: "FEATURED",
    },
  ];
  const list_price_range = [
    {
      id: 1,
      name: "$0 - $10",
    },
    {
      id: 2,
      name: "$10 - $20",
    },
    {
      id: 3,
      name: "$20 - $40",
    },
    {
      id: 4,
      name: "$40 - $100",
    },
    {
      id: 5,
      name: "$100 +",
    },
  ];
  const list_sort_by = [
    {
      id: 1,
      name: "Name",
    },
    {
      id: 2,
      name: "Price",
    },
    {
      id: 3,
      name: "Sale",
    },
  ];

  // fetch listProduct
  const fetchProducts = async (api) => {
    const res = await axios.get(api);
    const result = await res.data;
    return result.data;
  };
  const { data: fetchData, isLoading } = useSWR(
    `${process.env.HTTP_URL}/api/product/list?page=1`,
    fetchProducts,
  );

  if (isLoading) {
    return <LoadingA />;
  }

    const count_items_search = fetchData.total;

  return (
    <div>
      <span className="label-1">- Search Results -</span>
      <h1 className="title-1">{text_search}</h1>
      <div>
        <b>{count_items_search}</b> products found
      </div>
      <div className={style.list_select_dropdown}>
        <SelectDropdown
          items={list_color}
          title_select="Color"
          handleSelect={handleSelectColor}
        ></SelectDropdown>
        <SelectDropdown
          items={list_category}
          title_select="Category"
          handleSelect={handleSelectColor}
        ></SelectDropdown>
        <SelectDropdown
          items={list_price_range}
          title_select="Price Range"
          handleSelect={handleSelectColor}
        ></SelectDropdown>
        <SelectDropdown
          items={list_sort_by}
          title_select="Sort By"
          handleSelect={handleSelectColor}
        ></SelectDropdown>
      </div>
      <ListProduct prop_items={fetchData.data}></ListProduct>
    </div>
  );
}
