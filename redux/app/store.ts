import { configureStore } from "@reduxjs/toolkit";
import category from "../features/category";
import item from "../features/item";

export const store = configureStore({
  reducer: { category,item },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
