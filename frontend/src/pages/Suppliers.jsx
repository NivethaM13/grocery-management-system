import { useState } from "react";
import API from "../services/api";

function Suppliers() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
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
        "/add-supplier",
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
        Supplier Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md"
      >

        <input
          type="text"
          name="name"
          placeholder="Supplier Name"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Supplier
        </button>

      </form>

    </div>
  );
}

export default Suppliers;