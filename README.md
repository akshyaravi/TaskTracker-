# Task Tracker

## Setup & Run Instructions

### 1. Database
Create a local MySQL database named `Taskdb`. Update `TaskTracker_Backend/src/main/resources/application.properties` with your local MySQL credentials.

### 2. Backend (Spring Boot API)
Navigate to `TaskTracker_Backend` and run the Spring Boot application:
```bash
./mvnw spring-boot:run
```
The API will be available on `http://localhost:8080`.

### 3. Frontend (React)
Navigate to `TaskTracker_frontend` and start the Vite development server:
```bash
npm install
npm run dev
```
The application will be available on `http://localhost:5173`.

---

## API Endpoints
- `GET /api/tasks` - List tasks (supports filtering by status/priority, sorting by due date, and pagination)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get task details
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
- `GET /api/projects` - List projects
- `POST /api/projects` - Create a project

---

## Design Notes

**Trade-offs:**
- Used a local MySQL setup instead of Docker Compose to keep local development setup simple for this initial phase.
- No authentication layer was implemented to allow for unhindered testing of the core CRUD features.

**What I would add for production:**
- JWT Authentication for secure API access.
- Dockerize the application (Dockerfile and docker-compose) for consistent environments.
- Add database indexes on `status` and `priority` to speed up filtering queries on large datasets.
- Implement a CI/CD pipeline (e.g., GitHub Actions) to run tests automatically.

---

## AI-Assistant Usage
During the development of this assignment, AI assistants (ChatGPT, Claude) were used to:
- Generate initial boilerplate for the Spring Boot application and Vite frontend.
- Structure the SQL schema and JPA entity relationships.
- Draft integration test templates.
- Write CSS/styling for the React components.
