"use client";
import ListProduct from "@/app/components/ListProduct";
import SelectDropdown from "@/app/components/SelectDropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@/app/components/Pagination";
import LoadingA from "@/app/components/LoadingA";

export default function ProductPage() {
  const valueSearch = localStorage.getItem("search");
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchData, setFetchData] = useState();
  const [price, setPrice] = useState({ gia_tien: [] });

  useEffect(() => {
    const api = `${process.env.HTTP_URL}/api/product/search`;
    axios.post(api, { search: valueSearch, gia_tien: price }).then((res) => {
      setFetchData(res.data.data);
      setCurrentPage(res.data.currentPage);
    });
  }, [price, currentPage, valueSearch]);

  // loading

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

  // category
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
      name: "$100+",
    },
  ];

  // handle category
  const handleSelectColor = (id, name, title_select) => {
    if (title_select === "Price Range") {
      let gia_tien = [];
      switch (id) {
        case 1:
          gia_tien = [0, 10];
          break;
        case 2:
          gia_tien = [10, 20];
          break;
        case 3:
          gia_tien = [20, 40];
          break;
        case 4:
          gia_tien = [40, 100];
          break;
        case 5:
          gia_tien = [100, 0];
          break;
      }
      setPrice([...gia_tien]);
    }
  };

  return (
    <div>
      <span className="label-1">- Search result -</span>
      <div>
        <h1 className="title-1">Eye Care Products for Tired Eyes</h1>
        <div className="my-14">
          <b>{count_product} products found</b>
        </div>
        <div>
          <SelectDropdown
            items={list_price_range}
            title_select="Price Range"
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
    </div>
  );
}
