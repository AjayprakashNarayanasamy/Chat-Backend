const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
    },
    jwtSecret,
    {
      expiresIn: '1d',
    },
  );
}

function verifyToken(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = {
  generateToken,
  verifyToken,
};
