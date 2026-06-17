const express = require("express");
//para intercerptar los archivos con el multer
const upload = require("../middlewares/upload.js");
const { uploadFile, getFiles } = require("../controllers/fileController.js");

const router = express.Router();

router.post("/", upload.single("file"), uploadFile);
router.get("/:todoListId", getFiles); 

module.exports = router;