const createCRUDController = require("../CRUDController");
const CRUDController = createCRUDController("Users/Musician");

const musicianController = {
    readAll: CRUDController.readAll,
}

module.exports = musicianController;