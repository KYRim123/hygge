import { createSlice } from "@reduxjs/toolkit";

const showItemSlide = createSlice({
  name: "show-item-slide",
  initialState: { showChat: false },
  reducers: {
    setShowChat: (state, actions) => {
      state.showChat = !state.showChat;
    },
  },
});

export default showItemSlide.reducer;
export const { setShowChat } = showItemSlide.actions;
