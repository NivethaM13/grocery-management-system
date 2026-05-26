import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import API from "../services/api";

function Home() {

  const [products, setProducts] = useState([]);

  const [allProducts, setAllProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await API.get("/products");

      setProducts(response.data);

      setAllProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const searchProducts = async (value) => {

    setSearch(value);

    try {

      if (value === "") {

        fetchProducts();

        return;
      }

      const response = await API.get(
        `/search-products?search=${value}`
      );

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const filterCategory = (value) => {

    setCategory(value);

    if (value === "") {

      setProducts(allProducts);

      return;
    }

    const filteredProducts =
      allProducts.filter(
        (product) =>
          product.category === value
      );

    setProducts(filteredProducts);
  };

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <div className="bg-green-600 text-white py-20 px-10 text-center">

        <h1 className="text-5xl font-bold mb-6">
          Fresh Groceries Delivered
        </h1>

        <p className="text-xl mb-8">
          Buy fresh vegetables, fruits, and daily essentials online.
        </p>

        <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
          Shop Now
        </button>

      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">

        <div className="bg-white p-6 rounded-xl shadow-md text-center">

          <h2 className="text-2xl font-bold mb-4">
            Fresh Products
          </h2>

          <p>
            High quality fresh groceries directly from farms.
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">

          <h2 className="text-2xl font-bold mb-4">
            Fast Delivery
          </h2>

          <p>
            Get your groceries delivered within minutes.
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">

          <h2 className="text-2xl font-bold mb-4">
            Best Prices
          </h2>

          <p>
            Affordable prices with exciting offers and discounts.
          </p>

        </div>

      </div>

      {/* Products Section */}
      <div className="p-10">

        <h1 className="text-4xl font-bold text-center mb-10">
          Popular Products
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              searchProducts(e.target.value)
            }
            className="w-full max-w-xl border border-gray-300 rounded-lg px-4 py-3"
          />

        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-10">

          <select
            value={category}
            onChange={(e) =>
              filterCategory(e.target.value)
            }
            className="border border-gray-300 rounded-lg px-4 py-3"
          >

            <option value="">
              All Categories
            </option>

            <option value="Fruits">
              Fruits
            </option>

            <option value="Vegetables">
              Vegetables
            </option>

            <option value="Soft Drinks">
              Soft Drinks
            </option>

            <option value="Dairy">
              Dairy
            </option>

            <option value="Bakery">
              Bakery
            </option>

          </select>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              description={product.description}
              rating={product.rating}
              review={product.review}
              category={product.category}
            />

          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;