const mongoose = require("mongoose");
const { baseSchema, serviceSchema } = require("./BaseSchema");

const birthdaySchema = new mongoose.Schema({
    ...baseSchema.obj,
    hallOwner: serviceSchema,
    performer: serviceSchema,
    catering: serviceSchema,
    musician: serviceSchema,
    decorator: serviceSchema
});

module.exports = mongoose.model("Birthday", birthdaySchema);
