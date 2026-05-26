class CreateEmployees < ActiveRecord::Migration[7.1]
  def change
    create_table :employees do |t|
      t.string :full_name
      t.string :email
      t.string :job_title
      t.string :country
      t.decimal :salary
      t.string :department
      t.string :employment_type
      t.date :hired_at

      t.timestamps
    end
  end
end
