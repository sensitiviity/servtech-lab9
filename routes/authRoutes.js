const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { registerSchema } = require('../validators/auth.validator');

router.post('/register', validate(registerSchema), register);

module.exports = router;