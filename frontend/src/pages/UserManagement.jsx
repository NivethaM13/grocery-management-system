import { useEffect, useState } from "react";
import API from "../services/api";

function UserManagement() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const response = await API.get(
        "/users"
      );

      setUsers(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        👥 User Management
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-4">
                ID
              </th>

              <th className="text-left py-4">
                Name
              </th>

              <th className="text-left py-4">
                Email
              </th>

              <th className="text-left py-4">
                Role
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b"
              >

                <td className="py-4">
                  {user.id}
                </td>

                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.is_admin
                    ? "Admin"
                    : "User"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default UserManagement;