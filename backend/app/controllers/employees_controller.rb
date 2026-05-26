class EmployeesController < ApplicationController
	def create
		employee = Employee.new(employee_params)

		if employee.save
			render json: employee, status: :created
		else
			render json: { errors: employee.errors.full_messages },
							status: :unprocessable_entity
		end
	end

	def index
		employees = EmployeeFilterQuery.new(Employee.all, params).call

		render json: employees, status: :ok
	end

	def salary_insights
		employees = EmployeeFilterQuery.new(Employee.all, params).call

		render json: {
			average_salary: employees.average(:salary).to_f,
			minimum_salary: employees.minimum(:salary),
			maximum_salary: employees.maximum(:salary),
			total_employees: employees.count
		}, status: :ok
	end

	def grouped_by_department_salary_insights
		insights = Employee
			.group(:department)
			.select(
				:department,
				'AVG(salary) AS average_salary',
				'COUNT(*) AS employee_count'
			)

		render json: insights.map { |insight|
			{
				department: insight.department,
				average_salary: insight.average_salary.to_f,
				employee_count: insight.employee_count
			}
		}, status: :ok
	end

	private

	def employee_params
	params.require(:employee).permit(
		:full_name,
		:email,
		:job_title,
		:country,
		:salary,
		:department,
		:employment_type,
		:hired_at
	)
	end
end
