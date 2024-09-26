import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import { fetchCategories, fetchItems } from "../../../utils/apis";
import { Item } from "../../../types/item.interface";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/app/hookes";
import {
  addItems,
  addItemsShow,
  setItemsError,
} from "../../../redux/features/item";
import { Category } from "../../../types/category.interface";
import {
  addCategories,
  addCategoriesShow,
} from "../../../redux/features/category";

interface Context {
  params: {
    id: number;
  };
}

export default function CategoryDetail({
  initialItems,
  initialCategories,
  error,
}: {
  initialItems: Item[];
  initialCategories: Category[];
  error: string;
}) {
  const [filters, setFilters] = useState<{
    priceRange: number[];
    rating: number;
  }>({
    priceRange: [0, 100],
    rating: 0,
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const { loading, ItemsShow } = useAppSelector(
    (state) => state.item
  );
  const [loadingScrol, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleFilterChange = (newFilters: {
    priceRange: number[];
    rating: number;
  }) => {
    setFilters(newFilters);
    console.log(filters)
    // Implement your filtering logic here, e.g., fetching filtered data
  };
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollHeight - scrollTop === clientHeight && !loading) {
        setLoading(true);
        setTimeout(() => {
          setPage(page + 1);
          dispatch(addItemsShow({page, limit}));
          setLoading(false);
        }, 1000); // Simulated loading time (1 second)
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, loadingScrol]);

  useEffect(() => {
    if (error) {
      dispatch(setItemsError(error));
    } else {
      dispatch(addItems(initialItems));
      dispatch(addCategories(initialCategories));
      dispatch(
        addCategoriesShow(
          initialCategories.filter((cat) => [48, 7, 9].includes(cat.id))
        )
      );
      dispatch(addItemsShow({ page, limit }));
    }
  }, [dispatch, initialItems, error]);

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
      <div className="flex">
        <Sidebar onFilterChange={handleFilterChange} />
        <main className="ml-64 p-4">
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <div className="md:flex md:items-center md:justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Trending products
                </h2>
                <a className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
                  Shop the collection
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
                {ItemsShow.map((product) => (
                  <div key={product.id} className="group relative mt-2">
                    <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                      <img
                        alt={`${product.brand_name}`}
                        src={product.image_url}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      <span className="absolute inset-0" />
                      {product.phone_name}
                    </h3>
                    <h3 className="mt-4 text-sm text-gray-700">
                      <span className="absolute inset-0" />
                      {product.description}
                    </h3>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-sm md:hidden">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Shop the collection
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          </div>
          {/* Render your filtered items here */}
        </main>
      </div>
      <div id="spinner" style={{ display: loadingScrol ? "block" : "none" }}>
        Loading...
      </div>
    </div>
  );
}

export async function getServerSideProps(context: Context) {
  const { id } = context.params;
  console.log(id);
  try {
    const { data } = await fetchItems(id);
    const response = await fetchCategories();
    return {
      props: { initialItems: data, initialCategories: response.data }, // No initial state passed
    };
  } catch (error) {
    console.error("Error fetching Items:", error); // Log the error for debugging
    return {
      props: {
        initialItems: [],
        error: error instanceof Error ? error.message : "Failed to fetch Items",
      }, // No initial state passed
    };
  }
}
