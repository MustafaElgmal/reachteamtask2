import Header from "../components/Header";
import Main from "../components/Main";
import { useAppSelector } from "../redux/app/hookes";
import {
  addCategories,
  addCategoriesShow,
  setCategoriesError,
} from "../redux/features/category";
import { fetchCategories } from "@/utils/apis";
import { Category } from "@/types/category.interface";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home({
  initialCategories,
  error,
}: {
  initialCategories: Category[];
  error: string;
}) {
  const {loading } = useAppSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      dispatch(setCategoriesError(error));
    } else {
      dispatch(addCategories(initialCategories));
      dispatch(
        addCategoriesShow(
          initialCategories.filter((cat) => [48, 7, 9].includes(cat.id))
        )
      );
    }
  }, [dispatch, initialCategories, error]);

  if (loading)
    return (
      <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
        <div className="flex items-center">
          <span className="text-3xl mr-4">Loading</span>
          <svg
            className="animate-spin h-8 w-8 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const { data } = await fetchCategories(); // Fetch categories from your API
    // const data = [
    //   { name: "Sony", id: 7 },
    //   { name: "Samsung", id: 9 },
    //   { name: "Apple", id: 48 },
    // ];

    return {
      props: { initialCategories: data }, // No initial state passed
    };
  } catch (error) {
    console.error("Error fetching categories:", error); // Log the error for debugging
    return {
      props: {
        initialCategories: [],
        error:
          error instanceof Error ? error.message : "Failed to fetch categories",
      }, // No initial state passed
    };
  }
};
