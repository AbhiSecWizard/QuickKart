import { LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // 🔹 cart logic context se aa raha hai

  return (
    <div className="flex  bg-white flex-col h-95.5 rounded-xl p-3 hover:shadow-2xl">

      {/* 🔹 Product detail page navigation */}
      <div className="h-[300px] flex justify-center">
        <img
          src={item.images?.[0]}
          alt={item.title}
          className="h-[200px] object-contain cursor-pointer"
          onClick={() => navigate(`/products/${item.id}`)}
        />
      </div>

      <div className="flex flex-col grow mt-2">
        <h2 className="font-semibold line-clamp-2">{item.title}</h2>
        <p className="text-gray-600 text-sm">{item.category}</p>
        <span className="font-bold text-xl text-red-500">${item.price}</span>

        {/* 🔹 Add to cart sirf state update karta hai
            ➜ localStorage automatically background me handle hota hai */}
        <button
          onClick={() => addToCart(item)}
          className="cursor-pointer w-full bg-black flex items-center justify-center gap-3 text-white py-2 rounded hover:bg-gray-800 transition"
        >
          <LuShoppingCart size={22} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
