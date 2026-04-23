const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.registerUser = async ({ name, email, password, confirmPassword, role }) => {
  if (password !== confirmPassword) {
    throw new AppError('Passwords do not match', 400);
  }
  const existing = await User.findOne({ email });
  if (existing) throw new AppError('User with this email already exists', 409);

  const user = await User.create({ name, email, password, role });
  return user;
};

exports.loginUser = async ({ email, password }) => {
  if (!email || !password) throw new AppError('Enter email and password', 400);
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new AppError('Invalid email or password', 401);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError('Invalid email or password', 401);
  return user;
};