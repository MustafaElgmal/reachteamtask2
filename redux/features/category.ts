import { fetchCategories } from "@/app/apis/fetchData";
import { Category } from "@/types/category.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DataState {
  data: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchDataAsync = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const { data } = await fetchCategories();
    return data;
  }
);
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory(state, action) {
      // Add a new category to the array
      state.data.push(action.payload);
    },
    removeCategory(state, action) {
      // Remove a category by its ID
      state.data = state.data.filter((cat) => cat.id !== action.payload);
    },
    updateCategory(state, action) {
      // Update an existing category by its ID
      const index = state.data.findIndex((cat) => cat.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload; // Update the category
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
export const { addCategory, removeCategory, updateCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
