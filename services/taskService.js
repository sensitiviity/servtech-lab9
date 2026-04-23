const Task = require('../models/Task');
const AppError = require('../utils/AppError');

exports.getAllTasks = async () => {
  return await Task.find().populate('createdBy', 'name email');
};

exports.getTaskById = async (id) => {
  const task = await Task.findById(id).populate('createdBy', 'name');
  if (!task) throw new AppError('Task not found', 404);
  return task;
};

exports.createTask = async (data, userId) => {
  return await Task.create({ ...data, createdBy: userId });
};

exports.updateTask = async (id, data, currentUser) => {
  const task = await Task.findById(id);
  if (!task) throw new AppError('Task not found', 404);
  if (
    task.createdBy.toString() !== currentUser._id.toString() &&
    currentUser.role !== 'admin'
  ) {
    throw new AppError('You do not have permission to edit this task', 403);
  }
  Object.assign(task, data);
  await task.save();
  return task;
};

exports.deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) throw new AppError('Task not found', 404);
  return task;
};
