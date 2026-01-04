import { LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const ProductCard = ({ item }) => {
const navigate = useNavigate()
const {addToCart} = useCart()  
  return (
    <div className="flex flex-col h-95.5 border border-gray-300 rounded-2xl p-3 hover:shadow-2xl transition cursor-pointer">

      
      
      {/* IMAGE */}
      <div className="h-48 w-full flex items-center justify-center overflow-hidden">
        <img
          src={item.images?.[0]}
          alt={item.title}
          className="h-full object-contain"
          onClick={()=>navigate(`/products/${item.id}`)}
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col grow mt-2">
        <h2 className="font-semibold text-lg capitalize line-clamp-2">
          {item.title}
        </h2>

        <p className="text-gray-600 text-sm capitalize mt-1">
          {item.category}
        </p>

        <span className="font-bold text-xl text-red-500 mt-2">
          ${item.price}
        </span>

        {/* BUTTON ALWAYS AT BOTTOM */}
        <div className="mt-auto">
          <button onClick={()=>addToCart(item)} className=" cursor-pointer bg-blue-500 w-full flex items-center justify-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            <LuShoppingCart size={22} />        
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
      
    </div>
  );
};
