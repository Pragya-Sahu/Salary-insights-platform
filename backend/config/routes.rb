Rails.application.routes.draw do
  resources :employees, only: [:create, :index] do
    collection do
      get :salary_insights
      get :grouped_by_department_salary_insights
    end
  end
end
