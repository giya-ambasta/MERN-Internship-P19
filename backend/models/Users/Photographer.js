const mongoose = require("mongoose");
const { baseSchema } = require("./BaseSchema")

const photographerSchema = new mongoose.Schema({
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
    droneService: {
        type: Boolean,
        required: true,
        default: false,
    },
    photoBooth: {
        type: Boolean,
        required: true,
        default: false,
    },
    photoPrint: {
        type: Boolean,
        required: true,
        default: false,
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model("Photographer", photographerSchema);