import { api_delete_CartDel, api_get_MyCart, api_post_CartAdd } from "@/app/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlide = createSlice({
  name: "cart-slide",
  initialState: {
    status: "idle", //'idle' | 'loading_fc' | 'successed_fc', 'failed_fc',
    listProduct: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch data
      .addCase(fetchCart.pending, (state, action) => {
        state.status = "loading_fetch";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "successed_fetch";
        state.listProduct = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "rejected_fetch";
      })

      // add
      .addCase(addItemCart.pending, (state, action) => {
        state.status = "loading_add";
      })
      .addCase(addItemCart.fulfilled, (state, action) => {
        state.status = "successed_add";
      })
      .addCase(addItemCart.rejected, (state, action) => {
        state.status = "rejected_add";
      })

      // delete
      .addCase(delItemCart.pending, (state, action) => {
        state.status = "loading_del";
      })
      .addCase(delItemCart.fulfilled, (state, action) => {
        state.status = "successed_del";
        state.listProduct = state.listProduct.filter((product) => product.id !== action.payload);
      })
      .addCase(delItemCart.rejected, (state, action) => {
        state.status = "rejected_del";
      });
  },
});

export default cartSlide.reducer;

export const fetchCart = createAsyncThunk("fetch-cart", async (idUser) => {
  const res = await axios.post(api_get_MyCart, { id: idUser });
  const result = await res.data.data?.chi_tiet_gio_hang;
  return result;
});

export const addItemCart = createAsyncThunk(
  "add-item-in-cart",
  async ({ idUser, idProduct, totalProduct }) => {
    await axios.post(api_post_CartAdd, {
      id: idUser,
      id_san_pham: idProduct,
      so_luong: totalProduct,
    });
  },
);

export const delItemCart = createAsyncThunk("delete-item-in-cart", async ({ idUser, idItem }) => {
  const res = await axios.post(api_delete_CartDel, {
    id: idUser,
    id_item: idItem,
  });
  const result = await res.data.status;
  if (result) {
    return idItem;
  }
});
