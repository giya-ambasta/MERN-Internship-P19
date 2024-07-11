const mongoose = require('mongoose');
const modelName = "Users/User";
const Model = mongoose.model(modelName.split('/').pop());

const individualController = {
    create: async (req, res) => {
        try {
            const dataModel = require("@/models/Users/" + req.User.type.charAt(0).toUpperCase() + req.User.type.slice(1));
            let requestData = { userId: req.User._id };
            let fName = { firstName: req.User.firstName }
            requestData = { ...requestData, ...fName };
            requestData = { ...requestData, ...req.body };
            const fileData = { ...req.file };

            if (fileData.hasOwnProperty('path')) {
                requestData.profilePicPath = fileData.path;
            }
            const data = await dataModel.create(requestData);
            return res.status(201).json({
                success: true,
                result: data,
                message: 'Data added successfully',
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },


    readFields: async (req, res) => {
        try {
            // Dynamically require the data model based on the user type
            const dataModel = require("@/models/Users/" + req.User.type.charAt(0).toUpperCase() + req.User.type.slice(1));
            const modelSchema = dataModel.schema;

            // Define an array of fields to exclude from extraction
            const excludedFields = ['userId', 'firstName'];

            // Extract relevant information from the data model schema, excluding specified fields
            const extractedData = Object.entries(modelSchema.obj)
                .filter(([key]) => !excludedFields.includes(key))
                .map(([key, value]) => {
                    // Determine the type of each field
                    let typeName;

                    if (value.type && value.type.name) {
                        typeName = value.type.name.toLowerCase();
                    } else {
                        const typeString = value.type ? value.type.toString() : '';
                        const matches = typeString.match(/\b(\w+)\b/);
                        typeName = matches ? matches[0].toLowerCase() : 'unknown';
                    }

                    // Map the field types to user-friendly types
                    const typeMapping = {
                        string: 'text',
                        number: 'number',
                        boolean: 'checkbox',
                        date: 'date',
                        schemaobjectid: 'text',
                        // Add more mappings as needed
                    };

                    // Get the user-friendly type or default to 'unknown'
                    const userFriendlyType = typeMapping[typeName] || 'unknown';

                    // Return an object with field name, type, and whether it's required
                    return {
                        name: key,
                        type: userFriendlyType,
                        required: value.required || false,
                    };
                });

            // Send a successful response with the extracted data
            return res.status(200).json({
                success: true,
                result: extractedData,
                message: 'Loaded data for user type:' + req.User.type,
            });
        }
        catch (error) {
            // Handle any errors that occur during the process
            return res.status(500).json({
                success: false,
                result: null,
                message: 'Error loading data for user type: ' + req.User.type,
                error: error.message,
            });
        }
    },


    read: async (req, res) => {
        try {
            const result = await Model.findOne({ _id: req.User.id });
            if (!result) {
                return res.status(404).json({
                    success: false,
                    result: null,
                    message: 'No document found by this id: ' + req.User.id,
                });
            }
            else {
                let responseData = { ...result._doc };

                delete responseData.password;
                delete responseData.isLoggedIn;
                delete responseData.createdAt;
                delete responseData.updatedAt;
                delete responseData.jwt;

                const dataModel = require("@/models/Users/" + req.User.type.charAt(0).toUpperCase() + req.User.type.slice(1));
                const data = await dataModel.findOne({ userId: req.User._id });

                if (data) {
                    responseData = { ...responseData, ...data._doc };
                }

                return res.status(200).json({
                    success: true,
                    result: responseData,
                    message: 'Loaded data for user id: ' + req.User.id,
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                result: null,
                message: error.message,
                error: error,
            });
        }
    },

    update: async (req, res) => {
        try {
            const updatedValues = {};
            const exclusionList = ['_id', 'createdAt', 'updatedAt', '__v', 'userId', 'type'];

            // Iterate over the keys in req.body and add them to updatedValues
            Object.keys(req.body).forEach((key) => {
                if (!exclusionList.includes(key)) {
                    updatedValues[key] = req.body[key];
                }
            });

            userData = {
                firstName: updatedValues.firstName,
                lastName: updatedValues.lastName,
                email: updatedValues.email
            }

            userTypeData = {
                ...updatedValues
            }

            delete userTypeData.lastName;
            delete userTypeData.email;


            const result = await Model.findOneAndUpdate({ _id: req.User.id }, userData, {
                new: true,
                runValidators: true,
            }).exec();

            const typeModel = require("@/models/Users/" + req.User.type.charAt(0).toUpperCase() + req.User.type.slice(1));
            const updateType = await typeModel.findOneAndUpdate({ _id: req.body._id }, userTypeData, {
                new: true,
                runValidators: true,
            }).exec();

            if (!result || !updateType) {
                return res.status(404).json({
                    success: false,
                    result: null,
                    message: 'No document found by this id: ' + req.User.id,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    result: {
                        user: result,
                        type: updateType
                    },
                    message: 'We updated documents by this id: ' + req.User.id,
                });
            }
        }
        catch (error) {
            if (error.name == 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    result: null,
                    message: 'Required fields are not supplied',
                    error: error,
                });
            } else {
                return res.status(500).json({
                    success: false,
                    result: null,
                    message: error.message,
                    error: error,
                });
            }
        }
    },
    delete: async (req, res) => {
        try {
            const result = await Model.findOneAndDelete({ _id: req.User.id }).exec();
            if (!result) {
                return res.status(404).json({
                    success: false,
                    result: null,
                    message: 'No document found by this id: ' + req.User.id,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    result,
                    message: 'Successfully deleted the document by id: ' + req.User.id,
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                result: null,
                message: error.message,
                error: error,
            });
        }
    }
}

module.exports = individualController;