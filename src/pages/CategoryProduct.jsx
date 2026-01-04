import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CategoryProduct = () => {
  const navigate = useNavigate()
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getFilterData = async () => {
      try {
          setLoading(true);
          const api = await axios.get(
              `https://dummyjson.com/products/category/${category}`
            );
            setProducts(api.data.products);
        } catch (err) {
            setError("Failed to load products");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    const {addToCart} = useCart()

  useEffect(() => {
    if (category) {
      getFilterData();
    }
  }, [category]);

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Loading products...</p>
      </div>
    );
  }

  // ❌ Error UI
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Category Title */}
        <h1 className="text-3xl font-bold uppercase mb-8">
          {category}
        </h1>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition"
              >
                {/* Image */}
                <div className="h-48 flex items-center justify-center p-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    onClick={()=>navigate(`/products/${item.id}`)}
                    className="h-full object-contain cursor-pointer"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="font-semibold text-lg truncate">
                    {item.title}
                  </h2>

                  <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {item.description}
                  </p>

                  {/* Price + Rating */}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-green-600">
                      ${item.price}
                    </span>

                    <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      ⭐ {item.rating}
                    </span>
                  </div>

                  {/* Button */}
                  <button onClick={()=>addToCart(item)} className=" cursor-pointer w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No products found in this category
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
