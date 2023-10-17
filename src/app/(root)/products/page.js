"use client";
import ListProduct from "@/app/components/ListProduct";
import SelectDropdown from "@/app/components/SelectDropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@/app/components/Pagination";
import LoadingA from "@/app/components/LoadingA";

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchData, setFetchData] = useState();

  useEffect(() => {
    const api = `${process.env.HTTP_URL}/api/product/list?page=${currentPage}`;
    axios.get(api).then((res) => setFetchData(res.data.data));
  }, [currentPage]);

  if (!fetchData) {
    return <LoadingA />;
  }

  // pagination
  const count_product = fetchData?.total;
  const pageCount = Math.ceil(count_product / 12);
  // handle change page
  const onPageChange = (e) => {
    setCurrentPage(e.selected + 1);
  };

  // aa
  const handleSelectColor = (id, name) => {
    console.log(id, name);
  };

  // category
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

  return (
    <div>
      <span className="label-1">- List Products -</span>
      <h1 className="title-1">our products</h1>
      {/* <div>
        <b>{count_product}</b> products found
      </div> */}
      <div className="flex justify-around m-5">
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
      {fetchData && <ListProduct prop_items={fetchData.data}></ListProduct>}
      {/* phan trang */}
      <Pagination
        onPageChange={onPageChange}
        pageCount={pageCount}
      />
    </div>
  );
}
