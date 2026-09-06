const userRepository = require('../repositories/userRepositry');

async function getAllUsers() {
  const users = await userRepository.findAllUsers();

  return users;
}

module.exports = {
  getAllUsers,
};
