// swiper
import { Swiper } from "swiper/react";
import { Controller, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
// icons
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
// aa
import TypeProduct from "../TypeProduct";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RelatedProduct({ listProduct }) {
  const router = useRouter();
  const handleClickProductRelated = () => {
    router.push("/");
  };
  return (
    <div className="mt-20">
      <div className="mb-10 ">
        <span className="label-1">- Explore More</span>
        <div className="flex justify-between w-full">
          <h1 className="title-1">Related Products</h1>
          <div className="flex items-center gap-2">
            <div className="wrapper-icon--1 hover-icon btn-prev--relatedProduct">
              <GrFormPrevious size={26} />
            </div>
            <div className="wrapper-icon--1 hover-icon btn-next--relatedProduct">
              <GrFormNext size={26} />
            </div>
          </div>
        </div>
      </div>
      <Swiper
        modules={[Controller, Navigation]}
        spaceBetween={10}
        slidesPerView={4}
        navigation={{ nextEl: ".btn-next--relatedProduct", prevEl: ".btn-prev--relatedProduct" }}
      >
        {listProduct.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={handleClickProductRelated}
              className="relative bg-gray-100 w-[250px] h-[250px] rounded-3xl cursor-pointer"
            >
              <Image
                width={500}
                height={500}
                src={item.img}
                className="w-full h-full object-cover"
                alt="mm"
              />
              {item.sale && (
                <span className="absolute top-11 -right-10 bg-red-500 text-white font-semibold text-lg py-2 px-4 rounded-full">
                  {item.sale}% off
                </span>
              )}
            </div>
            <div className="">
              <div className="text-lg font-bold">{item.name}</div>
              <div className="flex gap-2 justify-between items-center mt-5">
                <TypeProduct type={item.type} />
                <div className="mr-9">
                  <span className="text-gray-400 line-through mr-5 text-base">$30</span>
                  <span className="font-bold text-xl">$20</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
