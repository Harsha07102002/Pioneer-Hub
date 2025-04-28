const express = require('express');
const { login, register, updateProfile, logout } = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const singleUpload = require('../middlewares/multer');

const router = express.Router();

router.post('/register', singleUpload, register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/profile/update', isAuthenticated, singleUpload, updateProfile);

module.exports = router;
