import { fetchCategories } from "../../utils/apis";
import { Category } from "@/types/category.interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DataState {
  data: Category[];
  categoriesShow:Category[]
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: [],
  categoriesShow:[],
  loading: true,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategories(state, action: PayloadAction<Category[]>) {
      state.data = action.payload;
      state.loading = false;
      state.error = null; // Reset error on successful fetch
    },
    setCategoriesError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload; // Set error message
    },
    addCategory(state, action) {
      // Add a new category to the array
      state.data.push(action.payload);
    },
    addCategoriesShow(state, action: PayloadAction<Category[]>) {
      state.categoriesShow = action.payload;
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
});
export const { addCategory, removeCategory, updateCategory,addCategories,setCategoriesError,addCategoriesShow } =
  categorySlice.actions;
export default categorySlice.reducer;
