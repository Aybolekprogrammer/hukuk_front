// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./reducers/langSlice";
import loadingReducer from "./reducers/loadingSlice";

export const store = configureStore({
  reducer: {
    lang: langReducer,
    loading: loadingReducer,
  },
});

// 👉 export typing
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
