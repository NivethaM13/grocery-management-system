import { Link } from "react-router-dom";

const handleLogout = () => {

  localStorage.removeItem("token");

  window.location.href = "/login";
};

function Navbar() {

  return (

    <nav className="bg-green-600 text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Grocery Store
      </h1>

      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>

        <Link to="/cart">
          Cart
        </Link>

        <Link to="/orders">
          Orders
        </Link>

        <Link to="/wishlist">
          Wishlist
        </Link>

        <Link to="/analytics">
           Analytics
        </Link>

        <Link to="/order-history">
          Order History
        </Link>

        <Link to="/add-product">
          Add Product
        </Link>


        <Link to="/edit-product">
            Edit Product
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;