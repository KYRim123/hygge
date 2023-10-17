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
import ProductItem from "../ProductItem";

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
            <ProductItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
