function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Salary Insights Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            HR analytics and employee salary management platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">
              Average Salary
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              ₹75,000
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">
              Total Employees
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              10,000
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">
              Highest Salary
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              ₹200,000
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">
              Lowest Salary
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              ₹40,000
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search employees..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />

            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>All Countries</option>
            </select>

            <select className="border border-gray-300 rounded-lg px-4 py-2">
              <option>All Job Titles</option>
            </select>

          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Country</th>
                <th className="text-left px-6 py-4">Job Title</th>
                <th className="text-left px-6 py-4">Department</th>
                <th className="text-left px-6 py-4">Salary</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b border-gray-100">
                <td className="px-6 py-4">Jane Smith</td>
                <td className="px-6 py-4">India</td>
                <td className="px-6 py-4">Software Engineer</td>
                <td className="px-6 py-4">Engineering</td>
                <td className="px-6 py-4">₹120,000</td>
              </tr>

              <tr className="border-b border-gray-100">
                <td className="px-6 py-4">John Doe</td>
                <td className="px-6 py-4">USA</td>
                <td className="px-6 py-4">Product Manager</td>
                <td className="px-6 py-4">Product</td>
                <td className="px-6 py-4">₹150,000</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </div>
  )
}

export default App