const createCRUDController = require("../CRUDController");
const CRUDController = createCRUDController("Events/Wedding");

const weddingController = {
    create: CRUDController.create,
    read: CRUDController.read,
    readAll: CRUDController.readAll,
    update: CRUDController.update,
    delete: CRUDController.delete
}

module.exports = weddingController;