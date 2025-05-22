# Task Management App - Backend

A RESTful API backend built with **Node.js**, **Express**, and **MongoDB** to support a full-featured task management frontend. It provides CRUD operations, input validation, and clear response handling.

---

## 🚀 Features

- **Create Task**: Add new tasks with a title, description, deadline, and status.
- **Read Tasks**: Fetch all tasks or search/filter based on query parameters.
- **Update Task**: Modify task information like title, description, deadline, or status.
- **Delete Task**: Permanently remove a task by its ID.
- **Validation**: Ensures task data integrity (e.g., non-empty titles, unique titles per status).
- **Error Handling**: Clean error responses for invalid or missing data.
- **Cross-Origin Resource Sharing (CORS)**: Enables API consumption by a separate frontend.
- **Environment Variables**: Secure configuration via `.env`.

---

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime for building scalable network apps.
- **Express.js**: Web framework for handling routes and middleware.
- **MongoDB**: NoSQL database for storing task data.
- **Mongoose**: ODM to interact with MongoDB.
- **dotenv**: For environment variable management.
- **CORS**: Middleware to allow cross-origin API requests.
- **Nodemon** *(Dev)*: Automatically restarts the server on file changes.

---

## ⚙️ Installation & Setup

### 1. Clone the repository:
git clone https://github.com/howarang5s/Task-Backend
cd <YOUR_BACKEND_REPO_FOLDER_NAME>

### 2. Install node modules
npm instal

### 3. start command
node server.js
