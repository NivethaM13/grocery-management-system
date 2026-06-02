import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { Toaster } from "react-hot-toast";

import "./index.css";

import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

    <WishlistProvider>

      <CartProvider>

        <Toaster />

        <App />

      </CartProvider>

    </WishlistProvider>
);