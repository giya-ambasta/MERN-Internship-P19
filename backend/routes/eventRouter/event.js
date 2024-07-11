const express = require("express");
const router = express.Router();

const { catchErrors } = require("@/handlers/errorHandlers");
const { isValidUserToken } = require("../../middleware/isValidUserToken");
const { formFieldController,
        birthdayController,
        concertController,
        weddingController,
        corporateController,
        educationalInstitutionController,
        customController } = require("@/controllers/eventController");
const uploadMiddleware = require("@/middleware/uploadMiddleware");

const uploadPosterPic = uploadMiddleware('./public/uploads/posterImage').single('posterPath');

router.route('/birthday/').get(isValidUserToken, catchErrors(birthdayController.readAll));
router.route('/birthday/get/').get(isValidUserToken, catchErrors(formFieldController));
router.route('/birthday/get/:id').get(isValidUserToken, catchErrors(birthdayController.read));
router.route('/birthday/create').post(isValidUserToken, uploadPosterPic, catchErrors(birthdayController.create));
router.route('/birthday/update/:id').put(isValidUserToken, uploadPosterPic, catchErrors(birthdayController.update));
router.route('/birthday/delete/:id').delete(isValidUserToken, catchErrors(birthdayController.delete));

router.route('/wedding/').get(isValidUserToken, catchErrors(weddingController.readAll));
router.route('/wedding/get/').get(isValidUserToken, catchErrors(formFieldController));
router.route('/wedding/get/:id').get(isValidUserToken, catchErrors(weddingController.read));
router.route('/wedding/create').post(isValidUserToken, uploadPosterPic, catchErrors(weddingController.create));
router.route('/wedding/update/:id').put(isValidUserToken, uploadPosterPic, catchErrors(weddingController.update));
router.route('/wedding/delete/:id').delete(isValidUserToken, catchErrors(weddingController.delete));

router.route('/concert/').get(isValidUserToken, catchErrors(concertController.readAll));
router.route('/concert/get/').get(isValidUserToken, catchErrors(formFieldController));
router.route('/concert/get/:id').get(isValidUserToken, catchErrors(concertController.read));
router.route('/concert/create').post(isValidUserToken, uploadPosterPic, catchErrors(concertController.create));
router.route('/concert/update/:id').put(isValidUserToken, uploadPosterPic, catchErrors(concertController.update));
router.route('/concert/delete/:id').delete(isValidUserToken, catchErrors(concertController.delete));

router.route('/corporate/').get(isValidUserToken, catchErrors(corporateController.readAll));
router.route('/corporate/get/').get(isValidUserToken, catchErrors(formFieldController));
router.route('/corporate/get/:id').get(isValidUserToken, catchErrors(corporateController.read));
router.route('/corporate/create').post(isValidUserToken, uploadPosterPic, catchErrors(corporateController.create));
router.route('/corporate/update/:id').put(isValidUserToken, uploadPosterPic, catchErrors(corporateController.update));
router.route('/corporate/delete/:id').delete(isValidUserToken, catchErrors(corporateController.delete));

router.route('/educationalInstitution/').get(isValidUserToken, catchErrors(educationalInstitutionController.readAll));
router.route('/educationalInstitution/get/').get(isValidUserToken, catchErrors(formFieldController));
router.route('/educationalInstitution/get/:id').get(isValidUserToken, catchErrors(educationalInstitutionController.read));
router.route('/educationalInstitution/create').post(isValidUserToken, uploadPosterPic, catchErrors(educationalInstitutionController.create));
router.route('/educationalInstitution/update/:id').put(isValidUserToken, uploadPosterPic, catchErrors(educationalInstitutionController.update));
router.route('/educationalInstitution/delete/:id').delete(isValidUserToken, catchErrors(educationalInstitutionController.delete));

router.route('/custom/').get(isValidUserToken, catchErrors(customController.readAll));
router.route('/custom/get/').get(isValidUserToken, catchErrors(formFieldController));
router.route('/custom/get/:id').get(isValidUserToken, catchErrors(customController.read));
router.route('/custom/create').post(isValidUserToken, uploadPosterPic, catchErrors(customController.create));
router.route('/custom/update/:id').put(isValidUserToken, uploadPosterPic, catchErrors(customController.update));
router.route('/custom/delete/:id').delete(isValidUserToken, catchErrors(customController.delete));

module.exports = router;