import { useContext, useState } from "react";

import { CartContext } from "../context/CartContext";

import { Link } from "react-router-dom";

function Cart() {

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const [couponCode, setCouponCode] = useState("");

  const [couponDiscount, setCouponDiscount] = useState(0);

  const totalPrice = cartItems.reduce(

    (total, item) =>

      total + item.price * item.quantity,

    0
  );

  const discount =
    totalPrice >= 100
      ? totalPrice * 0.10
      : 0;

  const finalAmount =
    totalPrice - discount - couponDiscount;

  const applyCoupon = () => {

    if (couponCode === "NEWUSER10") {

      setCouponDiscount(
        totalPrice * 0.10
      );

    } else {

      alert("Invalid Coupon");
    }
  };

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

            <div className="mb-6">

              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) =>
                  setCouponCode(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

              <button
                onClick={applyCoupon}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-3"
              >
                Apply Coupon
              </button>

            </div>

            <div className="flex justify-between items-center">

              <h2 className="text-3xl font-bold">
                Total
              </h2>

              <div className="text-right">

                <p className="text-lg text-red-500">
                  Discount: ₹{discount}
                </p>

                <p className="text-lg text-blue-600">
                  Coupon Discount: ₹{couponDiscount}
                </p>

                <p className="text-3xl font-bold text-green-600">
                  ₹{finalAmount}
                </p>

              </div>

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