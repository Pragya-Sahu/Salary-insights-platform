import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

function App() {
  const [salaryInsights, setSalaryInsights] = useState(null)
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [page, setPage] = useState(1)
  const [departmentInsights, setDepartmentInsights] = useState([])
  const [error, setError] = useState(null)

  const fetchEmployees = (
    searchTerm = '',
    selectedCountry = '',
    selectedJobTitle = '',
    currentPage = 1
  ) => {
    fetch(
      `http://localhost:3000/employees?page=${currentPage}&per_page=10&search=${searchTerm}&country=${selectedCountry}&job_title=${selectedJobTitle}`
    )
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => {
        console.error(error)
        setError('Failed to load dashboard data')
      })
  }

  useEffect(() => {
    fetch('http://localhost:3000/employees/salary_insights')
      .then((response) => response.json())
      .then((data) => setSalaryInsights(data))
      .catch((error) => {
        console.error(error)
        setError('Failed to load dashboard data')
      })

    fetchEmployees()

    fetch('http://localhost:3000/employees/grouped_by_department_salary_insights')
      .then((response) => response.json())
      .then((data) => setDepartmentInsights(data))
      .catch((error) => {
        console.error(error)
        setError('Failed to load dashboard data')
      })
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-xl">
          {error}
        </p>
      </div>
    )
  }

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(event) => {
                const value = event.target.value

                setSearch(value)

                fetchEmployees(
                  value,
                  country,
                  jobTitle,
                  1
                )
                setPage(1)
              }}
              className="border border-gray-300 rounded-lg px-4 py-3"
            />

            <select
              value={country}
              onChange={(event) => {
                const value = event.target.value

                setCountry(value)

                fetchEmployees(
                  search,
                  value,
                  jobTitle,
                  1
                )
                setPage(1)
              }}
              className="border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="">All Countries</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Germany">Germany</option>
              <option value="Canada">Canada</option>
            </select>

            <select
              value={jobTitle}
              onChange={(event) => {
                const value = event.target.value

                setJobTitle(value)

                fetchEmployees(
                  search,
                  country,
                  value,
                  1
                )
                setPage(1)
              }}
              className="border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="">All Job Titles</option>
              <option value="Software Engineer">
                Software Engineer
              </option>
              <option value="Senior Engineer">
                Senior Engineer
              </option>
              <option value="Product Manager">
                Product Manager
              </option>
              <option value="HR Manager">
                HR Manager
              </option>
              <option value="Data Analyst">
                Data Analyst
              </option>
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

        <div className="flex justify-end gap-4 mt-6">

          <button
            disabled={page === 1}
            onClick={() => {
              const newPage = page - 1

              setPage(newPage)

              fetchEmployees(
                search,
                country,
                jobTitle,
                newPage
              )
            }}
            className="bg-white border border-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() => {
              const newPage = page + 1

              setPage(newPage)

              fetchEmployees(
                search,
                country,
                jobTitle,
                newPage
              )
            }}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg"
          >
            Next
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Average Salary by Department
          </h2>

          <div className="h-96">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={departmentInsights}>

                <XAxis dataKey="department" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="average_salary"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>
    </div>
  )
}

export default App