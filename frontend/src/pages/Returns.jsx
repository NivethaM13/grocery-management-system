import { useEffect, useState } from "react";

import API from "../services/api";

function Returns() {

  const [returns, setReturns] = useState([]);

  useEffect(() => {

    fetchReturns();

  }, []);

  const fetchReturns = async () => {

    try {

      const response = await API.get("/returns");

      setReturns(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const updateStatus = async (
    returnId,
    status
  ) => {

    try {

      await API.put(
        `/update-return-status/${returnId}?status=${status}`
      );

      alert(`Return ${status}`);

      fetchReturns();

    } catch (error) {

      console.log(error);

      alert("Failed to update status");

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Return Requests
      </h1>

      <div className="space-y-4">

        {returns.map((item) => (

          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-2xl font-bold text-green-600">
              Order ID: {item.order_id}
            </h2>

            <p className="mt-2">
              Reason: {item.reason}
            </p>

            <p className="mt-2 font-semibold">
              Status: {item.status}
            </p>

            <div className="flex gap-3 mt-4">

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "Approved"
                  )
                }
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "Rejected"
                  )
                }
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Reject
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Returns;