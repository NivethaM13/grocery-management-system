import {
  createContext,
  useState
} from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {

  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {

    const existingItem = wishlistItems.find(
      (item) => item.id === product.id
    );

    if (!existingItem) {

      setWishlistItems([
        ...wishlistItems,
        product
      ]);
    }
  };

  const removeFromWishlist = (id) => {

    const updatedWishlist =
      wishlistItems.filter(
        (item) => item.id !== id
      );

    setWishlistItems(updatedWishlist);
  };

  return (

    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >

      {children}

    </WishlistContext.Provider>
  );
}

export default WishlistProvider;