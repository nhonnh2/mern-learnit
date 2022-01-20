const express = require('express');
const router = express.Router();
const authController = require('../app/controller/AuthController');


//@route POST api/auth/register
//@desc register user
//@access public
router.post('/register', authController)

module.exports = router;