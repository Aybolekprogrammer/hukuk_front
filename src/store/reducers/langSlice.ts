import { createSlice } from "@reduxjs/toolkit";
import { fallbackLang, Lang } from "../../translations";

const langSlice = createSlice({
  name: "lang",
  initialState: fallbackLang as Lang, 
  reducers: {
    setLang: (_, action) => action.payload,
  },
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
