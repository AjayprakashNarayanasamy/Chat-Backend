const userService = require('../services/userServices');

async function getAllUsersController(req, res, next) {
  const response = await userService.getAllUsers();

  try {
    res.status(200).json({
      response,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllUsersController,
};
