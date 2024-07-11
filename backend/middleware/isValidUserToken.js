const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const User = mongoose.model('User');

async function isValidUserToken (req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token)
      return res.status(401).json({
        success: false,
        result: null,
        message: 'No authentication token, authorization denied.',
        jwtExpired: true,
      });

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified)
      return res.status(401).json({
        success: false,
        result: null,
        message: 'Token verification failed, authorization denied.',
        jwtExpired: true,
      });

    const user = await User.findOne({ _id: verified.id });
    if (!user)
      return res.status(401).json({
        success: false,
        result: null,
        message: "User doens't Exist, authorization denied.",
        jwtExpired: true,
      });
    if (user.isLoggedIn === 0)
      return res.status(401).json({
        success: false,
        result: null,
        message: 'User is already logged out try to login, authorization denied.',
        jwtExpired: true,
      });
    else {
      req.User = user;
      next();
    }
  } catch (error) {
    res.status(503).json({
      success: false,
      result: null,
      message: error.message,
      error: error,
    });
  }
};

module.exports = {
  isValidUserToken
};
