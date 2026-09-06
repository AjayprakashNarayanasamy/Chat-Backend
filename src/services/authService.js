const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepositry');
const { generateToken } = require('../utils/jwt');

async function registerUser({ name, email, password_hash }) {
  const normalizeEmail = email.trim().toLowerCase();

  const existingUser = await userRepository.findUserbyEmail(normalizeEmail);

  if (existingUser) {
    const error = new Error('Email is already registered');
    error.statusCode = 409;
    throw error;
  }

  const password = await bcrypt.hash(password_hash, 12);

  const user = await userRepository.createUser({
    name: name.trim(),
    email: normalizeEmail,
    password_hash: password,
  });
  const token = generateToken(user);

  return {
    user,
    token,
  };
}

async function loginUser({ email, password_hash }) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await userRepository.findUserbyEmail(normalizedEmail);

  if (!user) {
    const error = new Error('Invalid Email');
    error.statusCode = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(
    password_hash,
    user.password_hash,
  );

  if (!passwordMatches) {
    const error = new Error('Invalid Password');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    },
    token,
  };
}

async function getCurrentUser(userId) {
  const user = await userRepository.findUserById(userId);

  if (!user) {
    const error = new Error('User Not Found');
    error.statusCode = 404;
    throw error;
  }

  return user;
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
