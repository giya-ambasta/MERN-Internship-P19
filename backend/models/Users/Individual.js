const mongoose = require("mongoose");
const { baseSchema } = require("./BaseSchema")


const individualSchema = new mongoose.Schema({
    ...baseSchema.obj
}, 
{
    timestamps: true
});

module.exports = mongoose.model("Individual", individualSchema);
