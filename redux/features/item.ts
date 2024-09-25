import { fetchItems } from "../../utils/apis";
import { Item } from "../../types/item.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DataState {
  data: Item[];
  ItemsShow: Item[];
  totalPage: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  ItemsShow: [],
  totalPage: 0,
  currentPage: 0,
  loading: false,
  error: null,
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<Item[]>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null; // Reset error on successful fetch
    },
    addItemsShow(
      state,
      action: PayloadAction<{ page: number; limit: number }>
    ) {
      const skip = (action.payload.page - 1) * action.payload.limit;
      state.ItemsShow = [
        ...state.ItemsShow,
        ...state.data.slice(skip, skip + action.payload.limit),
      ];
      state.currentPage = action.payload.page;
      state.totalPage = Math.ceil(state.data.length / action.payload.limit);
    },
    setItemsError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload; // Set error message
    },
    addItem(state, action) {
      // Add a new item to the array
      state.data.push(action.payload);
    },
    removeItem(state, action) {
      // Remove a item by its ID
      state.data = state.data.filter((cat) => cat.id !== action.payload);
    },
    updateItem(state, action) {
      // Update an existing item by its ID
      const index = state.data.findIndex((cat) => cat.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload; // Update the item
      }
    },
  },
});
export const {
  addItem,
  removeItem,
  updateItem,
  addItems,
  addItemsShow,
  setItemsError,
} = itemSlice.actions;
export default itemSlice.reducer;
