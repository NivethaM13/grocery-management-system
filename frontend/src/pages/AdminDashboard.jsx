import { useEffect, useState } from "react";
import API from "../services/api";
import Notifications from "../components/Notifications";


import LowStockProducts from "../components/LowStockProducts";
import ProductAnalytics from "../components/ProductAnalytics";
import ProductChart from "../components/ProductChart";
import FraudAlerts from "../components/FraudAlerts";

import InventoryLogs from "../components/InventoryLogs";

function AdminDashboard() {

  const [revenueData, setRevenueData] = useState({
    total_orders: 0,
    total_revenue: 0,
  });

  const [orderStats, setOrderStats] = useState({
    delivered: 0,
    pending: 0,
    cancelled: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const [productCount, setProductCount] = useState(0);

  const [userCount, setUserCount] = useState(0);

  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
  fetchRevenue();
  fetchOrderStats();
  fetchRecentOrders();
  fetchProductCount();
  fetchTopProducts();
  fetchUserCount();
}, []);


  

  const fetchRevenue = async () => {

    try {

      const response = await API.get(
        "/revenue-analytics"
      );

      setRevenueData(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchOrderStats = async () => {

    try {

      const response = await API.get(
        "/order-statistics"
      );

      setOrderStats(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchRecentOrders = async () => {

    try {

      const response = await API.get(
        "/recent-orders"
      );

      setRecentOrders(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchProductCount = async () => {

    try {

      const response = await API.get(
        "/product-count"
      );

      setProductCount(
        response.data.total_products
      );

    } catch (error) {

      console.log(error);

    }

  };
  const fetchTopProducts = async () => {

  try {

    const response = await API.get(
      "/top-products"
    );

    setTopProducts(response.data);

  } catch (error) {

    console.log(error);

  }

};

const fetchUserCount = async () => {

  try {

    const response = await API.get(
      "/user-count"
    );

    setUserCount(
      response.data.total_users
    );

  } catch (error) {

    console.log(error);

  }

};


  
return (

    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white p-6">

        <h1 className="text-3xl font-bold mb-10">
          Admin Panel
        </h1>

        <ul className="space-y-6 text-lg">

          <li>Dashboard</li>
          <li>Products</li>
          <li>Orders</li>
          <li>Users</li>
          <li>Inventory</li>

        </ul>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-10">
          Dashboard Overview
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          <div className="bg-white p-8 rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold">
              Total Orders
            </h2>

            <p className="text-4xl text-green-600 mt-4">
              {revenueData.total_orders}
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold">
              Total Products
            </h2>

            <p className="text-4xl text-green-600 mt-4">
              {productCount}
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold">
              Revenue
            </h2>



            <p className="text-4xl text-green-600 mt-4">
              ₹{revenueData.total_revenue}
            </p>

          </div>
          <div className="bg-white p-8 rounded-2xl shadow-md">

                     <h2 className="text-2xl font-bold">
                     Total Users
                  </h2>

  <p className="text-4xl text-green-600 mt-4">
    {userCount}
  </p>

</div>

        </div>

    <LowStockProducts />

        <div className="h-8"></div>

        <ProductAnalytics />

        <div className="h-8"></div>

    <ProductChart />

<Notifications />

        <div className="h-8"></div>

<InventoryLogs />

        <div className="h-8"></div>

<FraudAlerts />

         <div className="h-8"></div>

         <div className="bg-white p-8 rounded-2xl shadow-md">

  <h2 className="text-3xl font-bold mb-6">
    🏆 Top Selling Products
  </h2>

  <table className="w-full">

    <thead>

      <tr className="border-b">

        <th className="text-left py-4">
          Product
        </th>

        <th className="text-left py-4">
          Orders
        </th>

      </tr>

    </thead>

    <tbody>

      {topProducts.map((product, index) => (

        <tr
          key={index}
          className="border-b"
        >

          <td className="py-4">
            {product.product}
          </td>

          <td>
            {product.orders}
          </td>

        </tr>

      ))}

        </tbody>

        </table>

        </div>

             <div className="h-8"></div>

        {/* Order Statistics */}
        <div className="bg-white p-8 rounded-2xl shadow-md">

          <h2 className="text-3xl font-bold mb-6">
            📦 Order Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-green-100 p-4 rounded-lg">

              <h3 className="font-bold">
                Delivered
              </h3>

              <p className="text-3xl">
                {orderStats.delivered}
              </p>

            </div>

            <div className="bg-yellow-100 p-4 rounded-lg">

              <h3 className="font-bold">
                Pending
              </h3>

              <p className="text-3xl">
                {orderStats.pending}
              </p>

            </div>

            <div className="bg-red-100 p-4 rounded-lg">

              <h3 className="font-bold">
                Cancelled
              </h3>

              <p className="text-3xl">
                {orderStats.cancelled}
              </p>

            </div>

          </div>

        </div>

        <div className="h-8"></div>

        {/* Recent Orders */}
        <div className="bg-white p-8 rounded-2xl shadow-md">

          <h2 className="text-3xl font-bold mb-6">
            Recent Orders
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Order ID
                </th>

                <th className="text-left py-4">
                  Customer
                </th>

                <th className="text-left py-4">
                  Amount
                </th>

                <th className="text-left py-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b"
                >

                  <td className="py-4">
                    #{order.id}
                  </td>

                  <td>
                    {order.customer_name}
                  </td>

                  <td>
                    ₹{order.amount}
                  </td>

                  <td
                    className={
                      order.status === "Delivered"
                        ? "text-green-600 font-bold"
                        : order.status === "Pending"
                        ? "text-yellow-500 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {order.status}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;