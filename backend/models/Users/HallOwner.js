const mongoose = require("mongoose");
const { baseSchema } = require("./BaseSchema")

const hallOwnerSchema = new mongoose.Schema({
    ...baseSchema.obj,
    capacity: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    charges: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: false,
    },
    websiteUrl: {
        type: String,
        required: false,
        default: "",
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    expreience: {
        type: Number,
        required: true,
        default: 0,
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model("HallOwner", hallOwnerSchema);