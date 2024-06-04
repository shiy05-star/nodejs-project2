
const express = require("express");
const router = express.Router();
const inspController = require('../controller/inspContoller');



router.post('/inspected',inspController.inspected_items);



module.exports = router;