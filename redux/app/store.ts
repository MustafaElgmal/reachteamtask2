// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/category"; // Adjust the path as necessary
import itemReducer from "../features/item";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    item: itemReducer,
    // Add other reducers here if needed
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Export the store and its types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

