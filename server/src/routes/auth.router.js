const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');
const verifyToken = require('../app/middlewares/auth');

//@route POST api/auth/register
//@desc register user
//@access public
router.post('/register', authController.register);

//@route POST api/auth/login
//@desc login user
//@access public
router.post('/login', authController.login);

//@route GET api/auth
//@desc check if user is logged in
//@access public
router.get('/', verifyToken, authController.checkUser);

module.exports = router;
