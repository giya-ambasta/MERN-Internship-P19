const express = require("express");
const router = express.Router();

const { catchErrors } = require("@/handlers/errorHandlers");
const { isValidUserToken } = require("../../middleware/isValidUserToken");
const { individualController, hallOwnerController, musicianController, performerController, cateringController, speakerController, decoratorController } = require("@/controllers/userController");
const uploadMiddleware = require("@/middleware/uploadMiddleware");

// const upload = uploadMiddleware('./public/uploads/profileImage');
const uploadProfileImage = uploadMiddleware('./public/uploads/profileImage').single('profilePicPath');

router.route('/me').get(isValidUserToken, catchErrors(individualController.read));
router.route('/me/details').get(isValidUserToken, catchErrors(individualController.readFields));
router.route('/me/details').post(isValidUserToken, uploadProfileImage, catchErrors(individualController.create));
router.route('/me/edit').put(isValidUserToken, uploadProfileImage, catchErrors(individualController.update));

router.route('/hallOwner').get(isValidUserToken, catchErrors(hallOwnerController.readAll));
router.route('/catering').get(isValidUserToken, catchErrors(cateringController.readAll));
router.route('/performer').get(isValidUserToken, catchErrors(performerController.readAll));
router.route('/musician').get(isValidUserToken, catchErrors(musicianController.readAll));
router.route('/speaker').get(isValidUserToken, catchErrors(speakerController.readAll));
router.route('/decorator').get(isValidUserToken, catchErrors(decoratorController.readAll));

module.exports = router;