import { useEffect, useState } from "react";
import { GetData } from "../context/DataContext";
import { FilterSection } from "../component/FilterSection";
import loadinggif from "../assets/loadingIcon.gif";
import { ProductCard } from "../component/ProductCard";
import { Pagination } from "../component/Pagination";
import MobileFilter from "../component/MobileFilter.jsx"
const Products = () => {
  const { data, fetchApiProducts } = GetData();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter,setOpenFilter] = useState(false)

  useEffect(() => {
    fetchApiProducts();
  }, []);

  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  const totalPages = Math.ceil(filteredData?.length / 8);

  return (
    <div className="w-full">
      <MobileFilter  search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            brand={brand}
            setBrand={setBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange} openFilter={openFilter} setOpenFilter={setOpenFilter}/>
      {data?.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">

          {/* FILTER SECTION */}
          <FilterSection
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            brand={brand}
            setBrand={setBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
            {filteredData
              ?.slice((page - 1) * 8, page * 8)
              .map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
          </div>

        </div>
      ) : (
        <div className="flex justify-center items-center h-80">
          <img src={loadinggif} className="w-20" alt="Loading" />
        </div>
      )}

      {/* PAGINATION */}
      {filteredData?.length > 8 && (
        <Pagination
          page={page}
          dynamicPage={totalPages}
          pageHandler={setPage}
        />
      )}
    </div>
  );
};

export default Products;
