import { useContext } from "react";

import { CartContext } from "../context/CartContext";

import { Link } from "react-router-dom";

function Cart() {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(

    (total, item) =>

      total + item.price * item.quantity,

    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (

        <p className="text-xl">
          Your cart is empty
        </p>

      ) : (

        <div className="space-y-6">

          {cartItems.map((item) => (

            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center"
            >

              <div className="flex items-center gap-6">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-xl"
                />

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    ₹{item.price}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  -
                </button>

                <span className="text-2xl font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  +
                </button>

              </div>

            </div>

          ))}

          <div className="bg-white p-6 rounded-2xl shadow-md mt-10">

            <div className="flex justify-between items-center">

              <h2 className="text-3xl font-bold">
                Total
              </h2>

              <p className="text-3xl font-bold text-green-600">
                ₹{totalPrice}
              </p>

            </div>

            <Link to="/checkout">

              <button className="w-full bg-green-600 text-white py-4 rounded-xl mt-8 text-xl font-semibold hover:bg-green-700">

                Proceed to Checkout

              </button>

            </Link>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;