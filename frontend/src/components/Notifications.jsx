import { useEffect, useState } from "react";
import API from "../services/api";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {

    try {

      const response = await API.get(
        "/notifications"
      );

      setNotifications(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-white p-8 rounded-2xl shadow-md">

      <h2 className="text-3xl font-bold mb-6">
        🔔 Notifications
      </h2>

      {notifications.length === 0 ? (

        <p>No Notifications</p>

      ) : (

        <div className="space-y-4">

          {notifications.map((item, index) => (

            <div
              key={index}
              className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded"
            >

              <p className="font-bold">
                {item.type}
              </p>

              <p>
                {item.message}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}

export default Notifications;