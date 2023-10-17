"use client";
import { useState } from "react";
import Image from "next/image";
import { listImageDetails } from "../../../../../public/assets";
import Button from "@/app/components/Button";
// icons
import { IoWaterOutline } from "react-icons/io5";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { AiOutlineHeart, AiOutlineSafetyCertificate } from "react-icons/ai";
import { SlGraph } from "react-icons/sl";
// aa
import TypeProduct from "@/app/components/TypeProduct";
import Review from "@/app/components/Reviews";
import RelatedProduct from "@/app/components/RelatedProduct";

export default function DetailProduct() {
  const [currentImage, setCurrentImage] = useState(0);
  const [totalProduct, setTotalProduct] = useState(1);
  const nameTag = "- Selling Fast";
  const nameProduct = "Sun Cream";
  const salePersent = "20%";
  const typeProduct = "FEATURED";
  const listImages = listImageDetails;
  const listFeatures = [
    {
      Icon: IoWaterOutline,
      name: "natural",
      details: "We are using natural ingredients only when creating our products.",
    },
    {
      Icon: AiOutlineSafetyCertificate,
      name: "Full Protection",
      details: "This product provides broad spectrum SPF 50 and blue light protection.",
    },
    {
      Icon: SlGraph,
      name: "Trending",
      details: "It is one of our most popular products that we have on offer",
    },
  ];

  const listProductRelated = [
    {
      name: "Name 1",
      img: "",
      sale: 20,
      type: "EYE CARE",
      price: 25,
      img: "169721623927.png",
    },
    {
      name: "Name 2",
      img: "",
      sale: 10,
      type: "SUN CARE",
      price: 30,
      img: "169721623927.png",
    },
    {
      name: "Name 3",
      img: "",
      sale: 15,
      type: "TREATMENTS",
      price: 20,
      img: "169721623927.png",
    },
    {
      name: "Name 4",
      img: "",
      sale: 10,
      type: "MOISTURIZERS",
      price: 40,
      img: "169721623927.png",
    },
    {
      name: "Name 5",
      img: "",
      sale: 0,
      type: "FEATURED",
      price: 60,
      img: "169721623927.png",
    },
    {
      name: "Name 6",
      img: "",
      sale: 10,
      type: "MOISTURIZERS",
      price: 40,
      img: "169721623927.png",
    },
    {
      name: "Name 7",
      img: "",
      sale: 0,
      type: "FEATURED",
      price: 60,
      img: "169721623927.png",
    },
    {
      name: "Name 8",
      img: "",
      sale: 10,
      type: "MOISTURIZERS",
      price: 40,
      img: "169721623927.png",
    },
    {
      name: "Name 9",
      img: "",
      sale: 0,
      type: "FEATURED",
      price: 60,
      img: "169721623927.png",
    },
  ];

  const handleChangeCurrentImg = (index) => {
    setCurrentImage(index);
  };
  const handleClickPrev = () => {
    setTotalProduct((prev) => prev - 1);
  };
  const handleClickNext = () => {
    setTotalProduct((prev) => prev + 1);
  };
  const addToCard = async () => {
    return null;
  };

  return (
    <>
      <div className="flex items-center gap-10 h-[500px] w-full">
        <div className="flex flex-col gap-5 w-40 items-center">
          {listImages.map((item, index) => (
            <div
              key={index}
              className={`w-full h-40 cursor-pointer bg-gray-100 rounded-3xl border-2 ${
                currentImage === index ? "border-main-100" : ""
              }`}
              onClick={() => handleChangeCurrentImg(index)}
            >
              <Image
                width={300}
                height={300}
                src={item}
                className="object-cover w-full h-full"
                alt="imgProduct"
              />
            </div>
          ))}
        </div>
        <div className={"relative h-full w-[300] bg-gray-100 rounded-3xl transition-all"}>
          <Image
            width={1920}
            height={1024}
            src={listImageDetails[currentImage]}
            className="object-cover w-full h-full"
            priority
          />
          <span className="absolute top-11 -right-10 bg-red-500 text-white font-semibold text-lg py-2 px-4 rounded-full">
            {salePersent} off
          </span>
        </div>
        <div className="flex-grow">
          <span className="label-1">{nameTag}</span>
          <h1 className="title-1">{nameProduct}</h1>
          <div className="flex gap-2 justify-between items-center mt-5">
            <TypeProduct type={typeProduct} />
            <div className="ml-5 ">
              <span className="text-gray-400 line-through mr-5 text-xl">$30</span>
              <span className="font-bold text-3xl">$20</span>
            </div>
          </div>
          <div className="mt-20 flex gap-2 justify-between">
            <div className="flex items-center justify-between gap-2 py-4 border-2 rounded-full">
              <button
                disabled={totalProduct === 1 ? true : false}
                className="px-5"
                onClick={handleClickPrev}
              >
                <GrFormPrevious size={20} />
              </button>
              <span className="text-xl font-semibold transition-opacity">{totalProduct}</span>
              <button
                className="px-5"
                onClick={handleClickNext}
              >
                <GrFormNext size={20} />
              </button>
            </div>
            <Button
              onClick={addToCard}
              className="bg-main-100 text-white py-4"
            >
              Add to Cart
            </Button>
            <div className="p-5 border-black-100 border-2 rounded-full cursor-pointer">
              <AiOutlineHeart size={26} />
            </div>
          </div>
        </div>
        {/* review */}
      </div>
      <div className="mt-32">
        <span className="label-1">- Product Features</span>
        <div className="flex justify-between">
          <div>
            <h1 className="title-1">Explore the Features</h1>
          </div>
          <div className="flex flex-col gap-5">
            {listFeatures.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-5"
              >
                <div className="wrapper-icon--1 w-[60px] h-[60px]">
                  <item.Icon size={30} />
                </div>
                <div className="w-[500px]">
                  <h5 className="title-1">{item.name}</h5>
                  <p className="text-lg">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* review */}
      <div className="mt-28">
        <Review />
      </div>
      {/* related  */}
      <RelatedProduct listProduct={listProductRelated} />
    </>
  );
}
