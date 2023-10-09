"use client";
import Image from "next/image";
import { imageSlide } from "../../public/assets";
import Button from "./components/Button";
import { useRouter } from "next/navigation";
// icons
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import BoxCategory from "./components/BoxCategory";
import { FaShoppingBag } from "react-icons/fa";
import { SlGraph } from "react-icons/sl";
import { MdOutlineMasks, MdOutlinePolicy } from "react-icons/md";
import { GiEyelashes } from "react-icons/gi";
import { IoWaterOutline } from "react-icons/io5";
import { AiFillSafetyCertificate, AiOutlineStar } from "react-icons/ai";
import { BiSolidMoon } from "react-icons/bi";
import { BsPerson, BsSun } from "react-icons/bs";
// component
import ListProduct from "./components/ListProduct";
import MarginY from "./components/MarginY";
import Review from "./components/Reviews";
// others
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, Navigation } from "swiper/modules";
import "swiper/css";
import NewLetter from "./components/Newletter";
// 
import { useSession } from "next-auth/react";

//  home page
export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const handleShopNow = () => {
    router.push("/cart");
  };

  const listCategory = [
    { link: "/", icon: FaShoppingBag, text: "On sale" },
    { link: "/", icon: SlGraph, text: "Featured" },
    { link: "/", icon: MdOutlineMasks, text: "Masks" },
    { link: "/", icon: GiEyelashes, text: "Eye Care" },
    { link: "/", icon: IoWaterOutline, text: "Moisturizers" },
    { link: "/", icon: AiFillSafetyCertificate, text: "Treatments" },
    { link: "/", icon: BiSolidMoon, text: "Night Care" },
    { link: "/", icon: BsSun, text: "Sun Care" },
    { link: "/", icon: AiFillSafetyCertificate, text: "Treatments" },
    { link: "/", icon: BiSolidMoon, text: "Night Care" },
    { link: "/", icon: BsSun, text: "Sun Care" },
  ];

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

  return (
    <>
      {/* // slider */}
      <div className=" bg-gray-100 rounded-3xl">
        <div className="grid grid-cols-2 grid-rows-1 py-14 px-40 center">
          <div className="my-auto">
            <span className="label-1">- Skincare Products</span>
            <h1 className="title-1">
              We Offer the Best <br /> Products for your Skin
            </h1>
            <div className="w-[165px]">
              <Button
                className=" bg-main-100 text-button text-[15px]"
                onClick={handleShopNow}
              >
                Shop Now
              </Button>
            </div>
          </div>
          <div>
            <Image
              src={imageSlide}
              width={500}
              height={500}
              alt="imageSlide"
              style={{ objectFit: "cover" }}
              priority={true}
            />
          </div>
        </div>
      </div>
      {/* // categories */}
      <div className="mt-10 overflow-hidden">
        <span className="label-1">- The Categories</span>
        <div className="flex items-center justify-between">
          <h1 className="title-1">Browse by Category</h1>
          <div className="flex items-center gap-2">
            <div className="wrapper-icon--1 hover-icon swiper-prev--categoryBtn">
              <GrFormPrevious size={26} />
            </div>
            <div className="wrapper-icon--1 hover-icon swiper-next--categoryBtn">
              <GrFormNext size={26} />
            </div>
          </div>
        </div>
        {/* list category */}
        <Swiper
          modules={[Controller, Navigation]}
          spaceBetween={10}
          slidesPerView={7}
          navigation={{ nextEl: ".swiper-next--categoryBtn", prevEl: ".swiper-prev--categoryBtn" }}
        >
          {listCategory?.map((item, index) => (
            <SwiperSlide key={index}>
              <BoxCategory
                Icon={item.icon}
                text={item.text}
                link={item.link}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* our products */}
        <MarginY>
          <span className="label-1">- our products</span>
          <h1 className="title-1">Explore out Products</h1>
          <ListProduct prop_items={items_search}></ListProduct>
          <div className="w-full text-center">
            <Button className={"bg-main-100 text-white"}>View All</Button>
          </div>
        </MarginY>
        {/* why us */}
        <div className="my-28">
          <span className="label-1 text-center w-full block">- why us</span>
          <h1 className="title-1 text-center">why people choose us</h1>
          <div className="flex justify-between mt-20">
            <div className="flex items-center flex-col flex-grow">
              <div className="wrapper-icon--1 w-20 h-20">
                <MdOutlinePolicy size={45} />
              </div>
              <h1 className="title-1">Easy Returns</h1>
              <p className="text-xl">Our return policy is simple and that is why customers love our shop.</p>
            </div>
            <div className="flex items-center flex-col flex-grow">
              <div className="wrapper-icon--1 w-20 h-20">
                <BsPerson size={45} />
              </div>
              <h1 className="title-1">Customer Service</h1>
              <p className="text-xl">We offer amazing customer service no matter what happens.</p>
            </div>
            <div className="flex items-center flex-col flex-grow">
              <div className="wrapper-icon--1 w-20 h-20">
                <AiOutlineStar size={45} />
              </div>
              <h1 className="title-1">High Quality</h1>
              <p className="text-xl">
                All of our products go through very strict inspection before we dispatch them.
              </p>
            </div>
          </div>
        </div>
        {/*cmt people*/}
        <Review />
        {/* new letter */}
        {!session && <NewLetter />}
      </div>
    </>
  );
}
