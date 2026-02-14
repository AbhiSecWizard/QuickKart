import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {

  /* 🔹 CHANGE 1:
     Cart ko DIRECT localStorage se initialize kar rahe hain
     ➜ App reload hone par cart empty nahi hoga
     ➜ React state hi source of truth rahega
  */
  const [cartItem, setCartItem] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  /* 🔹 CHANGE 2:
     Jab bhi cartItem change ho
     ➜ automatically localStorage update ho
     ➜ manually kahin localStorage likhne ki zarurat nahi
  */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  /* 🔹 CHANGE 3:
     Derived state (calculated values)
     ➜ alag state nahi banayi (best practice)
  */
  const cartItemTotalAmntCalc = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartTotalItems = cartItem.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /* 🔹 CHANGE 4:
     addToCart me direct cartItem use
     ➜ localStorage yahan bilkul use nahi
     ➜ React re-render instant hota hai
  */
  const addToCart = (product) => {
    const itemExists = cartItem.find(item => item.id === product.id);

    if (itemExists) {
      setCartItem(
        cartItem.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success("Product quantity increased!");
    } else {
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product added to cart!");
    }
  };

  /* 🔹 CHANGE 5:
     updateQuantity simplified
     ➜ prev state use kiya (safe & industry standard)
     ➜ quantity 0 hui to item auto remove
  */
  const updateQuantity = (productId, action) => {
    setCartItem(prev =>
      prev
        .map(item => {
          if (item.id !== productId) return item;

          let qty =
            action === "increase"
              ? item.quantity + 1
              : item.quantity - 1;

          return qty > 0 ? { ...item, quantity: qty } : null;
        })
        .filter(Boolean) // null items remove
    );
  };

  /* 🔹 CHANGE 6:
     Simple delete
     ➜ state change = UI update + localStorage auto sync
  */
  const deleteItem = (productId) => {
    setCartItem(cartItem.filter(item => item.id !== productId));
    toast.success("Product removed from cart!");
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        cartTotalItems,
        cartItemTotalAmntCalc,
        addToCart,
        updateQuantity,
        deleteItem,
        setCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
