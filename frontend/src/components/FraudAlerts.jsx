import { useEffect, useState } from "react";
import API from "../services/api";

function FraudAlerts() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {

    try {

      const response = await API.get(
        "/fraud-alerts"
      );

      setAlerts(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-white p-8 rounded-2xl shadow-md">

      <h2 className="text-3xl font-bold mb-6">
        🚨 Fraud Alerts
      </h2>

      {alerts.length === 0 ? (

        <p>
          No fraud alerts found
        </p>

      ) : (

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-4">
                Customer
              </th>

              <th className="text-left py-4">
                Amount
              </th>

              <th className="text-left py-4">
                Alert Type
              </th>

              <th className="text-left py-4">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {alerts.map((alert) => (

              <tr
                key={alert.id}
                className="border-b"
              >

                <td className="py-4">
                  {alert.customer_name}
                </td>

                <td>
                  ₹{alert.amount}
                </td>

                <td>
                  {alert.alert_type}
                </td>

                <td className="text-red-600 font-bold">
                  {alert.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );
}

export default FraudAlerts;