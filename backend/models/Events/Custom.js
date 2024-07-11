const mongoose = require("mongoose");
const { baseSchema, serviceSchema } = require("./BaseSchema");

const customSchema = new mongoose.Schema({
    ...baseSchema.obj,
    hallOwner: serviceSchema,
    catering: serviceSchema,
    decorator: serviceSchema,
    photographer: serviceSchema,
    speaker: serviceSchema,
    musician: serviceSchema,
    performer: serviceSchema
});

module.exports = mongoose.model("Custom", customSchema);
