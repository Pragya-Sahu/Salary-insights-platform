departments = [
  'Engineering',
  'Product',
  'HR',
  'Finance',
  'Marketing'
]

job_titles = [
  'Software Engineer',
  'Senior Engineer',
  'Product Manager',
  'HR Manager',
  'Data Analyst'
]

countries = [
  'India',
  'USA',
  'Germany',
  'Canada'
]

employment_types = [
  'Full-time',
  'Contract'
]

10_000.times do
  Employee.create!(
    full_name: Faker::Name.name,
    email: Faker::Internet.unique.email,
    job_title: job_titles.sample,
    country: countries.sample,
    salary: rand(40_000..200_000),
    department: departments.sample,
    employment_type: employment_types.sample,
    hired_at: Faker::Date.backward(days: 1500)
  )
end

puts 'Seeded 10,000 employees successfully.'