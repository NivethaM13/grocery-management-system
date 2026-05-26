import { useContext } from "react";

import { WishlistContext } from "../context/WishlistContext";

function Wishlist() {

  const {
    wishlistItems,
    removeFromWishlist,
  } = useContext(WishlistContext);

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Wishlist
      </h1>

      {wishlistItems.length === 0 ? (

        <p className="text-xl">
          Wishlist is empty
        </p>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {wishlistItems.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-4"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-xl"
              />

              <h2 className="text-2xl font-bold mt-4">
                {item.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {item.description}
              </p>

              <div className="flex justify-between items-center mt-4">

                <span className="text-2xl font-bold text-green-600">
                  ₹{item.price}
                </span>

                <button
                  onClick={() =>
                    removeFromWishlist(item.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Wishlist;