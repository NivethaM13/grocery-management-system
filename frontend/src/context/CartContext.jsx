import {
  createContext,
  useState
} from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {

    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {

      const updatedCart = cartItems.map((item) =>

        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      setCartItems(updatedCart);

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);

    }
  };

  const increaseQuantity = (id) => {

    const updatedCart = cartItems.map((item) =>

      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    setCartItems(updatedCart);
  };

  const decreaseQuantity = (id) => {

    const updatedCart = cartItems
      .map((item) =>

        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
  };

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >

      {children}

    </CartContext.Provider>
  );
}

export default CartProvider;