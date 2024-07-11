const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const User = require("@/models/Users/User");

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const objectSchema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            password: Joi.string().required(),
        }).unknown(false);

        const { error, value } = objectSchema.validate({email, password});
        if (error) {
            return res.status(409).json({
                success: false,
                result: null,
                error: error,
                message: 'Invalid/Missing credentials.',
                errorMessage: error.message,
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No account with this email has been registered.',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({
                success: false,
                message: 'Invalid credentials.',
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        const UserModel = require("@/models/Users/" + user.type.charAt(0).toUpperCase() + user.type.slice(1));
        const userDetails = await UserModel.findOne({ userId: user._id });
        let fullRegistration = false;

        if (!userDetails) {
            fullRegistration = false;
        }
        else {
            fullRegistration = true;
        }

        user.isLoggedIn = true;
        user.jwt.push(token);
        await user.save();

        return res.status(200)
            .cookie('token', token, {
                maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : null,
                sameSite: 'none',
                httpOnly: true,
                secure: true,
                domain: req.hostname,
                path: '/',
            })
            .json({
                success: true,
                result: {
                    user_id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    type: user.type,
                    fullRegistration: fullRegistration,
                },
                token: token,
                message: 'Successfully logged in.',
            });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = login;