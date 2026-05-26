import { useEffect, useState } from 'react'

function App() {
  const [salaryInsights, setSalaryInsights] = useState(null)
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState('')

  const fetchEmployees = (searchTerm = '') => {
    fetch(
      `http://localhost:3000/employees?page=1&per_page=10&search=${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    fetch('http://localhost:3000/employees/salary_insights')
      .then((response) => response.json())
      .then((data) => setSalaryInsights(data))
      .catch((error) => console.error(error))

    fetchEmployees()
  }, [])

  if (!salaryInsights) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">
          Loading dashboard...
        </p>
      </div>
    )
  }

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
              ₹{Math.round(salaryInsights.average_salary)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">
              Total Employees
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              {salaryInsights.total_employees}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">
              Highest Salary
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              ₹{salaryInsights.maximum_salary}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-2">
              Lowest Salary
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              ₹{salaryInsights.minimum_salary}
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">

          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(event) => {
              const value = event.target.value

              setSearch(value)
              fetchEmployees(value)
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />

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

              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-gray-100"
                >
                  <td className="px-6 py-4">
                    {employee.full_name}
                  </td>

                  <td className="px-6 py-4">
                    {employee.country}
                  </td>

                  <td className="px-6 py-4">
                    {employee.job_title}
                  </td>

                  <td className="px-6 py-4">
                    {employee.department}
                  </td>

                  <td className="px-6 py-4">
                    ₹{employee.salary}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  )
}

export default App