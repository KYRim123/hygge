"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";
import { api_get_listSlide } from "@/app/lib/api";
import Link from "next/link";

const Slide = () => {
  const [crSlide, setCrSlide] = useState(0);
  const router = useRouter();
  const refTimeOut = useRef();

  async function fetchListSlide(api) {
    const res = await axios.get(api);
    const result = await res?.data?.data;
    return result;
  }

  const { data: slide } = useSWR(api_get_listSlide, fetchListSlide);

  const lengthdbReviews = slide?.length - 1;
  const delaySlideReview = 6000;

  useEffect(() => {
    refTimeOut.current = setTimeout(() => {
      setCrSlide(crSlide === lengthdbReviews ? 0 : crSlide + 1);
    }, delaySlideReview);
    return () => clearTimeout(refTimeOut.current);
  }, [crSlide]);

  const onClikBtnCmt = useCallback((crIndex) => {
    setCrSlide(crIndex);
    clearTimeout(refTimeOut.current);
  }, []);

  const handleShopNow = () => {
    router.push("/products");
  };

  const handleClickPageNews = () => {
    router.push("/news");
  };

  return (
    <div className="whitespace-nowrap overflow-hidden relative">
      {slide?.map((item, index) => (
        <div
          key={index}
          className=" bg-gray-100 rounded-3xl w-full inline-block  transition-transform"
          style={{ transform: `translateX(calc(-100% * ${crSlide}))` }}
        >
          <div className="grid grid-cols-2 grid-rows-1 py-14 px-40 center">
            <div className="my-auto">
              <h1 className="title-1">
                {item?.tieu_de_1}
                <br /> {item?.tieu_de_2}
              </h1>
              <div className="w-[165px] z-10">
                <Button
                  className=" bg-main-100 text-button text-[15px] "
                  onClick={handleShopNow}
                >
                  Shop Now
                </Button>
              </div>
            </div>
            <Link href={`/news/${item?.id}`}>
              <Image
                src={`${process.env.HTTPS_URL}/upload/${item?.anh_tin_tuc}`}
                width={400}
                height={400}
                alt="imageSlide"
                style={{ objectFit: "cover" }}
                priority={true}
              />
            </Link>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-2 my-10 absolute -bottom-2 left-1/2 right-1/2 w-max">
        {slide?.length > 0 &&
          slide?.map((item, index) => (
            <span
              key={index}
              onClick={() => onClikBtnCmt(index)}
              className={`cursor-pointer w-3 h-3  rounded-full transition-colors ${
                crSlide !== index ? "bg-white border-[1px] border-gray-600" : "bg-main-100"
              }`}
            ></span>
          ))}
      </div>
    </div>
  );
};

export default Slide;
