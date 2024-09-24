import { fetchItems } from "@/app/apis/fetchData";
import { Item } from "@/types/item.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DataState {
  data: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchDataAsync = createAsyncThunk("item/fetchItems", async () => {
  const { data } = await fetchItems();
  return data;
});
export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      });
  },
});
export const { addItem, removeItem, updateItem } = itemSlice.actions;
export default itemSlice.reducer;
