const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');


//@route POST api/auth/register
//@desc register user
//@access public
router.post('/register', authController.register)

//@route POST api/auth/login
//@desc login user
//@access public
router.post('/login', authController.login)

module.exports = router;