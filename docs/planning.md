# Goal
Building a lightweight salary management platform for HR managers.

# Key Concerns
- scalability for 10k employees
- fast salary aggregations
- maintainable codebase
- simple UI
- efficient performance

# Features
- employee CRUD
- salary insights dashboard
- filtering
- search
- salary analytics by country and job title

# Technical
- Rails API backend
- React frontend
- PostgreSQL
- RSpec
- batch seeding strategy for large datasets

## Performance
- added reusable query object for composable filtering
- optimized employee filtering with database indexes
- designed salary aggregation APIs for scalability