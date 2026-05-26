function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white p-6">

        <h1 className="text-3xl font-bold mb-10">
          Admin Panel
        </h1>

        <ul className="space-y-6 text-lg">

          <li className="hover:text-gray-200 cursor-pointer">
            Dashboard
          </li>

          <li className="hover:text-gray-200 cursor-pointer">
            Products
          </li>

          <li className="hover:text-gray-200 cursor-pointer">
            Orders
          </li>

          <li className="hover:text-gray-200 cursor-pointer">
            Users
          </li>

          <li className="hover:text-gray-200 cursor-pointer">
            Inventory
          </li>

        </ul>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-10">
          Dashboard Overview
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold">
              Total Orders
            </h2>

            <p className="text-4xl text-green-600 mt-4">
              120
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold">
              Total Products
            </h2>

            <p className="text-4xl text-green-600 mt-4">
              85
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold">
              Revenue
            </h2>

            <p className="text-4xl text-green-600 mt-4">
              ₹50,000
            </p>
          </div>

        </div>

        {/* Recent Orders */}
        <div className="bg-white p-8 rounded-2xl shadow-md">

          <h2 className="text-3xl font-bold mb-6">
            Recent Orders
          </h2>

          <table className="w-full">

            <thead>
              <tr className="border-b">

                <th className="text-left py-4">Order ID</th>

                <th className="text-left py-4">Customer</th>

                <th className="text-left py-4">Amount</th>

                <th className="text-left py-4">Status</th>

              </tr>
            </thead>

            <tbody>

              <tr className="border-b">

                <td className="py-4">#1001</td>

                <td>John</td>

                <td>₹1200</td>

                <td className="text-green-600 font-bold">
                  Delivered
                </td>

              </tr>

              <tr className="border-b">

                <td className="py-4">#1002</td>

                <td>Priya</td>

                <td>₹850</td>

                <td className="text-yellow-500 font-bold">
                  Pending
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;