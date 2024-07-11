const createCRUDController = require("../CRUDController");
const CRUDController = createCRUDController("Events/Concert");

const concertController = {
    create: CRUDController.create,
    read: CRUDController.read,
    readAll: CRUDController.readAll,
    update: CRUDController.update,
    delete: CRUDController.delete
}

module.exports = concertController;