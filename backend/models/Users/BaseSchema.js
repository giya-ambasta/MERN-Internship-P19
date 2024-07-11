const mongoose = require("mongoose");

const baseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    profilePicPath: {
        type: String,
        required: false,
        default: "",
    },
});

module.exports = { baseSchema : baseSchema };