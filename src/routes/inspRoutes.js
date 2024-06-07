
const express = require("express");
const router = express.Router();
const inspController = require('../controller/inspContoller');
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './upload'); 
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + Date.now() + ext);
    }
  });


  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } 
  }).array('imagePaths', 10);

const uploadStorage = upload
router.use('/imagePaths', express.static('upload'));
// router.post('/upload', uploadStorage, inspController.upload_master); 


router.post('/inspected',uploadStorage, inspController.inspected);



module.exports = router;