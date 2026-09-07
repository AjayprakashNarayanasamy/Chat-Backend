const express = require('express');

const { getAllUsersController } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, getAllUsersController);

module.exports = router;
