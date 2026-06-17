// asdas meter en req.file para back

const multer = require("multer");

const storage = multer.memoryStorage();
//crescion del middleware  
const upload = multer({storage});

module.exports = upload;