class EmployeeFilterQuery
  def initialize(relation = Employee.all, params = {})
		@relation = relation
		@params = params
	end

	def call
		filter_by_name
		filter_by_country
		filter_by_job_title
		filter_by_salary
		paginate

		@relation
	end

	private

	attr_reader :relation, :params

	def filter_by_name
		return unless params[:search].present?

		@relation = relation.where( 'LOWER(full_name) LIKE ?', "%#{params[:search].downcase}%" )
	end

	def filter_by_country
		return unless params[:country].present?

		@relation = relation.where(country: params[:country])
	end

	def filter_by_job_title
		return unless params[:job_title].present?

		@relation = relation.where(job_title: params[:job_title])
	end

	def filter_by_salary
		return unless params[:sort] == 'salary_desc'

		@relation = relation.order(salary: :desc)
	end

	def paginate
		page = params[:page].to_i
		per_page = params[:per_page].to_i

		return if page <= 0 || per_page <= 0

		offset_value = (page - 1) * per_page

		@relation = relation.offset(offset_value).limit(per_page)
	end
end