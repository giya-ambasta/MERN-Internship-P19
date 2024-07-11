const mongoose = require("mongoose");

async function formFieldController(req, res) {
  try {
    const modelName = req.url.split("/")[1];

    const model = require("@/models/Events/" + modelName.charAt(0).toUpperCase() + modelName.slice(1));
    const modelSchema = model.schema.obj;

    const excludedFields = ['invitationList', 'firstName'];

    const extractFieldData = (field) => {
      if (field.type && field.type.name === 'Schema' && field.schema && field.schema.obj) {
        return Object.entries(field.schema.obj)
          .map(([nestedKey, nestedValue]) => extractFieldData({ name: nestedKey, ...nestedValue }))
          .flat();
      }

      if (field.type && field.type.name === 'SchemaObjectId') {
        return [];
      }

      let typeName;

      if (field.type && field.type.name) {
        typeName = field.type.name.toLowerCase();
      } else {
        const typeString = field.type ? field.type.toString() : '';
        const matches = typeString.match(/\b(\w+)\b/);
        typeName = matches ? matches[0].toLowerCase() : 'unknown';
      }

      const typeMapping = {
        string: 'text',
        number: 'number',
        boolean: 'checkbox',
        date: 'date',
      };

      const userFriendlyType = typeMapping[typeName] || 'unknown';
      return {
        name: field.name,
        type: userFriendlyType,
        required: field.required || false,
      };
    };

    const extractedData = Object.entries(modelSchema)
      .filter(([key, value]) => !excludedFields.includes(key))
      .map(([key, value]) => extractFieldData({ name: key, ...value }))
      .flat();

    return res.status(200).json({
      success: true,
      result: extractedData,
      message: 'API worked successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'Internal server error',
    });
  }
}

module.exports = formFieldController;
