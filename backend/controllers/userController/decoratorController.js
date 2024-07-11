const createCRUDController = require("../CRUDController");
const CRUDController = createCRUDController("Users/Decorator");

const decoratorController = {
    readAll: CRUDController.readAll,
}

module.exports = decoratorController;