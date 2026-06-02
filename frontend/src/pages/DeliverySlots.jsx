import { useEffect, useState } from "react";

import API from "../services/api";

function DeliverySlots() {

  const [slots, setSlots] = useState([]);

  useEffect(() => {

    fetchSlots();

  }, []);

  const fetchSlots = async () => {

    try {

      const response = await API.get(
        "/delivery-slots"
      );

      setSlots(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-10">
        Delivery Slots
      </h1>

      <div className="space-y-4">

        {slots.map((slot) => (

          <div
            key={slot.id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-2xl font-bold text-green-600">
              {slot.slot_name}
            </h2>

            <p>
              Start: {slot.start_time}
            </p>

            <p>
              End: {slot.end_time}
            </p>

            <p>
              Capacity: {slot.max_orders}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default DeliverySlots;