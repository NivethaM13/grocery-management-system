import { useState } from "react";
import API from "../services/api";

function Promotions() {

  const [formData, setFormData] = useState({
    title: "",
    discount: "",
    status: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/add-promotion",
        formData
      );

      alert(response.data.message);

    } catch (error) {

      console.log(error);

      alert("Failed");

    }
  };

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Promotions Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md"
      >

        <input
          type="text"
          name="title"
          placeholder="Promotion Title"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="discount"
          placeholder="Discount"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Promotion
        </button>

      </form>

    </div>
  );
}

export default Promotions;