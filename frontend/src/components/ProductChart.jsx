import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ProductChart() {

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
    return <p>Loading Chart...</p>;
  }

  const data = {
    labels: [
      "Total Products",
      "In Stock",
      "Out Of Stock"
    ],
    datasets: [
      {
        label: "Products",
        data: [
          analytics.total_products,
          analytics.in_stock,
          analytics.out_of_stock
        ]
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      <h2 className="text-2xl font-bold mb-6">
        📊 Inventory Chart
      </h2>

      <Bar data={data} />

    </div>
  );
}

export default ProductChart;