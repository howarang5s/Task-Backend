// backend/controllers/task.controller.js
const Task = require('../models/task.model');

exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, status } = req.body;

    // Basic validation (as before)
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required.' });
    }
    if (title.length > 100) {
      return res.status(400).json({ message: 'Title cannot exceed 100 characters.' });
    }
    if (description && description.length > 500) {
      return res.status(400).json({ message: 'Description cannot exceed 500 characters.' });
    }
    if (status && !['To Do', 'In Progress', 'Done'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    // Check for duplicate title within the same status group
    const existingTask = await Task.findOne({ title: title.trim(), status });
    if (existingTask) {
      return res.status(409).json({ message: `Task with title "${title.trim()}" already exists in the "${status}" group.` }); // 409 Conflict
    }

    const newTask = new Task({
      title,
      description,
      deadline,
      status,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, deadline, status } = req.body;

    // Basic validation (as before)
    if (title && title.trim() === '') {
      return res.status(400).json({ message: 'Title cannot be empty.' });
    }
    if (title && title.length > 100) {
      return res.status(400).json({ message: 'Title cannot exceed 100 characters.' });
    }
    if (description && description.length > 500) {
      return res.status(400).json({ message: 'Description cannot exceed 500 characters.' });
    }
    if (status && !['To Do', 'In Progress', 'Done'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    // Check for duplicate title within the same status group (excluding the current task)
    if (title) {
      const existingTask = await Task.findOne({
        _id: { $ne: taskId }, // Exclude the current task
        title: title.trim(),
        status,
      });
      if (existingTask) {
        return res.status(409).json({ message: `Task with title "${title.trim()}" already exists in the "${status}" group.` });
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, deadline, status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json(updatedTask);
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid task ID format.' });
    }
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json(task);
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid task ID format.' });
    }
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid task ID format.' });
    }
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status && ['To Do', 'In Progress', 'Done'].includes(status)) {
      query.status = status;
    }

    if (search) {
      const searchRegex = { $regex: search, $options: 'i' }; // 'i' for case-insensitive
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
      ];
    }

    const tasks = await Task.find(query).sort({ updatedAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body;

    if (!status || !['To Do', 'In Progress', 'Done'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json(updatedTask);
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid task ID format.' });
    }
    res.status(500).json({ message: 'Error updating task status', error: error.message });
  }
};