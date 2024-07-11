const createCRUDController = require("../CRUDController");
const CRUDController = createCRUDController("Users/Performer");

const performerController = {
    readAll: CRUDController.readAll,
}

module.exports = performerController;