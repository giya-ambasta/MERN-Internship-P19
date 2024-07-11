const createCRUDController = require("../CRUDController");
const CRUDController = createCRUDController("Users/Catering");

const cateringController = {
    readAll: CRUDController.readAll,
}

module.exports = cateringController;