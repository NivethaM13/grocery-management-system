import { useState } from "react";

import API from "../services/api";

import toast from "react-hot-toast";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const handleReset = async () => {

    try {

      const response = await API.put(
        "/forgot-password",
        {
          email,
          new_password: newPassword
        }
      );

      toast.success(response.data.message);

    } catch (error) {

      toast.error("Reset failed");

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        />

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6"
        />

        <button
          onClick={handleReset}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Reset Password
        </button>

      </div>

    </div>
  );
}

export default ForgotPassword;