class AddIndexesToEmployees < ActiveRecord::Migration[7.1]
  def change
    add_index :employees, :country
    add_index :employees, :job_title
    add_index :employees, :salary
    add_index :employees, :full_name
  end
end
