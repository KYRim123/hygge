"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { api_post_ListReview, api_post_WaitReview, api_post_Review } from "@/app/lib/api";
import Image from "next/image";
import ReviewStar from "@/app/components/ReviewStar";
import style from "./index.module.css";
import ModalReview from "@/app/components/ModalReivew";
import toast from "react-hot-toast";

const ProductReviews = () => {
  const tabAll = 0;
  const [crTab, setCrTab] = useState(tabAll);
  const tabs = [
    { id: 0, nameTab: "The product has been evaluated" },
    { id: 1, nameTab: "The product has not been rated yet" },
  ];
  const { data: session } = useSession();
  const [data_review, set_data_review] = useState([]);
  const [data_wait_review, set_data_wait_review] = useState([]);
  const [show_modal_review, set_show_modal_review] = useState(false);
  const [id_invoice, set_id_invoice] = useState();
  const [id_product, set_id_product] = useState();
  const handleClickTab = (index) => {
    setCrTab(index);
  };
  const handleAddNewReview = async (comment, star) => {
    await axios
      .post(api_post_Review, {
        id: session?.user?.id,
        id_invoice: id_invoice,
        comment: comment,
        star: star,
        id_product: id_product,
      })
      .then((res) => {
        if (res.data.status == true) {
          toast.success("Review added successfully");
          fetchDataReview();
          fetchDataWaitReview();
        } else {
        }
      })
      .catch((err) => {});
  };
  const fetchDataReview = async () => {
    await axios
      .post(api_post_ListReview, { id: session?.user?.id })
      .then((res) => {
        if (res.data.status == true) {
          set_data_review(res.data.data);
        } else {
        }
      })
      .catch((err) => {});
  };

  const fetchDataWaitReview = async () => {
    await axios
      .post(api_post_WaitReview, { id: session?.user?.id })
      .then((res) => {
        if (res.data.status == true) {
          set_data_wait_review(res.data.data);
        } else {
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (session?.user?.id != null) {
      fetchDataReview();
      fetchDataWaitReview();
    }
  }, [session?.user?.id]);
  return (
    <div>
      {show_modal_review ? (
        <ModalReview
          setShowModal={set_show_modal_review}
          handleAddNewReview={handleAddNewReview}
        ></ModalReview>
      ) : (
        ""
      )}
      <div className="flex items-center justify-between">
        {tabs.length > 0 &&
          tabs.map((tab, index) => (
            <div
              key={index}
              className={`flex-grow text-center capitalize text-lg cursor-pointer border-b-[2px] transition-all ${
                tab.id == crTab ? "text-main-100 border-main-100 " : "border-gray-100"
              }`}
              onClick={() => handleClickTab(tab.id)}
            >
              <span className="py-2 block">{tab.nameTab}</span>
            </div>
          ))}
      </div>
      <div className=" mt-2 h-[500px]">
        <div className="h-full overflow-y-scroll">
          <div className="flex flex-col gap-3 p-3">
            {crTab == 0 &&
              data_review?.map((item_child, index) => (
                <div key={index}>
                  <div className="px-[16px]">{item_child?.san_pham?.ten_san_pham}</div>
                  <div className="flex px-[16px]">
                    <div>
                      <Image
                        src={`${process.env.HTTPS_URL}/upload/${item_child?.san_pham?.hinh_anh[0]?.hinh_anh_san_pham}`}
                        width={100}
                        height={100}
                        alt="imageSlide"
                        style={{ objectFit: "cover" }}
                        priority={true}
                      />
                    </div>
                    <div className="inline-block pl-[16px]">
                      <div>
                        <ReviewStar star={item_child?.danh_gia?.sao_danh_gia} />
                      </div>
                      <div>{item_child?.danh_gia?.binh_luan_danh_gia}</div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            {crTab == 1 &&
              data_wait_review?.map((item_child, index) => (
                <div key={index}>
                  <div className="px-[16px]">{item_child?.san_pham?.ten_san_pham}</div>
                  <div className="flex px-[16px]">
                    <div>
                      <Image
                        src={`${process.env.HTTPS_URL}/upload/${item_child?.san_pham?.hinh_anh[0]?.hinh_anh_san_pham}`}
                        width={100}
                        height={100}
                        alt="imageSlide"
                        style={{ objectFit: "cover" }}
                        priority={true}
                      />
                    </div>
                    <div className="inline-block pl-[16px] w-full">
                      <div>
                        <div
                          className={style.btn_review}
                          onClick={() => {
                            set_id_invoice(item_child?.id_hoa_don);
                            set_id_product(item_child?.id_san_pham);
                            set_show_modal_review(true);
                          }}
                        >
                          Review
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
