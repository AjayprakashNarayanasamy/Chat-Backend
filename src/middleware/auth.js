const { verifyToken } = require('../utils/jwt');

function authMiddleware(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        message: 'Authentication required',
      });
    }
    const [scheme, token] = authorization.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({
        message: 'Invalid authorization format',
      }); // Doubt it should be authentication
    }
    const decoded = verifyToken(token);

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }
}

module.exports = authMiddleware
