const createCRUDController = require("../CRUDController");
const CRUDController = createCRUDController("Users/HallOwner");

const hallOwnerController = {
    readAll: CRUDController.readAll,
}

module.exports = hallOwnerController;