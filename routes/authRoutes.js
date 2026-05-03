const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/authController');
const validate = require('../middleware/validate');
const protect = require('../middleware/protect');
const { registerSchema } = require('../validators/auth.validator');

router.post('/register', validate(registerSchema), register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;