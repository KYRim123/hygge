"use client";
import Button from "./components/Button";
import { useRouter } from "next/navigation";
// icons
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
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
import NewLetter from "./components/Newletter";
import { SwiperSlide } from "swiper/react";
//
import { useSession } from "next-auth/react";
import useSWR from "swr";
import axios from "axios";
import WrapperSwiper from "./components/WrapperSwiper";
import BoxCategory from "./components/BoxCategory";
import { useDispatch } from "react-redux";
import { fetchCart } from "./store/slide/cartSlide";
import { useEffect } from "react";
import { api_get_ListProduct } from "./lib/api";
import { updateSearch } from "./store/slide/searchSlide";
import Slide from "./components/Slide";

//  home page
export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  // redux
  useEffect(() => {
    if (session?.user) {
      dispatch(fetchCart(session?.user.id));
    }
  }, [dispatch]);

  const listCategory = [
    { icon: FaShoppingBag, text: "On sale" },
    { icon: SlGraph, text: "Featured" },
    { icon: MdOutlineMasks, text: "Mask" },
    { icon: GiEyelashes, text: "Eye Care" },
    { icon: IoWaterOutline, text: "Moisturizer" },
    { icon: AiFillSafetyCertificate, text: "Treatment" },
    { icon: BiSolidMoon, text: "Night Care" },
    { icon: BsSun, text: "Sun Care" },
    { icon: AiFillSafetyCertificate, text: "Treatment" },
    { icon: BiSolidMoon, text: "Night Care" },
    { icon: BsSun, text: "Sun Care" },
  ];

  // fetch listProduct
  const fetchProducts = async (api) => {
    const res = await axios.post(api, { page: "1" });
    const result = await res.data;
    return result.data;
  };
  const { data: fetchData } = useSWR(api_get_ListProduct, fetchProducts);
  const handleViewAll = () => {
    router.push("/products");
  };
  //
  const handleClickCate = (text) => {
    dispatch(updateSearch(text));
  };
  return (
    <>
      {/* // slider */}
      <Slide />
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
        <WrapperSwiper
          prevClass=".swiper-prev--categoryBtn"
          nextClass=".swiper-next--categoryBtn"
          slidesPerView={7}
        >
          {listCategory?.map((item, index) => (
            <SwiperSlide key={index}>
              <BoxCategory
                Icon={item.icon}
                text={item.text}
                onClick={() => handleClickCate(item.text)}
              />
            </SwiperSlide>
          ))}
        </WrapperSwiper>
        {/* our products */}
        <MarginY>
          <span className="label-1">- our products</span>
          <h1 className="title-1">Explore out Products</h1>
          {fetchData?.data && <ListProduct prop_items={fetchData?.data.slice(0, 8)}></ListProduct>}
          <div className="w-full text-center mt-10">
            <Button
              className={"bg-main-100 text-white"}
              onClick={handleViewAll}
            >
              View All
            </Button>
          </div>
        </MarginY>
        {/* why us */}
        <div className="my-28">
          <span className="label-1 text-center w-full block">- why us</span>
          <h1 className="title-1 text-center">why people choose us</h1>
          <div className="flex gap-10 text-center justify-between mt-20">
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
