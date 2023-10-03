"use client";
import ListProduct from "@/app/components/ListProduct";
import SelectDropdown from "@/app/components/SelectDropdown";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "./product.module.css";

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState("1");
  const handleSelectColor = (id, name) => {
    console.log(id, name);
  };

  const text_search = "Eye Care Products for Tired Eyes";
  const items_search = [
    {
      name: "Name 1",
      img: "",
      sale: 20,
      type: "EYE CARE",
      price: 25,
    },
    {
      name: "Name 2",
      img: "",
      sale: 10,
      type: "SUN CARE",
      price: 30,
    },
    {
      name: "Name 3",
      img: "",
      sale: 15,
      type: "TREATMENTS",
      price: 20,
    },
    {
      name: "Name 4",
      img: "",
      sale: 10,
      type: "MOISTURIZERS",
      price: 40,
    },
    {
      name: "Name 5",
      img: "",
      sale: 0,
      type: "FEATURED",
      price: 60,
    },
  ];
  const count_items_search = items_search.length;
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
  const countPage = "5";

  // handle
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  return (
    <div>
      <span className="label-1">- Search Results -</span>
      <h1 className="title-1">{text_search}</h1>
      <div>
        <b>{count_items_search}</b> products found
      </div>
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
      <ListProduct prop_items={items_search}></ListProduct>
      {/* phan trang */}
      <div className={styles.pagination_wrapper}>
        <div className={styles.pagination_container}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={countPage}
            renderOnZeroPageCount={null}
            activeClassName={styles.activeClick}
            previousClassName={styles.prev}
            nextClassName={styles.next}
            className={styles.pagination}
            pageClassName={styles.pageNumber}
          />
        </div>
      </div>
    </div>
  );
}
