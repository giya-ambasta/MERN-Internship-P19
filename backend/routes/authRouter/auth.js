const express = require("express");
const router = express.Router();

const { catchErrors } = require("@/handlers/errorHandlers");
const { login, signup, logout, delUser } = require("@/controllers/authJwtController");
const { isValidUserToken } = require("../../middleware/isValidUserToken");

router.route('/login').post(catchErrors(login));
router.route('/signup').post(catchErrors(signup));
router.route('/logout').post(isValidUserToken, catchErrors(logout));
router.route('/delUser').delete(isValidUserToken, catchErrors(delUser));

module.exports = router;