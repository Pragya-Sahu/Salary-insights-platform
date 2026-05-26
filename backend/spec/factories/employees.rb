FactoryBot.define do
  factory :employee do
    full_name { "Pragya Sahu" }
    email { "pragya.sahu@example.com" }
    job_title { "Software Engineer" }
    country { "India" }
    salary { 75000 }
    department { "Engineering" }
    employment_type { "Full-time" }
    hired_at { Date.today }
  end
end