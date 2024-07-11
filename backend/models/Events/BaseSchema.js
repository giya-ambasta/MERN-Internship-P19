const mongoose = require("mongoose");

const baseSchema = new mongoose.Schema({
    organizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    posterPath: {
        type: String,
        required: false,
        default: "",
    },
    invitationList: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        required: false,
        default: [],
    }
}, {
    timestamps: true
});

const serviceSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel',
        required: false,
        default: null,
    },
    approval: {
        type: Boolean,
        required: false,
        default: false,
    },
    onModel: {
        type: String,
        required: false,
        default: null,
        enum: ['HallOwner', 'Performer', 'Catering', 'Musician', 'Decorator', 'Speaker', 'Photographer']
    }
});

module.exports = {
    baseSchema: baseSchema,
    serviceSchema: serviceSchema
};
