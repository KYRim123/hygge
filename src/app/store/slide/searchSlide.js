const { createSlice } = require("@reduxjs/toolkit");

const searchSlide = createSlice({
  name: "searchSlide",
  initialState: {
    dataSearch: "",
  },
  reducers: {
    updateSearch: (state, actions) => {
      state.dataSearch = actions.payload;
    },
  },
});

export default searchSlide.reducer;
export const { updateSearch } = searchSlide.actions;
