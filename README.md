# Task Tracker API & Frontend

A full-stack Task Management application featuring a Spring Boot REST API and a React (Vite) frontend. This project implements a relational database schema (Projects and Tasks) and allows users to perform full CRUD operations on tasks.

## 🌍 Live Demo
- **Frontend (Vercel):** [Insert your Vercel URL here]
- **Backend API (Render):** [https://tasktracker-backend-27wh.onrender.com](https://tasktracker-backend-27wh.onrender.com)
- **Swagger Documentation:** [https://tasktracker-backend-27wh.onrender.com/swagger-ui.html](https://tasktracker-backend-27wh.onrender.com/swagger-ui.html)
- **Database (Railway):** MySQL hosted on Railway

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Java 21+**
- **Maven**
- **Node.js 18+**
- **MySQL 8.0+**

### 1. Database Setup
1. Ensure MySQL is running locally on port 3306.
2. Create a database named `Taskdb`:
   ```sql
   CREATE DATABASE Taskdb;
   ```
3. Update the database credentials in `TaskTracker_Backend/TaskTracker_Backend/src/main/resources/application.properties` to match your local MySQL username and password.

### 2. Running the Backend (Spring Boot)
1. Navigate to the backend directory:
   ```bash
   cd TaskTracker_Backend/TaskTracker_Backend
   ```
2. Run the application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend will start on `http://localhost:8080`. The database tables will be created automatically on startup.*

### 3. Running the Frontend (React + Vite)
1. Navigate to the frontend directory:
   ```bash
   cd TaskTracker_frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:5173`.*

---

## 📡 API Endpoints

The API is fully documented using Swagger/OpenAPI. Once the backend is running, you can access the Swagger UI at `/swagger-ui.html`.

### Tasks
- `GET /api/tasks` - Get all tasks (supports pagination and filtering by status/priority, sorted by due date)
- `GET /api/tasks/{id}` - Get a specific task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update an existing task
- `DELETE /api/tasks/{id}` - Delete a task

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project

*All endpoints return standard HTTP status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found) with meaningful error messages.*

---

## 🏗️ Design Notes & Trade-offs

### Architecture
- **Backend:** Built with Spring Boot using a layered architecture (Controller, Service, Repository). Uses Spring Data JPA for data access and Hibernate for ORM. Validation is handled via `spring-boot-starter-validation` at the DTO layer.
- **Frontend:** Built using React and Vite for fast development. Uses `axios` for API calls and `react-router-dom` for routing. The UI is designed to surface API validation errors clearly to the user.

### Trade-offs Made
- **Local MySQL vs Docker:** Currently requires a local MySQL installation for local development. A full local `docker-compose.yml` would simplify setup but was omitted for simplicity in local development, though a `Dockerfile` was added for Render deployment.
- **Security:** No authentication (JWT) is implemented. The API is currently open for testing purposes.

### Future Improvements for Production
- **Authentication & Authorization:** Implement JWT-based auth with Spring Security.
- **Caching:** Add Redis caching for frequently accessed data. (Note: Database indexes on `status` and `due_date` have already been implemented).
- **CI/CD:** Add GitHub Actions to automatically build and run the integration tests on every push.

---

## 🤖 AI Assistant Usage

During the development of this project, AI assistants (such as ChatGPT and Claude) were utilized for:
- Structuring the initial boilerplate for the Spring Boot application and Vite frontend.
- Generating SQL schema designs and JPA entity relationships.
- Drafting integration test templates.
- Writing styling for React components.
- Providing deployment configurations (Dockerfile, vercel.json) for hosting on Render, Railway, and Vercel.

*All generated code was reviewed, modified, and tested to ensure it meets the project requirements and correctly implements the business logic.*
