const mongoose = require("mongoose");
const { baseSchema } = require("./BaseSchema")

const cateringSchema = new mongoose.Schema({
    ...baseSchema.obj,
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
    },
    cusine: {
        type: String,
        required: true,
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model("Catering", cateringSchema);