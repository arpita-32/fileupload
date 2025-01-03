"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/fileUpload"),
    localFileUpload = _require.localFileUpload,
    imageUpload = _require.imageUpload,
    videoUpload = _require.videoUpload,
    imageSizeReducer = _require.imageSizeReducer;

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);
module.exports = router;
//# sourceMappingURL=FileUpload.dev.js.map
