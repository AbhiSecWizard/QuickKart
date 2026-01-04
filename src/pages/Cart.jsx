import React from "react";
import { useCart } from "../context/CartContext";
import emptyCartVedio from "../assets/empty.mp4";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuNotebook } from "react-icons/lu";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { useUser } from "@clerk/clerk-react";

const Cart = ({ location }) => {
  const navigate = useNavigate();
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 px-3 md:px-6 py-6">
      {cartItem.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">
            My Cart ({cartItem.length})
          </h1>

          {/* CART ITEMS */}
          <div className="space-y-4 max-w-6xl mx-auto">
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm"
              >
                {/* PRODUCT */}
                <div className="flex items-center gap-4 w-full md:w-1/2">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-24 h-24 object-contain rounded"
                  />
                  <div>
                    <p className="text-gray-600">{item.title}</p>
                    <p className="text-xl font-semibold">${item.price}</p>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-2 my-3 md:my-0">
                  <button
                    onClick={() =>
                      updateQuantity(cartItem, item.id, "decrease")
                    }
                    className="w-8 h-8 bg-blue-400 hover:bg-blue-600 text-white rounded"
                  >
                    −
                  </button>
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-400 text-white rounded">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(cartItem, item.id, "increase")
                    }
                    className="w-8 h-8 bg-blue-400 hover:bg-blue-600 text-white rounded"
                  >
                    +
                  </button>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <RiDeleteBin6Line size={24} />
                </button>
              </div>
            ))}
          </div>

          {/* DELIVERY + BILL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-8">
            {/* DELIVERY INFO */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-xl font-semibold">Delivery Info</h2>

              <input
                value={user?.fullName || ""}
                placeholder="Full Name"
                className="w-full p-3 border rounded outline-none"
              />

              <input
                value={`${location?.road || ""}, ${location?.city || ""}`}
                placeholder="Address"
                className="w-full p-3 border rounded outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  value={location?.city || ""}
                  placeholder="State"
                  className="p-3 border rounded outline-none"
                />
                <input
                  value={location?.country || ""}
                  placeholder="Country"
                  className="p-3 border rounded outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  value={location?.postcode || ""}
                  placeholder="Pincode"
                  className="p-3 border rounded outline-none"
                />
                <input
                  placeholder="Phone Number"
                  className="p-3 border rounded outline-none"
                />
              </div>

              <button className="w-full bg-blue-400 hover:bg-blue-600 text-white py-3 rounded">
                Submit
              </button>

              <button className="w-full bg-blue-400 hover:bg-blue-600 text-white py-3 rounded">
                Detect Location
              </button>
            </div>

            {/* BILL DETAILS */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-xl font-semibold">Bill Details</h2>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-600">
                  <LuNotebook /> Items Total
                </span>
                <span>$1234</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-600">
                  <MdOutlineDeliveryDining /> Delivery
                </span>
                <span className="text-red-500">FREE</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-600">
                  <FaBagShopping /> Handling
                </span>
                <span>$5</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span>$1967</span>
              </div>

              <div className="flex gap-2">
                <input
                  placeholder="Promo Code"
                  className="w-full p-2 border rounded outline-none"
                />
                <button className="bg-blue-400 hover:bg-blue-600 text-white px-4 rounded">
                  Apply
                </button>
              </div>

              <button className="w-full bg-blue-400 hover:bg-blue-600 text-white py-3 rounded">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        /* EMPTY CART */
        <div className="flex flex-col items-center justify-center h-screen">
          <video
            src={emptyCartVedio}
            autoPlay
            loop
            muted
            className="w-72 h-72 rounded-full"
          />
          <h1 className="text-3xl font-bold mt-6 uppercase">
            Your Cart Is Empty
          </h1>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-blue-400 hover:bg-blue-600 px-6 py-3 rounded text-white"
          >
            Shop Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
