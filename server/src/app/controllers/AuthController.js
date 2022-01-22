require('dotenv').config();
//require library
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
//require models
const User = require('../models/User');

class AuthController {
  //[POST] / auth /register
  async register(req, res) {
    const { username, password } = req.body;

    //simple validation
    if ((!username, !password)) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing username and/or password' });
    }

    try {
      //check for existing user
      const user = await User.findOne({ username });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: 'Username already taken' });
      }
      //All good
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      //return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: 'register user successfully',
        accessToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'error from the server! Inernal error',
      });
    }
  }
  //[POST] / auth /login
  async login(req, res) {
    const { username, password } = req.body;

    //simple validation
    if ((!username, !password)) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing username and/or password' });
    }
    try {
      //check for existing user
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: 'Incorrect username or password' });
      }
      //username found. verify password
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res
          .status(400)
          .json({ success: false, message: 'Incorrect username or password' });
      }

      //All good
      //return token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: 'user logged in successfully',
        accessToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: 'error from the server! Inernal error',
      });
    }
  }

  //[GET] / auth
  async checkUser(req, res) {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: 'User not found' });
      res.json({ success: true, user });
    } catch (error) {
      console.log('error checkUser', error);
      return res.status(500).json({
        success: false,
        message: 'error from the server! Inernal error',
      });
    }
  }
}

module.exports = new AuthController();
