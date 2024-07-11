const mongoose = require("mongoose");
const { baseSchema, serviceSchema } = require("./BaseSchema");

const corporateSchema = new mongoose.Schema({
    ...baseSchema.obj,
    decorator: serviceSchema,
    speaker: serviceSchema
});

module.exports = mongoose.model("Corporate", corporateSchema);
