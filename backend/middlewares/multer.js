const multer = require("multer");
const DataUriParser = require("datauri/parser");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const singleUpload = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);

const parser = new DataUriParser();

module.exports = singleUpload;
