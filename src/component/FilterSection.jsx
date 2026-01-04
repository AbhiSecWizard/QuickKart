import { GetData } from "../context/DataContext";
export const FilterSection = ({
  handleBrandChange,
  handleCategoryChange,
  search,
  setSearch,
  priceRange,
  setPriceRange,
  setBrand,
  category,
  setCategory,
}) => {
  const { getUniqueCategory, getUniqueBrands } = GetData();

  // console.log(search);
  // console.log("this is range", priceRange);
  return (
    <div className="bg-gray-200 p-4 rounded-md h-max hidden">
      <input
        type="text"
        placeholder="Search...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2"
      />
      {/* category only data */}
      <div className="font-bold text-sm text-gray-500">
        <h1>Category</h1>
        {getUniqueCategory?.map((item, index) => {
          return (
            <div key={index} className="flex gap-1">
              <input
                type="checkbox"
                name={item}
                checked={category == item}
                value={item}
                onChange={handleCategoryChange}
              />
              <button className="uppercase cursor-pointer">{item}</button>
            </div>
          );
        })}
        <h1>Brand</h1>
        <select
          className="w-full h-8 text-center font-bold uppercase"
          onChange={handleBrandChange}
        >
          {getUniqueBrands
            ?.filter(
              (item) => item !== undefined && item !== null && item !== ""
            )
            .map((item, index) => (
              <option key={index} value={item} className="">
                {item}
              </option>
            ))}
        </select>
        <div className="mt-5">
          <h1> Price Range</h1>
          <div className="mt-5">
            <label htmlFor="">
              Price Range : ${priceRange[0]}- ${priceRange[1]}
            </label>
            <input
              type="range"
              name=""
              id=""
              value={priceRange[1]}
              className="w-full"
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
          </div>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setBrand("All");
              setPriceRange([0, 5000]);
            }}
            className="mt-3 bg-blue-500  hover:bg-blue-600  font-bold text-lg text-center px-4 py-1.5 text-white cursor-pointer rounded-sm"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
};
