import { FaFilter } from "react-icons/fa";
import { GetData } from "../context/DataContext";

const MobileFilter = ({
  openFilter,
  setOpenFilter,
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
}) => {
  const { getUniqueCategory, getUniqueBrands } = GetData();


  return (
    <>
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <FaFilter
          size={22}
          className="cursor-pointer"
          onClick={() => setOpenFilter(true)}
        />
      </div>

      {/* OVERLAY */}
      {openFilter && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpenFilter(false)}
        />
      )}

      {/* DRAWER */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-[80%] bg-white
        transition-transform duration-300 ease-in-out
        ${openFilter ? "translate-x-0" : "-translate-x-full"}
        md:hidden shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h3 className="text-xl font-bold">Filter Products</h3>
          <button
            onClick={() => setOpenFilter(false)}
            className="text-sm text-gray-500"
          >
            Close
          </button>
        </div>

        {/* CONTENT */}
        <div className="h-[calc(100vh-72px)] overflow-y-auto px-4 py-4 space-y-6">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-2 rounded-md"
          />

          {/* CATEGORY */}
          <div>
            <h4 className="font-semibold mb-2">Category</h4>
            {getUniqueCategory.map((item, index) => (
              <label key={index} className="flex items-center gap-2 mb-1">
                <input
                  type="radio"
                  name="category"
                  value={item}
                  checked={category === item}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <span className="uppercase text-sm">{item}</span>
              </label>
            ))}
          </div>

          {/* BRAND */}
          <div>
            <h4 className="font-semibold mb-2">Brand</h4>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border p-2 rounded-md uppercase"
            >
              <option value="All">All</option>
              {getUniqueBrands
                .filter(Boolean)
                .map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>

          {/* PRICE */}
          <div>
            <h4 className="font-semibold mb-2">
              Price: ₹{priceRange[0]} – ₹{priceRange[1]}
            </h4>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-full"
            />
          </div>

          {/* RESET */}
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setBrand("All");
              setPriceRange([0, 5000]);
              setOpenFilter(false);
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
          >
            Reset Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileFilter;
