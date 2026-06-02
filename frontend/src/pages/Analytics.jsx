import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";


import { useEffect, useState } from "react";

import API from "../services/api";

function Analytics() {

  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      const productResponse =
        await API.get("/products");

      const orderResponse =
        await API.get("/orders");

      setProducts(productResponse.data);

      setOrders(orderResponse.data);

    } catch (error) {

      console.log(error);

    }
  };

  const totalRevenue = orders.reduce(

    (total, order) =>

      total + order.amount,

    0
  );

  const data = [

  {
    name: "Products",
    value: products.length
  },

  {
    name: "Orders",
    value: orders.length
  },

  {
    name: "Revenue",
    value: totalRevenue
  }

];

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Admin Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-white p-8 rounded-2xl shadow-md text-center">

          <h2 className="text-2xl font-bold mb-4">
            Total Products
          </h2>

          <p className="text-5xl font-bold text-green-600">
            {products.length}
          </p>

        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md text-center">

          <h2 className="text-2xl font-bold mb-4">
            Total Orders
          </h2>

          <p className="text-5xl font-bold text-blue-600">
            {orders.length}
          </p>

        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md text-center">

          <h2 className="text-2xl font-bold mb-4">
            Total Revenue
          </h2>

          <p className="text-5xl font-bold text-red-600">
            ₹{totalRevenue}
          </p>

        </div>

      </div>
      <div className="bg-white p-6 rounded-2xl shadow-lg mt-10">

  <ResponsiveContainer
    width="100%"
    height={400}
  >

    <BarChart data={data}>

      <XAxis dataKey="name" />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="value"
        fill="#16a34a"
      />

    </BarChart>

  </ResponsiveContainer>

</div>

    </div>
  );
}

export default Analytics;