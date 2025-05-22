// backend/models/task.model.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  deadline: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true }, 
});


taskSchema.virtual('isOverdue').get(function() {
  if (this.deadline) {
    return this.deadline < new Date() && this.status !== 'Done';
  }
  return false; 
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;