function Checkout() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Delivery Address */}
        <div className="bg-white p-8 rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold mb-6">
            Delivery Address
          </h2>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />

            <textarea
              placeholder="Address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
              rows="4"
            ></textarea>

          </form>

        </div>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">
            <p>Fresh Apples</p>
            <p>₹240</p>
          </div>

          <div className="flex justify-between mb-4">
            <p>Delivery Charge</p>
            <p>₹40</p>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-2xl font-bold">
            <p>Total</p>
            <p className="text-green-600">₹280</p>
          </div>

          <button className="w-full bg-green-600 text-white py-4 rounded-xl mt-8 text-xl font-semibold hover:bg-green-700">
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;