import { GetData } from "../context/DataContext";
export const FilterSection = ({
  search,
  setSearch,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  brand,
  setBrand,
}) => {
  const { getUniqueCategory, getUniqueBrands } = GetData();

  const handleCategoryChange = (item) => {
    setCategory(item);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  return (
    <div className="bg-gray-200 p-4 rounded-md h-max hidden md:block">
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />            
      {/* CATEGORY */}
      <h1 className="mt-4 font-bold">Category</h1>
      {getUniqueCategory?.map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="radio"
            checked={category === item}
            onChange={() => handleCategoryChange(item)}
          />
          <span className="uppercase">{item}</span>
        </div>
      ))}

      {/* BRAND */}
      <h1 className="mt-4 font-bold">Brand</h1>
      <select
        value={brand}
        onChange={handleBrandChange}
        className="w-full h-8 text-center font-bold uppercase"
      >
        <option value="All">All</option>
        {getUniqueBrands
          ?.filter(Boolean)
          .map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
      </select>

      {/* PRICE */}
      <div className="mt-4">
        <label>
          Price: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <input
          type="range"
          value={priceRange[1]}
          min="0"
          max="5000"
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
        }}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
      >
        Reset Filter
      </button>
    </div>
  );
};
