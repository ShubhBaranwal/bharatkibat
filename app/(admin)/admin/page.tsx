// app/(admin)/page.tsx

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total News */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">Total News</h2>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>

        {/* Total Categories */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">Categories</h2>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>

        {/* Total Users */}
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-3xl font-bold mt-2">540</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-10 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

        <ul className="space-y-3">
          <li className="text-gray-700">📝 New article added: “India News Today”</li>
          <li className="text-gray-700">📁 Category updated: “Technology”</li>
          <li className="text-gray-700">👤 New user registered</li>
        </ul>
      </div>
    </div>
  );
}
