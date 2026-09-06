const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const { clientUrl } = require('./config/env');
const app = express();

app.use(
  cors({
    origin: clientUrl,
  }),
);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Chat server is running',
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
