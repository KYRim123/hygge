"use client";
// hk
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
// icons
import { IoWaterOutline } from "react-icons/io5";
import { GrClose, GrFormNext, GrFormPrevious } from "react-icons/gr";
import { AiOutlineComment, AiOutlineSafetyCertificate } from "react-icons/ai";
import { SlGraph } from "react-icons/sl";
// lb
import axios from "axios";
import useSWR from "swr";

// cp
import TypeProduct from "@/app/components/TypeProduct";
import Review from "@/app/components/Reviews";
import RelatedProduct from "@/app/components/RelatedProduct";
import Button from "@/app/components/Button";
import LoadingA from "@/app/components/LoadingA";
import WrapperSwiper from "@/app/components/WrapperSwiper";
import { SwiperSlide } from "swiper/react";
import { avaReview1 } from "../../../../../public/assets";
import ReviewStar from "@/app/components/ReviewStar";
import DisplayHTMLString from "@/app/components/hook/displayhtmlstring";

import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { addItemCart, fetchCart } from "@/app/store/slide/cartSlide";
import { useDispatch, useSelector } from "react-redux";
import { getStatusCart } from "@/app/store/selector";

function DetailProduct() {
  const [currentImage, setCurrentImage] = useState(0);
  const [totalProduct, setTotalProduct] = useState(1);
  const [indexTab, setIndexTab] = useState(0);
  const [zoomImg, setZoomImg] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const { data: session } = useSession();
  const params = useParams();
  const dispatch = useDispatch();
  const getStatus = useSelector(getStatusCart);
  const idProduct = params.id;

  // fetchdata
  async function fetchData(api) {
    const res = await axios.get(api);
    const result = await res.data;
    return result;
  }
  const { data: dataProduct, isLoading } = useSWR(
    `${process.env.HTTPS_URL}/api/product/${idProduct}`,
    fetchData,
  );
  if (isLoading) {
    return <LoadingA />;
  }

  // initial data
  const idUser = session?.user?.id;
  const { ten_san_pham, khuyen_mai, gia } = dataProduct.data;
  const { ten_loai_san_pham } = dataProduct.data.loai_san_pham;
  const reviews = dataProduct.reviews;
  const priceNew = gia - (gia * khuyen_mai) / 100;
  const nameTag = "- Selling Fast";
  const listImages = dataProduct.image;
  const tabs = [{ name: "reivews" }, { name: "description" }];
  const indexTabRev = 0;
  const indexTabDes = 1;
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
      loai_sp: { ten_loai_san_pham: "EYE CARE" },
      price: 85,
      img: "169721623927.png",
    },
    {
      name: "Name 2",
      img: "",
      sale: 10,
      loai_sp: { ten_loai_san_pham: "SUN CARE" },
      price: 200,
      img: "169721623927.png",
    },
    {
      name: "Name 3",
      img: "",
      sale: 15,
      loai_sp: { ten_loai_san_pham: "TREATMENTS" },
      price: 20,
      img: "169721623927.png",
    },
    {
      name: "Name 4",
      img: "",
      sale: 10,
      loai_sp: { ten_loai_san_pham: "MOISTURIZERS" },
      price: 37,
      img: "169721623927.png",
    },
    {
      name: "Name 5",
      img: "",
      sale: 0,
      loai_sp: { ten_loai_san_pham: "FEATURED" },
      price: 188,
      img: "169721623927.png",
    },
    {
      name: "Name 6",
      img: "",
      sale: 10,
      loai_sp: { ten_loai_san_pham: "MOISTURIZERS" },
      price: 1111,
      img: "169721623927.png",
    },
    {
      name: "Name 7",
      img: "",
      sale: 0,
      loai_sp: { ten_loai_san_pham: "FEATURED" },
      price: 60,
      img: "169721623927.png",
    },
    {
      name: "Name 8",
      img: "",
      sale: 10,
      loai_sp: { ten_loai_san_pham: "FEATURED" },
      price: 80,
      img: "169721623927.png",
    },
    {
      name: "Name 9",
      img: "",
      sale: 0,
      loai_sp: { ten_loai_san_pham: "FEATURED" },
      price: 60,
      img: "169721623927.png",
    },
  ];

  // handle
  const handleChangeCurrentImg = (index) => {
    setCurrentImage(index);
  };

  const handleClickPrev = () => {
    setTotalProduct((prev) => prev - 1);
  };

  const handleClickNext = () => {
    setTotalProduct((prev) => prev + 1);
  };

  const addToCard = () => {
    if (idUser != null) {
      dispatch(addItemCart({ idUser, idProduct, totalProduct }));
    } else {
      toast.error("Yêu Cầu Đăng Nhập");
    }
  };

  if (getStatus === "successed_add") {
    dispatch(fetchCart(idUser));
    toast.success("Add to cart successfully!");
  }

  const handleChangeTab = (index) => {
    setIndexTab(index);
  };

  const handleZoomImg = () => {
    setZoomImg(true);
    setIsShowModal(true);
  };
  
  const handleClose = () => {
    setZoomImg(false);
    setTimeout(() => {
      setIsShowModal(false);
    }, 300);
  };

  return (
    <>
      <div className={"flex items-center gap-10 h-[510px] w-full"}>
        <div className="w-[150px] h-full relative">
          {/* next prev */}
          <div
            onClick={() => setCurrentImage(currentImage === 0 ? 0 : currentImage - 1)}
            className={`${
              currentImage === 0 ? "hidden" : ""
            } absolute cursor-pointer z-10 top-0 w-full flex justify-center items-center prevDetailProduct`}
          >
            <GrFormPrevious
              size={36}
              className="rotate-90"
            />
          </div>
          <div
            onClick={() =>
              setCurrentImage(
                currentImage === listImages.length - 1 ? listImages.length - 1 : currentImage + 1,
              )
            }
            className={`${
              currentImage === listImages.length - 1 ? "hidden" : ""
            } absolute cursor-pointer z-10 bottom-0 w-full flex justify-center items-center nextDetailProduct`}
          >
            <GrFormNext
              size={36}
              className="rotate-90"
            />
          </div>
          {/* list image detail */}
          <WrapperSwiper
            direction={"ver"}
            slidesPerView={3}
            nextClass={".nextDetailProduct"}
            prevClass={".prevDetailProduct"}
          >
            {listImages.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`cursor-pointer bg-gray-100 rounded-3xl border-2 ${
                    currentImage === index ? "border-main-100" : ""
                  }`}
                  onClick={() => handleChangeCurrentImg(index)}
                >
                  <Image
                    width={300}
                    height={300}
                    src={`${process.env.HTTPS_URL}/upload/${item.hinh_anh_san_pham}`}
                    className="object-cover w-full h-40 rounded-3xl"
                    alt="imgProduct"
                  />
                </div>
              </SwiperSlide>
            ))}
          </WrapperSwiper>
        </div>
        <div
          className={`relative bg-gray-100 rounded-3xl cursor-pointer flex-grow flex items-center justify-center h-full`}
          onClick={handleZoomImg}
        >
          <Image
            src={`${process.env.HTTPS_URL}/upload/${listImages[currentImage].hinh_anh_san_pham}`}
            width={500}
            height={500}
            alt="imgProduct"
            className="object-cover p-5"
          />
        </div>
        {/* zoom image */}
        {isShowModal && (
          <div
            className={`fixed inset-0 z-20 bg-productDetail flex items-center justify-center`}
            onClick={handleClose}
          >
            <div
              className={`relative bg-white w-full h-full mx-[25%] max-h-[600px] flex items-center justify-center rounded-2xl ${
                zoomImg ? "animate-fadeIn" : "animate-fadeOut"
              }`}
            >
              <Image
                src={`${process.env.HTTPS_URL}/upload/${listImages[currentImage].hinh_anh_san_pham}`}
                width={700}
                height={500}
                alt="imgProduct"
                className="object-cover w-[500px] h-[500px]"
              />
              <div
                className="absolute right-0 top-0 p-4 cursor-pointer hover:opacity-70"
                onClick={handleClose}
              >
                <GrClose size={25} />
              </div>
            </div>
          </div>
        )}
        {/* detail */}
        <div className="flex-grow">
          <span className="label-1">{nameTag}</span>
          <h1 className="title-1">{ten_san_pham}</h1>
          <div className="flex gap-2 justify-between items-center mt-5">
            <TypeProduct
              text={ten_loai_san_pham}
              price={gia}
            />
            <div className="ml-5 ">
              <span className="text-gray-400 line-through mr-5 text-xl">${gia}</span>
              <span className="font-bold text-3xl">${priceNew}</span>
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
          </div>
        </div>
      </div>
      {/* about */}
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
      {/* tab */}
      <div className="h-[800px] my-20">
        <div className="p-4 h-full flex flex-col">
          {/* tab */}
          <div className="flex gap-5 mb-4">
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => handleChangeTab(index)}
                className="bg-gray-200 min-w-[150px] py-2 px-4 rounded-lg shadow-lg cursor-pointer hover:bg-slate-300"
              >
                <div>
                  <AiOutlineComment size={26} />
                </div>
                <span className="font-semibold text-base capitalize">{tab.name}</span>
              </div>
            ))}
          </div>
          {/* content */}
          <div className="flex-grow overflow-y-scroll ">
            {/* reviews */}
            {indexTab === indexTabRev && (
              <div className="w-full transition-all p-4">
                {/* list reviews */}
                {(reviews &&
                  reviews.length > 0 &&
                  reviews.map((review, index) => (
                    <div
                      key={index}
                      className="border-b-2 border-gray-400 py-4"
                    >
                      <div className="inline-flex items-center gap-2">
                        <div className="h-12 w-h-12">
                          <Image
                            width={50}
                            height={50}
                            src={avaReview1}
                            alt="avatar"
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold capitalize">{review.nguoi_danh_gia.ten_nguoi_dung}</h4>
                          <ReviewStar star={review.sao_danh_gia} />
                          <span className="text-gray-300">2 years ago</span>
                        </div>
                      </div>
                      <div className="py-4">{review.binh_luan_danh_gia}</div>
                    </div>
                  ))) ||
                  (reviews.length == 0 && (
                    <div className="text-center text-3xl mt-10 font-bold">Sản Phẩm Chưa Có Đánh Giá</div>
                  ))}
              </div>
            )}
            {/* des */}
            {indexTab === indexTabDes && <DisplayHTMLString htmlString={dataProduct.data.mo_ta} />}
          </div>
        </div>
      </div>
      {/* related  */}
      <RelatedProduct listProduct={listProductRelated} />
      {/* review */}
      <div className="mt-28">
        <Review />
      </div>
    </>
  );
}
export default DetailProduct;
