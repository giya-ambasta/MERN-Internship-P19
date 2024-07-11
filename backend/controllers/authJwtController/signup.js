const bcrypt = require("bcryptjs");
const Joi = require("joi");

const User = require("@/models/Users/User");

async function signup(req, res) {
    try {
        const { firstName, lastName, email, password, type } = req.body;
        
        const objectSchema = Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            password: Joi.string().required(),
            type: Joi.string().valid('individual', 'hallOwner', 'catering', 'musician', 'photographer', 'decorator', 'performer', 'speaker').required(),
        }).unknown(false);

        const { error, value } = objectSchema.validate( {firstName, lastName, email, password, type} );
        if (error) {
            return res.status(409).json({
                success: false,
                result: null,
                error: error,
                message: 'Invalid/Missing credentials.',
                errorMessage: error.message,
            });
        }

        const userEmail = await User.findOne({email: email });
        if (userEmail) {
            return res.status(409).json({
                success: false,
                result: null,
                message: 'An account with this email has already been registered.',
            });
        }
        else{ 
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                isLoggedIn: "false",
                jwt: [],
                type
            });

            return res.status(200).json({
                success: true,
                message: 'User registered successfully.',
            });
        }

    }
    catch (error) {
        res.status(500).json({ success: false, result: null, message: error.message, error: error });
    }
}

module.exports = signup;