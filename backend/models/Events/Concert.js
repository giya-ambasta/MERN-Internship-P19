const mongoose = require("mongoose");
const { baseSchema, serviceSchema } = require("./BaseSchema");

const concertSchema = new mongoose.Schema({
    ...baseSchema.obj,
    performer: serviceSchema,
    musician: serviceSchema,
    photographer: serviceSchema
});

module.exports = mongoose.model("Concert", concertSchema);
