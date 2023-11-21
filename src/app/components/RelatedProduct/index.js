// icons
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
// aa
import ProductItem from "../ProductItem";
import WrapperSwiper from "../WrapperSwiper";
import { SwiperSlide } from "swiper/react";

export default function RelatedProduct({ listProduct }) {
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

      <WrapperSwiper
        prevClass=".btn-prev--relatedProduct"
        nextClass=".btn-next--relatedProduct"
        slidesPerView={4}
      >
        {listProduct.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductItem {...item} />
          </SwiperSlide>
        ))}
      </WrapperSwiper>
    </div>
  );
}
