import { configureStore } from "@reduxjs/toolkit";
import cartSlide from "./slide/cartSlide";

const store = configureStore({
  reducer: {
    cartSlide,
  },
});

export default store;
