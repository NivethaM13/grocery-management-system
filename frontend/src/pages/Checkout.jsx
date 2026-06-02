import { useState, useContext } from "react";
import API from "../services/api";
import { CartContext } from "../context/CartContext";

function Checkout() {

  const { cartItems } = useContext(CartContext);

  const [formData, setFormData] = useState({
    customer_name: "",
    delivery_slot: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  const applyCoupon = async () => {

    try {

      const response = await API.post(
        `/apply-coupon/${couponCode}`,
        null,
        {
          params: {
            order_amount: totalAmount
          }
        }
      );

      setDiscount(response.data.discount || 0);
      setFinalAmount(response.data.final_amount || totalAmount);

      alert("Coupon Applied Successfully");

    } catch (error) {

      console.log(error);
      alert("Invalid Coupon");

    }
  };

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
          email: "nivethamahalingam123@gmail.com",
          delivery_slot: formData.delivery_slot,
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

            <select
              name="delivery_slot"
              value={formData.delivery_slot}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="">
                Select Delivery Slot
              </option>

              <option value="Morning">
                Morning (09:00 AM - 12:00 PM)
              </option>

              <option value="Afternoon">
                Afternoon (12:00 PM - 04:00 PM)
              </option>

              <option value="Evening">
                Evening (04:00 PM - 08:00 PM)
              </option>

            </select>

          </div>

        </div>

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

          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-4"
          />

          <button
            onClick={applyCoupon}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-3"
          >
            Apply Coupon
          </button>

          <hr className="my-4" />

          <div className="flex justify-between">
            <p>Total Amount</p>
            <p>₹{totalAmount}</p>
          </div>

          <div className="flex justify-between text-red-500 mt-2">
            <p>Discount</p>
            <p>₹{discount}</p>
          </div>

          <div className="flex justify-between text-2xl font-bold mt-4">
            <p>Final Amount</p>
            <p className="text-green-600">
              ₹{finalAmount || totalAmount}
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