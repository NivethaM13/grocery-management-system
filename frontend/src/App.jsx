import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Analytics from "./pages/Analytics";

import EditProduct from "./pages/EditProduct";

import Payment from "./pages/Payment";

import Wishlist from "./pages/Wishlist";
import Success from "./pages/Success";

import OrderHistory from "./pages/OrderHistory";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AddProduct from "./pages/AddProduct";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

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
          path="/order-history"
          element={<OrderHistory />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
            path="/edit-product"
             element={<EditProduct />}
         />

        <Route
          path="/orders"
          element={<Orders />}
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
          path="/add-product"
          element={<AddProduct />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;