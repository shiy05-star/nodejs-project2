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


router.post('/inspected', uploadStorage, inspController.inspected);

/**
 * @swagger
 * /api/v2/inspected:
 *   post:
 *     tags:
 *       - inspected_items list api
 *     summary: Used to create an item in the inspected_items list
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               TIM_Key:
 *                 type: string
 *               inspected_items:
 *                 type: string
 *               status:
 *                 type: string
 *               comments:
 *                 type: string
 *               imagePaths:
 *                 type: string
 *                 format: binary
 *               created_by:
 *                 type: string
 *               TIIM_key:
 *                 type: string
 *               upd_key:
 *                 type: string
 *               uad_key:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Fetched Successfully
 *       '400':
 *         description: Bad request - Missing or invalid parameters
 */


module.exports = router;
