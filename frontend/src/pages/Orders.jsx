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

              </div>

              <div className="text-right">

                <p className="text-2xl font-bold text-green-600">
                  ₹{order.amount}
                </p>

                <p className="mt-2 font-semibold text-blue-600">
                  {order.status}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Orders;
