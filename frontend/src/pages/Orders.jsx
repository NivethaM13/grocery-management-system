import { useEffect, useState } from "react";

import API from "../services/api";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const response = await API.get("/orders");

      setOrders(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const cancelOrder = async (orderId) => {

    try {

      await API.put(
        `/cancel-order/${orderId}`
      );

      alert("Order Cancelled");

      fetchOrders();

    } catch (error) {

      console.log(error);

      alert("Failed to cancel order");

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Orders Dashboard
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="bg-white p-6 rounded-2xl shadow-md"
          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold">
                  {order.product_name}
                </h2>

                <p className="text-gray-600 mt-2">
                  Customer: {order.customer_name}
                </p>

                <p className="text-gray-600">
                    Delivery Slot: {order.delivery_slot}
               </p>

              </div>

              <div className="text-right">

                <p className="text-2xl font-bold text-green-600">
                  ₹{order.amount}
                </p>

                <p className="mt-2 font-semibold text-blue-600">
                  {order.status}
                </p>

                <a
                  href={`http://127.0.0.1:8000/invoice/${order.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Download Invoice
                </a>

                <button
                  onClick={() =>
                    cancelOrder(order.id)
                  }
                  className="block mt-3 bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel Order
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Orders;