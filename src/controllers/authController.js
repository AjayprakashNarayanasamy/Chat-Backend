const authService = require('../services/authService');

async function register(req, res, next) {
  try {
    const { name, email, password_hash } = req.body;
    if (!name || !email || !password_hash) {
      return res.status(400).json({
        message: 'Name, email and password_hash are required',
      });
    }
    if (password_hash.length < 8) {
      return res.status(400).json({
        message: 'password_hash must be at least 8 characters',
      });
    }
    const result = await authService.registerUser({
      name,
      email,
      password_hash,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password_hash } = req.body;

    if (!email || !password_hash) {
      return res.status(400).json({
        message: 'Email and password_hash are required',
      });
    }

    const result = await authService.loginUser({
      email,
      password_hash,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function getMe(req, res, next) {
  try {
    const user = await authService.getCurrentUser(req.user.userId);

    res.status(200).json({
      user,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  getMe,
};
