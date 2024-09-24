
import React, { useState } from "react";
const Sidebar = ({
  onFilterChange,
}: {
  onFilterChange: (filters: { priceRange: number[]; rating: number }) => void;
}) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [rating, setRating] = useState<number>(0);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(",").map(Number);

    if (e.target.name === "inp1") {
      setPriceRange([value[0], priceRange[1]]);
      onFilterChange({ priceRange: [value[0], priceRange[1]], rating });
    }
    if (e.target.name === "inp2") {
      setPriceRange([priceRange[0], value[0]]);
      onFilterChange({ priceRange: [priceRange[0], value[0]], rating });
    }
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setRating(value);
    onFilterChange({ priceRange, rating: value });
  };

  return (
    <div className="fixed top-[13%] left-0 w-64 h-full bg-gray-100 p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="mb-6">
        <h3 className="font-semibold">Price Range</h3>
        <input
          type="range"
          name="inp1"
          min="0"
          max="100"
          value={priceRange[0]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <input
          type="range"
          name="inp2"
          min="0"
          max="100"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <p>
          ${priceRange[0]} - ${priceRange[1]}
        </p>
      </div>
      <div>
        <h3 className="font-semibold">Average Rating</h3>
        <select
          value={rating}
          onChange={handleRatingChange}
          className="w-full p-2 border rounded"
        >
          <option value="0">All Ratings</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
