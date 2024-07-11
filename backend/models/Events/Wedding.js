const mongoose = require("mongoose");
const { baseSchema, serviceSchema } = require("./BaseSchema");

const weddingSchema = new mongoose.Schema({
    ...baseSchema.obj,
    hallOwner: serviceSchema,
    catering: serviceSchema,
    decorator: serviceSchema,
    photographer: serviceSchema
});

module.exports = mongoose.model("Wedding", weddingSchema);
