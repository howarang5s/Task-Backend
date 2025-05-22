// backend/routes/task.routes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controller/task_controller');

// Route for creating a new task
router.post('/create', taskController.createTask);

// Route for getting a specific task by ID
router.get('/get/:id', taskController.getTaskById); // We'll implement this later

// Route for getting all tasks (optional: with status filter)
router.get('/tasks', taskController.getAllTasks);

// Route for updating an existing task by ID
router.put('/edit/:id', taskController.updateTask);

// Route for deleting a task by ID
router.delete('/reove/:id', taskController.deleteTask);

// Route for updating the status of a task by ID
router.patch('/tasks/:id/status', taskController.updateTaskStatus);

module.exports = router;