import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

import Loader from "../components/Loader";

import API from "../services/api";


import RecommendedProducts from "../components/RecommendedProducts";


function Home() {

  const [products, setProducts] = useState([]);

  const [allProducts, setAllProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [sortOrder, setSortOrder] = useState("");

  const [loading, setLoading] = useState(true);

  const [maxPrice, setMaxPrice] = useState("");

  const [minRating, setMinRating] = useState("");

  

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const response = await API.get("/products");

      setProducts(response.data);

      setAllProducts(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

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

  const filterPrice = (value) => {

  setMaxPrice(value);

  if (value === "") {

    setProducts(allProducts);

    return;
  }

  const filteredProducts = allProducts.filter(
    (product) => product.price <= Number(value)
  );

  setProducts(filteredProducts);
};

const filterRating = (value) => {

  setMinRating(value);

  if (value === "") {

    setProducts(allProducts);

    return;
  }

  const filteredProducts = allProducts.filter(
    (product) => product.rating >= Number(value)
  );

  setProducts(filteredProducts);
};


const sortProducts = (value) => {

  setSortOrder(value);

  let sortedProducts = [...products];

  if (value === "low-high") {

    sortedProducts.sort(
      (a, b) => a.price - b.price
    );

  } else if (value === "high-low") {

    sortedProducts.sort(
      (a, b) => b.price - a.price
    );

  }

  setProducts(sortedProducts);
};

  if (loading) {

    return <Loader />;
  }

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">

      {/* Hero Section */}
      <div className="bg-green-600 text-white py-20 px-6 md:px-10 text-center">

        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Fresh Groceries Delivered
        </h1>

        <p className="text-base md:text-xl mb-8">
          Buy fresh vegetables, fruits, and daily essentials online.
        </p>

        <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200">
          Shop Now
        </button>

      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-10">

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">

          <h2 className="text-2xl font-bold mb-4">
            Fresh Products
          </h2>

          <p>
            High quality fresh groceries directly from farms.
          </p>

        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">

          <h2 className="text-2xl font-bold mb-4">
            Fast Delivery
          </h2>

          <p>
            Get your groceries delivered within minutes.
          </p>

        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">

          <h2 className="text-2xl font-bold mb-4">
            Best Prices
          </h2>

          <p>
            Affordable prices with exciting offers and discounts.
          </p>

        </div>

      </div>

      {/* Products Section */}
      <div className="p-6 md:p-10">

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
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
            className="w-full max-w-xl border border-gray-300 rounded-lg px-4 py-3 bg-white text-black"
          />

        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-10">


        <select
            value={sortOrder}
            onChange={(e) =>
    sortProducts(e.target.value)
  }
  className="border border-gray-300 rounded-lg px-4 py-3 ml-4 bg-white text-black"
>
  <option value="">
    Sort By
  </option>

  <option value="low-high">
    Price: Low to High
  </option>

  <option value="high-low">
    Price: High to Low
  </option>
</select>
          <select
            value={category}
            onChange={(e) =>
              filterCategory(e.target.value)
            }
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-black"
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

          <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
               onChange={(e) =>
    filterPrice(e.target.value)
      }
  className="border border-gray-300 rounded-lg px-4 py-3 ml-4 bg-white text-black"
            />
          <input
                type="number"
                placeholder="Min Rating"
                value={minRating}
                 onChange={(e) =>
                 filterRating(e.target.value)
                   }
  className="border border-gray-300 rounded-lg px-4 py-3 ml-4 bg-white text-black"
/>

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
              stock={product.stock}
            />

          ))}

          

        </div>
        

        <RecommendedProducts />

      </div>

    </div>
  );
}

export default Home;