import { useState } from "react";
import API from "../services/api";

function Login() {

  const [formData, setFormData] = useState({
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
        "/login",
        formData
      );

      alert(response.data.message);

         localStorage.setItem(
         "token",
         response.data.access_token
         );

      console.log(response.data);

    } catch (error) {

      console.log(error);

      alert("Login failed");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Login
        </h1>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >

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
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;