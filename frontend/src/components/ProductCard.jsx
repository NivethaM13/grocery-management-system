import { useContext } from "react";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

import toast from "react-hot-toast";
import API from "../services/api";

function ProductCard({
  id,
  image,
  name,
  price,
  description,
  rating,
  review,
  category,
  stock
}) {

  const { addToCart } =
    useContext(CartContext);

  const { addToWishlist } =
    useContext(WishlistContext);

  const product = {
    id,
    image,
    name,
    price,
    description,
    rating,
    review,
    category,
    stock
  };

  const handleDelete = async () => {

    try {

      await API.delete(
        `/delete-product/${id}`
      );

      toast.success("Product deleted");

      window.location.reload();

    } catch (error) {

      console.log(error);

      toast.error("Delete failed");

    }
  };

  return (

    <div className="bg-white dark:bg-gray-700 dark:text-white rounded-2xl shadow-md p-4 hover:shadow-xl transition">

      <img
        src={image}
        alt={name}
        className="w-full h-40 sm:h-48 object-cover rounded-xl"
      />

      <h2 className="text-xl font-bold mt-4">
        {name}
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mt-2">
        {description}
      </p>

      <p className="text-yellow-500 font-semibold mt-2">
        ⭐ {rating}
      </p>

      <p className="text-gray-500 dark:text-gray-400 italic mt-1">
        {review}
      </p>

      <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
        {category}
      </p>

      <p className="text-sm mt-2 font-semibold text-red-500">
        Stock: {stock || 0}
      </p>

      <div className="flex justify-between items-center mt-4">

        <span className="text-2xl font-bold text-green-600">
          ₹{price}
        </span>

      </div>

      <div className="flex gap-2 mt-4">

        <button
          onClick={() => addToCart(product)}
          disabled={stock <= 0}
          className={`px-4 py-2 rounded-lg w-full text-white ${
            stock <= 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {stock <= 0
            ? "Out Of Stock"
            : "Add To Cart"}
        </button>

        <button
          onClick={() => addToWishlist(product)}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
        >
          ❤️
        </button>

        {localStorage.getItem("is_admin") === "true" && (

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>

        )}

      </div>

    </div>

  );
}

export default ProductCard;