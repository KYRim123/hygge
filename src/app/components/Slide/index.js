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

  return (
    <div className="whitespace-nowrap overflow-hidden relative">
      {slide?.map((item, index) => (
        <div
          key={index}
          className="relative h-[500px] bg-gray-100 rounded-3xl overflow-hidden border-[1px] border-gray-100 shadow-sm w-full inline-block  transition-transform"
          style={{ transform: `translateX(calc(-100% * ${crSlide}))` }}
        >
          <Link
            href={`/news/${item?.id}`}
            className="absolute inset-0"
          >
            <Image
              src={`${process.env.HTTPS_URL}/upload/${item?.anh_tin_tuc}`}
              width={1200}
              height={500}
              alt="imageSlide"
              style={{ objectFit: "cover" }}
              priority={true}
              className="w-full object-cover"
            />
          </Link>
        </div>
      ))}
      <div className="flex items-center gap-2 my-10 absolute -bottom-2 left-1/2 right-1/2 w-max">
        {slide?.length > 0 &&
          slide?.map((item, index) => (
            <span
              key={index}
              onClick={() => onClikBtnCmt(index)}
              className={`cursor-pointer w-3 h-3  rounded-full transition-colors ${
                crSlide !== index ? "bg-white border-[1px] border-gray-600" : "bg-gray-300"
              }`}
            ></span>
          ))}
      </div>
    </div>
  );
};

export default Slide;
