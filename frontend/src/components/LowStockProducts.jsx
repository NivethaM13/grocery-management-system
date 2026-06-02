import { useEffect, useState } from "react";
import API from "../services/api";

function LowStockProducts() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  const fetchLowStockProducts = async () => {

    try {

      const response = await API.get(
        "/low-stock-products"
      );

      console.log("Low Stock Data:", response.data);

      setProducts(response.data);

    } catch (error) {

      console.log("Low Stock Error:", error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        Loading low stock products...
      </div>
    );
  }

  return (

    <div className="bg-white p-6 rounded-xl shadow-md">

      <h2 className="text-2xl font-bold text-red-600 mb-6">
        ⚠ Low Stock Products
      </h2>

      {products.length > 0 ? (

        products.map((product) => (

          <div
            key={product.id}
            className="flex justify-between border-b py-3"
          >

            <span className="font-medium">
              {product.name}
            </span>

            <span className="text-red-600 font-bold">
              Stock: {product.stock}
            </span>

          </div>

        ))

      ) : (

        <p>No low stock products</p>

      )}

    </div>

  );
}

export default LowStockProducts;