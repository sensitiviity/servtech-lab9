const Task = require('../models/Task');
const AppError = require('../utils/AppError');
const asyncHandler = require('../middleware/asyncHandler');

exports.getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().populate('createdBy', 'name email');
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
});

exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id).populate('createdBy', 'name');
  if (!task) return next(new AppError('Задачу не знайдено', 404));
  res.status(200).json({ success: true, data: task });
});

exports.createTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    ...req.body,
    createdBy: req.user._id,
  });
  res.status(201).json({ success: true, data: task });
});

exports.updateTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!task) return next(new AppError('Задачу не знайдено', 404));
  res.status(200).json({ success: true, data: task });
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return next(new AppError('Задачу не знайдено', 404));
  res.status(200).json({ success: true, message: 'Задачу видалено' });
});