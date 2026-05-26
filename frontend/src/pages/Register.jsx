import { useState } from "react";
import API from "../services/api";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post(
        "/register",
        formData
      );

      alert(response.data.message);

      console.log(response.data);

    } catch (error) {

      console.log(error);

      alert("Registration failed");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Register
        </h1>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >

          {/* Name */}
          <div>

            <label className="block mb-2 font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />

          </div>

          {/* Email */}
          <div>

            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />

          </div>

          {/* Password */}
          <div>

            <label className="block mb-2 font-semibold">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;