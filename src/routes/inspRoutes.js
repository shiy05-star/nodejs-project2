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

const uploadStorage = upload;
router.use('/imagePaths', express.static('upload'));
// router.post('/upload', uploadStorage, inspController.upload_master); 


router.post('/cabinets', uploadStorage, inspController.inspected);
router.get('/status/repairItems' ,inspController.repairItems );
router.get('/status/demageItems' ,inspController.demageItems );
router.get('/status' ,inspController.check_status );



/**
 * @swagger
 * /api/v1/cabinets:
 *   post:
 *     tags:
 *       - cabinetController
 *     summary: Used to create an item in the cabinet list
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               TIM_Key:
 *                 type: integer
 *               inspected_items:
 *                 type: integer
 *               timc_status:
 *                 type: string
 *               comments:
 *                 type: string
 *               imagePaths:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               created_by:
 *                 type: integer
 *               TIIM_key:
 *                 type: integer
 *               upd_key:
 *                 type: integer
 *               uad_key:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Fetched Successfully
 *       '400':
 *         description: Bad request - Missing or invalid parameters
 */







module.exports = router;
