import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Coupons from "./pages/Coupons";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

import UserManagement from "./pages/UserManagement";

import Suppliers from "./pages/Suppliers";

import Rewards from "./pages/Rewards";
import Returns from "./pages/Returns";
import DeliverySlots from "./pages/DeliverySlots";

import Analytics from "./pages/Analytics";

import EditProduct from "./pages/EditProduct";

import { useState } from "react";

import Payment from "./pages/Payment";

import Wishlist from "./pages/Wishlist";

import Success from "./pages/Success";

import OrderHistory from "./pages/OrderHistory";

import OrderTracking from "./pages/OrderTracking";

import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Cart from "./pages/Cart";

import Checkout from "./pages/Checkout";

import Orders from "./pages/Orders";

import AddProduct from "./pages/AddProduct";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import Promotions from "./pages/Promotions";

function App() {

  const [darkMode, setDarkMode] =
    useState(false);

  return (

    <div className={
      darkMode
        ? "dark bg-gray-900 text-white"
        : "bg-white text-black"
    }>

      <BrowserRouter>

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/coupons"
            element={<Coupons />}
            />

          <Route
             path="/admin"
             element={
        <AdminRoute>
        <AdminDashboard />
        </AdminRoute>
           }
          />

          <Route
              path="/users"
              element={
          <AdminRoute>
          <UserManagement />
          </AdminRoute>
             }
            />

          <Route
            path="/order-history"
            element={<OrderHistory />}
          />
          
          <Route  
             path="/order-tracking"
             element={<OrderTracking />}
          />


          <Route
            path="/returns"
            element={<Returns />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />
          

          <Route
               path="/edit-product"
               element={
          <AdminRoute>
       <EditProduct />
    </AdminRoute>
       }
       />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
             path="/rewards"
             element={<Rewards />}
          />

          <Route
            path="/payment"
            element={<Payment />}
          />

          <Route
            path="/success"
            element={<Success />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
             path="/delivery-slots"
             element={<DeliverySlots />}
          />

          <Route
            path="/suppliers"
            element={<Suppliers />}
          />

          <Route
             path="/promotions"
            element={<Promotions />}
          />

          <Route
              path="/add-product"
              element={
         <AdminRoute>
         <AddProduct />
         </AdminRoute>
            }
         />


        </Routes>

        <Footer />

      </BrowserRouter>

    </div>
  );
}

export default App;