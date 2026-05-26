import { useState, useContext } from "react";

import API from "../services/api";

import { CartContext } from "../context/CartContext";

function Checkout() {

  const { cartItems } = useContext(CartContext);

  const [formData, setFormData] = useState({
    customer_name: "",
  });

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleOrder = async () => {

    try {

      for (const item of cartItems) {

        await API.post("/create-order", {

          customer_name: formData.customer_name,

          product_name: item.name,

          amount: item.price,

          status: "Pending",

        });

      }

      window.location.href = "/payment";

    } catch (error) {

      console.log(error);

      alert("Failed to place order");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Delivery Address */}
        <div className="bg-white p-8 rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold mb-6">
            Delivery Details
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              name="customer_name"
              placeholder="Enter Your Name"
              value={formData.customer_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />

          </div>

        </div>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          {cartItems.map((item) => (

            <div
              key={item.id}
              className="flex justify-between mb-4"
            >

              <p>{item.name}</p>

              <p>₹{item.price}</p>

            </div>

          ))}

          <hr className="my-4" />

          <div className="flex justify-between text-2xl font-bold">

            <p>Total</p>

            <p className="text-green-600">
              ₹{totalAmount}
            </p>

          </div>

          <button
            onClick={handleOrder}
            className="w-full bg-green-600 text-white py-4 rounded-xl mt-8 text-xl font-semibold hover:bg-green-700"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;