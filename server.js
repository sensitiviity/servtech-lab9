require('dotenv').config(); 
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const AppError = require('./utils/AppError');
const errorHandler = require('./middleware/errorHandler');

const app = express();

connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5501',
  credentials: true,
}));
app.use(cookieParser());

//app.use(express.static('public'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((req, res, next) => {
  next(new AppError(`Маршрут ${req.originalUrl} не знайдено`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


