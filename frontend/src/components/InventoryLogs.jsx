import { useEffect, useState } from "react";
import API from "../services/api";

function InventoryLogs() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {

    try {

      const response = await API.get(
        "/inventory-logs"
      );

      setLogs(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-white p-8 rounded-2xl shadow-md">

      <h2 className="text-3xl font-bold mb-6">
        📦 Inventory Logs
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-4">
              Product
            </th>

            <th className="text-left py-4">
              Old Stock
            </th>

            <th className="text-left py-4">
              New Stock
            </th>

          </tr>

        </thead>

        <tbody>

          {logs.map((log) => (

            <tr
              key={log.id}
              className="border-b"
            >

              <td className="py-4">
                {log.product_name}
              </td>

              <td>
                {log.old_stock}
              </td>

              <td>
                {log.new_stock}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default InventoryLogs;