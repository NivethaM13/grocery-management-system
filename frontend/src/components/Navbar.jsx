import { Link, useNavigate } from "react-router-dom";

const handleLogout = () => {

  localStorage.removeItem("token");

  window.location.href = "/login";
};

function Navbar() {

  const navigate = useNavigate();

  return (

    <nav className="bg-green-600 text-white px-8 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Grocery Store
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">

        <button
          onClick={() => navigate(-1)}
          className="bg-white text-green-600 px-3 py-1 rounded-lg"
        >
          Back
        </button>

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

        <Link to="/suppliers">
            Suppliers
        </Link>

        <Link to="/promotions">
           Promotions
        </Link>

        <Link to="/coupons">
           Coupons
        </Link>

        <Link to="/rewards">
            Rewards
        </Link>

         <Link to="/returns">
           Returns
         </Link>

         <Link to="/delivery-slots">
             Delivery Slots
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