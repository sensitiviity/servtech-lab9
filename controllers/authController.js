const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../middleware/AppError');
const asyncHandler = require('../middleware/asyncHandler');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw AppError.conflict('User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
 
  if (!email || !password) {
    throw AppError.badRequest('Введіть email та пароль');
  }
 
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw AppError.unauthorized('Невірний email або пароль');
  }
 
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw AppError.unauthorized('Невірний email або пароль');
  }
 
  const token = generateToken(user._id, user.role);
 
  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
 
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
 
  res.status(200).json({
    success: true,
    user,
  });
});