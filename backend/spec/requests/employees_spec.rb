require 'rails_helper'

RSpec.describe 'Employees API', type: :request do
  describe 'POST /employees' do
    let(:valid_params) do
      {
        employee: {
          full_name: 'Abhi G',
          email: 'abhi.g@example.com',
          job_title: 'Product Manager',
          country: 'India',
          salary: 95000,
          department: 'Product',
          employment_type: 'Full-time',
          hired_at: '2024-06-15'
        }
      }
    end

    it 'creates a new employee' do
      expect {
        post '/employees', params: valid_params
      }.to change(Employee, :count).by(1)

      expect(response).to have_http_status(:created)
    end

    it 'returns errors when employee creation fails' do
      invalid_params = {
        employee: {
          full_name: '',
          email: '',
          salary: -1000
        }
      }

      post '/employees', params: invalid_params

      expect(response).to have_http_status(:unprocessable_entity)

      response_body = JSON.parse(response.body)

      expect(response_body['errors']).to include("Full name can't be blank")
    end
  end

  describe 'GET /employees' do
    context 'without filters' do
      let!(:employees) { create_list(:employee, 3) }

      it 'returns all employees' do
        get '/employees'

        expect(response).to have_http_status(:ok)

        response_body = JSON.parse(response.body)

        expect(response_body.length).to eq(3)
      end
    end

    context 'with search filter' do
      before do
        create(:employee, full_name: 'Jane Smith')
        create(:employee, full_name: 'John Doe')
      end

      it 'filters employees by full name' do
        get '/employees', params: { search: 'Jane' }

        response_body = JSON.parse(response.body)

        expect(response_body.length).to eq(1)
        expect(response_body.first['full_name']).to eq('Jane Smith')
      end
    end

    context 'with country filter' do
      before do
        create(:employee, country: 'India')
        create(:employee, country: 'USA')
      end
      it 'filters employees by country' do
        get '/employees', params: { country: 'India' }

        response_body = JSON.parse(response.body)

        expect(response_body.length).to eq(1)
        expect(response_body.first['country']).to eq('India')
      end
    end

    context 'with job filter' do
      before do
        create(:employee, job_title: 'Product Manager')
        create(:employee, job_title: 'Software Engineer')
      end
      it 'filters employees by job title' do
        get '/employees', params: { job_title: 'Product Manager' }

        response_body = JSON.parse(response.body)

        expect(response_body.length).to eq(1)
        expect(response_body.first['job_title']).to eq('Product Manager')
      end
    end

    context 'with salary sorting' do
      before do
        create(:employee, full_name: 'Priya', salary: 50000)
        create(:employee, full_name: 'Lailli', salary: 90000)
      end

      it 'sorts employees by descending salary' do
        get '/employees', params: { sort: 'salary_desc' }

        response_body = JSON.parse(response.body)

        expect(response_body.first['salary'].to_i).to eq(90000)
      end
    end

    context 'with pagination' do
      before do
        create_list(:employee, 30)
      end

      it 'returns paginated employees' do
        get '/employees', params: { page: 1, per_page: 10 }

        response_body = JSON.parse(response.body)

        expect(response_body.length).to eq(10)
      end
    end
  end

  describe 'GET /employees/salary_insights' do
    context 'without filters' do
      before do
        create(:employee, salary: 50000)
        create(:employee, salary: 100000)
      end

      it 'returns salary stats' do
        get '/employees/salary_insights'

        expect(response).to have_http_status(:ok)

        response_body = JSON.parse(response.body)

        expect(response_body['average_salary']).to eq(75000.0)
        expect(response_body['minimum_salary']).to eq('50000.0')
        expect(response_body['maximum_salary']).to eq('100000.0')
        expect(response_body['total_employees']).to eq(2)
      end
    end

    context 'with country and job title filter' do
      before do
        create(
          :employee,
          country: 'India',
          job_title: 'Software Engineer',
          salary: 80000
        )

        create(
          :employee,
          country: 'India',
          job_title: 'Software Engineer',
          salary: 120000
        )

        create(
          :employee,
          country: 'India',
          job_title: 'Product Manager',
          salary: 200000
        )

        create(
          :employee,
          country: 'USA',
          job_title: 'Software Engineer',
          salary: 300000
        )
      end

      it 'returns filtered salary insights by country and job title' do
        get '/employees/salary_insights',
            params: {
              country: 'India',
              job_title: 'Software Engineer'
            }

        response_body = JSON.parse(response.body)

        expect(response_body['average_salary']).to eq(100000.0)
        expect(response_body['total_employees']).to eq(2)
      end
    end
  end

  describe 'GET /employees/grouped_by_department_salary_insights' do
    before do
      create(:employee, department: 'Engineering', salary: 100000)
      create(:employee, department: 'Engineering', salary: 200000)

      create(:employee, department: 'Product', salary: 150000)
    end

    it 'returns grouped salary insights by department' do
      get '/employees/grouped_by_department_salary_insights'

      expect(response).to have_http_status(:ok)

      response_body = JSON.parse(response.body)

      engineering_data = response_body.find do |department|
        department['department'] == 'Engineering'
      end

      expect(engineering_data['average_salary']).to eq(150000.0)
      expect(engineering_data['employee_count']).to eq(2)
    end
  end
end