const createCRUDController = require("../CRUDController");
const CRUDController = createCRUDController("Users/Speaker");

const speakerController = {
    readAll: CRUDController.readAll,
}

module.exports = speakerController;