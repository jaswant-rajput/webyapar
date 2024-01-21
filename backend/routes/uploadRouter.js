
const express = require("express")
const multer = require("multer")
const path = require("path")
const {uploadImage} = require("./../controllers/uploadController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
const upload = multer({ storage: storage });
  
const router = express.Router()


router.post("/upload",upload.single('image'),uploadImage)

module.exports = router