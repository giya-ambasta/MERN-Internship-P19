const multer = require('multer');
const fs = require('fs');
const path = require('path');

module.exports = function(destPath) {
  // Ensure the destination directory exists
  fs.mkdirSync(destPath, { recursive: true });

  // Set up Multer
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, destPath);
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname );
    }
  });

  return multer({ storage: storage });
};
