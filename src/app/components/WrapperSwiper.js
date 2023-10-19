import { Swiper } from "swiper/react";
import { Controller, Navigation } from "swiper/modules";
import "swiper/css";

export default function WrapperSwiper({ children, prevClass, nextClass, direction, slidesPerView }) {
  return (
    <Swiper
      modules={[Controller, Navigation]}
      spaceBetween={10}
      slidesPerView={slidesPerView}
      navigation={{ nextEl: nextClass, prevEl: prevClass }}
      direction={direction === "ver" ? "vertical" : "horizontal"}
      className="h-full"
    >
      {children}
    </Swiper>
  );
}
