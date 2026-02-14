import { useCart } from "../context/CartContext";
import emptyCartVedio from "../assets/empty.mp4";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuNotebook } from "react-icons/lu";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { FaBagShopping } from "react-icons/fa6";
import { useUser } from "@clerk/clerk-react";
import jsPDF from "jspdf";

  
const Cart = ({ location }) => {
  const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

  const navigate = useNavigate();
  const { cartItem, cartItemTotalAmntCalc, updateQuantity, deleteItem } =
  useCart();
  function handleInput(e){
    if(Number(e) && e.length==10){
     return e.cuurent.value
    }
  }
  const { user } = useUser();
const handleCheckout = async () => {
  const doc = new jsPDF();

  // 🔹 HEADER
  doc.setFontSize(22);
  doc.text("INVOICE", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.text("Thank you for shopping with us", 105, 27, {
    align: "center",
  });

  // 🔹 LINE
  doc.line(20, 32, 190, 32);

  // 🔹 USER DETAILS
  doc.setFontSize(12);
  doc.text(`Name: ${user?.fullName}`, 20, 45);

  doc.text(
    `Address: ${location?.suburb || ""}, ${location?.city || ""}, ${
      location?.country || ""
    }
    `,
    20,
    61
  );

  // 🔹 TABLE HEADER
  let y = 80;
  doc.setFontSize(12);
  doc.text("Item", 20, y);
  doc.text("Qty", 120, y);
  doc.text("Price", 150, y);

  doc.line(20, y + 2, 190, y + 2);

  // 🔹 CART ITEMS (with Image)
  y += 10;

  for (let i = 0; i < cartItem.length; i++) {
    const item = cartItem[i];

    // Convert image to base64
    const imgBase64 = await toDataURL(item.images?.[0]);

    // Add image to PDF
    doc.addImage(imgBase64, "JPEG", 20, y - 5, 20, 20);

    doc.text(`${i + 1}. ${item.title}`, 45, y);
    doc.text(`${item.quantity}`, 125, y);
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 150, y);

    y += 25; // image height space
  }

  // 🔹 TOTAL SECTION
  y += 5;
  doc.line(20, y, 190, y);
  y += 10;

  doc.text(`Items Total:`, 120, y);
  doc.text(`$${cartItemTotalAmntCalc.toFixed(2)}`, 150, y);

  y += 8;
  doc.text(`Handling:`, 120, y);
  doc.text(`$5.00`, 150, y);

  y += 10;
  doc.setFontSize(14);
  doc.text(`Grand Total:`, 120, y);
  doc.text(
    `$${(cartItemTotalAmntCalc + 5).toFixed(2)}`,
    150,
    y
  );

  // 🔹 FOOTER
  y += 20;
  doc.setFontSize(10);
  doc.text(
    "This is a system generated invoice.",
    105,
    y,
    { align: "center" }
  );

  // 🔹 DOWNLOAD PDF
  doc.save(`Invoice-${user?.fullName}.pdf`);
};

  return (
    <div className="min-h-screen bg-gray-50 px-3 md:px-6 py-6">
      {cartItem.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>

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
                    className="w-24 h-24 object-contain"
                  />
                  <div>
                    <p className="text-gray-600">{item.title}</p>
                    <p className="text-xl font-semibold">${item.price}</p>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-2 my-3 md:my-0">
                  <button
                    onClick={() => updateQuantity(item.id, "decrease")}
                    className="cursor-pointer w-8 h-8 bg-blue-400 hover:bg-blue-600 text-white rounded"
                  >
                    −
                  </button>

                  <span className="w-8 h-8 flex items-center justify-center bg-blue-400 text-white rounded">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, "increase")}
                    className="cursor-pointer w-8 h-8 bg-blue-400 hover:bg-blue-600 text-white rounded"
                  >
                    +
                  </button>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => deleteItem(item.id)}
                  className="cursor-pointer text-red-500 hover:text-red-700"
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
                value={user?.fullName || "Customer"}
                placeholder="Full Name"

                className="w-full p-3 border rounded outline-none"
              />

              <input
                value={`${location?.suburb || "urbann area"}, ${location?.city || "delhi"}, ${location?.postcode || "Indea"}`}
                placeholder="Address"
     
                className="w-full p-3 border rounded outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  value={location?.city || "Delhi"}
                  placeholder="City"
                  className="p-3 border rounded outline-none"
                  
                />
                <input
                  value={location?.country || "India"}
                  placeholder="Country"
                  className="p-3 border rounded outline-none"
                  
                />
              </div>

              <input
                placeholder="Phone Number"
                type="tel"
                onChange={(e)=>handleInput(e.target.value)}
                className="w-full p-3 border rounded outline-none"
              />

              <button className="w-full bg-blue-400 hover:bg-blue-600 text-white py-3 rounded">
                Submit
              </button>
            </div>

            {/* BILL DETAILS */}
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-xl font-semibold">Bill Details</h2>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-600">
                  <LuNotebook /> Items Total
                </span>
                <span>${cartItemTotalAmntCalc.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2 text-gray-600">
                  <MdOutlineDeliveryDining /> Delivery
                </span>
                <span className="text-green-500">FREE</span>
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
                <span>${(cartItemTotalAmntCalc + 5).toFixed(2)}</span>
              </div>
              <button className="w-full bg-blue-400 hover:bg-blue-600 text-white py-3 rounded" onClick={handleCheckout}>
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
