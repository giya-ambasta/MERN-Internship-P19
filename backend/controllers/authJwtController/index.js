const login = require("./login");
const signup = require("./signup");
const logout = require("./logout");
const delUser = require("./delUser");

const authJwtController = {
    login,
    signup,
    logout,
    delUser
}

module.exports = authJwtController;
