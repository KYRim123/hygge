import { configureStore } from "@reduxjs/toolkit";
import cartSlide from "./slide/cartSlide";
import showItemSlide from "./slide/showItemSlide";
import searchSlide from "./slide/searchSlide";

const store = configureStore({
  reducer: {
    cartSlide,
    showItemSlide,
    searchSlide,
  },
});

export default store;
