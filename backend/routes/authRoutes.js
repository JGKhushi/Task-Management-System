const express = require('express');
const router = express.Router();
const { register, login, getUsers } = require('../controllers/authController');
const { protect, admin } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, admin, getUsers);

module.exports = router;
