"use client";
// hk
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
// icons
import { IoWaterOutline } from "react-icons/io5";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  AiFillStar,
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineSafetyCertificate,
  AiOutlineStar,
} from "react-icons/ai";
import { SlGraph } from "react-icons/sl";
// css
import style from "./index.module.css";
// lb
import ReactImageMagnify from "react-image-magnify";
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
import { MdOutlineDescription } from "react-icons/md";
import { avaReview1 } from "../../../../../public/assets";
import ReviewStar from "@/app/components/ReviewStar";

function DetailProduct() {
  const [currentImage, setCurrentImage] = useState(0);
  const [totalProduct, setTotalProduct] = useState(1);
  const [indexTab, setIndexTab] = useState(0);

  const params = useParams();
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

  // data
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
  const addToCard = async () => {
    return null;
  };

  const handleChangeTab = (index) => {
    setIndexTab(index);
  };

  console.log(indexTab);
  return (
    <>
      <div className={`${"flex items-center gap-10 h-[510px] w-full"} ${style.body_detail_product}`}>
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
                    className="object-cover w-full h-40"
                    alt="imgProduct"
                  />
                </div>
              </SwiperSlide>
            ))}
          </WrapperSwiper>
        </div>

        <div className={"relative h-full w-[500px] bg-gray-100 rounded-3xl transition-all"}>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src: `${process.env.HTTPS_URL}/upload/${listImages[currentImage].hinh_anh_san_pham}`,
              },
              largeImage: {
                className: style.class_img,
                src: `${process.env.HTTPS_URL}/upload/${listImages[currentImage].hinh_anh_san_pham}`,
                width: 1500,
                height: 1500,
              },
              enlargedImageContainerStyle: {
                backgroundColor: "rgb(235, 235, 235)",
              },
            }}
          />
          {khuyen_mai !== 0 && (
            <span className="absolute top-11 -right-10 bg-red-500 text-white font-semibold text-lg py-2 px-4 rounded-full">
              {khuyen_mai}% off
            </span>
          )}
        </div>

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
            <div className="p-5 border-black-100 border-2 rounded-full cursor-pointer">
              <AiOutlineHeart size={26} />
            </div>
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
      <div className="h-[800px] my-20 border-gray-200 border-[2px] rounded-xl">
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
          <div className="border-gray-200 border-[2px] rounded-xl flex-grow overflow-y-scroll">
            {/* reviews */}
            {indexTab === indexTabRev && (
              <div className="w-full transition-all p-4">
                <div>
                  {/* cmt */}
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
                    <h4 className="font-bold">Nguyen Thanh Luong</h4>
                  </div>
                  <input
                    type="text"
                    placeholder="write a comment"
                    className="w-full outline-none py-2 border-b-2 border-gray-300"
                  />
                  <div className="w-full text-end mt-3">
                    <Button className={"bg-main-100 text-white py-[5px] px-2"}>Comment</Button>
                  </div>
                </div>
                {/* list reviews */}
                {reviews &&
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
                      <div className="py-4">
                        Ôi e Trầm Cảm mất các mẹ ơi🥹🥹🥹 Mất 3 đêm thao thức, cả ngày lướt Review và Shopee
                        để chọn ra em Robot lau cửa kính mà Rước Bực vào người, lại Trả Hàng. Cái WA50 nhiều
                        shop bán có 2,7-3,4tr hàng trưng bày nhưng e sợ ko đảm bảo cố lên giá cao hơn chút là
                        W920 Ecovact mà cuối cùng “Treo Đầu Dê Bán Thịt Chó” các mẹ ạh! E đưa lên đây để các
                        Mẹ mua hàng tránh xa cái shop Mất Uy Tín này ra để đỡ bực như em. Hình 1 kiểu giao
                        hàng 1 kiểu. May quá e chưa Bấm Nhận chứ tiền e ck ngay và luôn cho giao hàng rồi. E
                        phản ánh ảnh shop còn nói khách thế này luôn. Bảo Hình Trên Mạng có thể Sai??? Ôi Làm
                        Ăn Thế này à Shop ơi! Xin các mẹ Review giúp e cái Robot lau kính Có Khung và Không
                        Khung, Cầu Thang nữa ạh🥹🥹🥹❤️❤️❤️
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {/* des */}
            {indexTab === indexTabDes && (
              <div className="w-full transition-all p-4">
                {listImages.map((img, index) => (
                  <div key={index}>
                    <div className="">
                      <Image
                        width={500}
                        height={500}
                        src={`${process.env.HTTPS_URL}/upload/${img.hinh_anh_san_pham}`}
                        className="object-cover w-full h-2/4"
                        alt="imgProduct"
                      />
                    </div>
                    <div>
                      Ôi e Trầm Cảm mất các mẹ ơi🥹🥹🥹 Mất 3 đêm thao thức, cả ngày lướt Review và Shopee để
                      chọn ra em Robot lau cửa kính mà Rước Bực vào người, lại Trả Hàng. Cái WA50 nhiều shop
                      bán có 2,7-3,4tr hàng trưng bày nhưng e sợ ko đảm bảo cố lên giá cao hơn chút là W920
                      Ecovact mà cuối cùng “Treo Đầu Dê Bán Thịt Chó” các mẹ ạh! E đưa lên đây để các Mẹ mua
                      hàng tránh xa cái shop Mất Uy Tín này ra để đỡ bực như em. Hình 1 kiểu giao hàng 1 kiểu.
                      May quá e chưa Bấm Nhận chứ tiền e ck ngay và luôn cho giao hàng rồi. E phản ánh ảnh
                      shop còn nói khách thế này luôn. Bảo Hình Trên Mạng có thể Sai??? Ôi Làm Ăn Thế này à
                      Shop ơi! Xin các mẹ Review giúp e cái Robot lau kính Có Khung và Không Khung, Cầu Thang
                      nữa ạh🥹🥹🥹❤️❤️❤️
                    </div>
                  </div>
                ))}
              </div>
            )}
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
