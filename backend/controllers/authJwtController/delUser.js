const User = require("@/models/Users/User");

async function delUser (req, res) {
  try {
    const userType = require("@/models/Users/" + req.User.type.charAt(0).toUpperCase() + req.User.type.slice(1));
    const eventList = ["Birthday",  "Concert",  "Corporate",  "Custom",  "EducationalInstitution",  "Wedding"];
    
    for (let i = 0; i < eventList.length; i++) {
      const eventModel = require("@/models/Events/" + eventList[i]);
      await eventModel.deleteMany({ organizerId: req.User.id });
    }

    const userTypeResult = await userType.deleteOne({ userId: req.User.id });
    if (!userTypeResult) {
      return res.status(404).json({
        success: false,
        message: 'No user type found for this user.',
      });
    }

    const userResult = await User.deleteOne({ _id: req.User.id });
    if (!userResult) {
      return res.status(404).json({
        success: false,
        message: 'No account with this email has been registered.',
      });
    }

    return res
      .clearCookie('token', {
        maxAge: null,
        sameSite: 'none',
        httpOnly: true,
        secure: true,
        domain: req.hostname,
        Path: '/',
      })
      .status(204)
      .json({success: true,
        message: 'Successfully deleted user and related data.'}) // Set the HTTP status code to 204
      .end();
  } catch (error) {
    res.status(500).json({ success: false, result: null, message: error.message, error: error });
  }
};

module.exports = delUser;
