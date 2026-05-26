# Salary Insights Platform

A full-stack salary management and analytics platform built for HR teams to manage employees and analyze salary insights at scale.

## Tech Stack

### Backend
- Ruby on Rails API
- PostgreSQL
- RSpec

### Frontend
- React
- Vite
- TailwindCSS
- Recharts

---

## Features

### Employee Management
- Employee creation API
- Employee listing
- Search employees
- Filter by country
- Filter by job title
- Salary sorting
- Pagination support

### Salary Analytics
- Salary insights dashboard
- Average salary aggregation
- Department-wise salary analytics
- Interactive charts

### Scalability
- Tested with 10,000 seeded employees
- Database indexing for optimized querying
- Query object architecture for reusable filtering

---

## Backend Architecture Decisions

### Query Object Pattern

Employee filtering logic was extracted into a reusable query object to:
- keep controllers maintainable
- support composable filtering
- centralize query logic
- simplify future scalability

### Database Indexing

Indexes were added on:
- country
- job_title
- salary
- full_name

to improve filtering and aggregation performance.

### Pagination

Pagination was implemented to support scalable employee listing APIs for large datasets.

---

## Frontend Features

- Dynamic dashboard
- Real-time search
- Country and job title filtering
- Interactive analytics charts
- Pagination controls
- Backend API integration

---

## Running The Project

### Backend Setup

```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails s
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Running Tests

```bash
cd backend
bundle exec rspec
```

---

## Future Improvements

- Authentication
- Export salary reports
- Advanced analytics
- Role-based access
- Background job processing

---

## Screenshots

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
![alt text](image-5.png)