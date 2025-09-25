const express = require('express');
const Task = require('../models/Task');
const { protact } = require('../middleware/authMiddleware.js');
const router = express.Router();

// @desc   Get all tasks for logged-in user
// @route  GET /api/tasks
// @access Private
router.get('/', protact, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
});

// @desc   Create a new task
// @route  POST /api/tasks
// @access Private
router.post('/', protact, async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  const task = new Task({ user: req.user._id, title });
  await task.save();
  res.status(201).json(task);
});

// @desc   Update task (mark complete, change title, etc.)
// @route  PUT /api/tasks/:id
// @access Private
router.put('/:id', protact, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  task.title = req.body.title ?? task.title;
  task.completed =
    req.body.completed !== undefined ? req.body.completed : task.completed;

  const updatedTask = await task.save();
  res.json(updatedTask);
});

// @desc   Delete task
// @route  DELETE /api/tasks/:id
// @access Private
router.delete('/:id', protact, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await task.deleteOne();
  res.json({ message: 'Task removed' });
});

module.exports = router;