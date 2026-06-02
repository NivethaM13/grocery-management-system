import { useEffect, useState } from "react";
import API from "../services/api";

function ProductAnalytics() {

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const response = await API.get(
        "/product-analytics"
      );

      setAnalytics(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  if (!analytics) {

    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        Loading Analytics...
      </div>
    );
  }

  return (

    <div className="bg-white p-6 rounded-xl shadow-md">

      <h2 className="text-2xl font-bold mb-6">
        📊 Product Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-bold">
            Total Products
          </h3>

          <p className="text-3xl">
            {analytics.total_products}
          </p>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-bold">
            In Stock
          </h3>

          <p className="text-3xl">
            {analytics.in_stock}
          </p>
        </div>

        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="font-bold">
            Out Of Stock
          </h3>

          <p className="text-3xl">
            {analytics.out_of_stock}
          </p>
        </div>

      </div>

    </div>

  );
}

export default ProductAnalytics;