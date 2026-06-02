import { useEffect, useState } from "react";
import API from "../services/api";

function RecommendedProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await API.get(
        "/popular-products"
      );

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="mt-16">

      <h2 className="text-3xl font-bold text-center mb-8">
        Recommended Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-4"
          >

            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded-lg"
            />

            <h3 className="font-bold text-lg mt-3 text-black">
              {product.name}
            </h3>

            <p className="text-green-600 font-semibold mt-2">
              ₹{product.price}
            </p>

            <p className="text-yellow-500 mt-1">
              ⭐ {product.rating}
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default RecommendedProducts;