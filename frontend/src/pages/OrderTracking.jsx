import { useEffect, useState } from "react";
import API from "../services/api";

function OrderTracking() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const response = await API.get(
        "/orders"
      );

      setOrders(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        🚚 Order Tracking
      </h1>

      {orders.map((order) => (

        <div
          key={order.id}
          className="bg-white p-6 rounded-xl shadow-md mb-6"
        >

          <h2 className="text-xl font-bold">
            Order #{order.id}
          </h2>

          <p>
            Customer: {order.customer_name}
          </p>

          <p>
            Product: {order.product_name}
          </p>

          <p className="mt-3 font-bold text-blue-600">
            Status: {order.status}
          </p>

        </div>

      ))}

    </div>

  );
}

export default OrderTracking;