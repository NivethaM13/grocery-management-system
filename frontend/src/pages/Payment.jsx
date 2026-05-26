import { useState } from "react";

function Payment() {

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const handlePayment = () => {

    if (!paymentMethod) {

      alert("Select payment method");

      return;
    }

    alert(
      window.location.href = "/success"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">

        <h1 className="text-4xl font-bold text-center text-green-600 mb-10">
          Payment
        </h1>

        <div className="space-y-6">

          <div
            className={`border p-5 rounded-xl cursor-pointer ${
              paymentMethod === "UPI"
                ? "border-green-600 bg-green-50"
                : ""
            }`}
            onClick={() =>
              setPaymentMethod("UPI")
            }
          >

            <h2 className="text-2xl font-bold">
              UPI Payment
            </h2>

            <p className="text-gray-600 mt-2">
              Pay using Google Pay, PhonePe, Paytm
            </p>

          </div>

          <div
            className={`border p-5 rounded-xl cursor-pointer ${
              paymentMethod === "Card"
                ? "border-green-600 bg-green-50"
                : ""
            }`}
            onClick={() =>
              setPaymentMethod("Card")
            }
          >

            <h2 className="text-2xl font-bold">
              Debit / Credit Card
            </h2>

            <p className="text-gray-600 mt-2">
              Visa, Mastercard, Rupay accepted
            </p>

          </div>

          <div
            className={`border p-5 rounded-xl cursor-pointer ${
              paymentMethod === "COD"
                ? "border-green-600 bg-green-50"
                : ""
            }`}
            onClick={() =>
              setPaymentMethod("COD")
            }
          >

            <h2 className="text-2xl font-bold">
              Cash on Delivery
            </h2>

            <p className="text-gray-600 mt-2">
              Pay after delivery
            </p>

          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-green-600 text-white py-4 rounded-xl text-xl font-semibold hover:bg-green-700"
          >

            Proceed Payment

          </button>

        </div>

      </div>

    </div>
  );
}

export default Payment;