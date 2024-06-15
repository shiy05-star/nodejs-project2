const dbConn = require("../../config/dbConfigure");
const inspModel = require("../model/inspModel");

const inspected = async (req, res) => {
  console.log("req.files", req.files);

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'Please select an image.',
      });
    }

    const { TIM_Key, inspected_items, timc_status, comments, created_by, TIIM_key, upd_key, uad_key } = req.body;

    if (!TIM_Key || !inspected_items || !timc_status || !comments || !created_by || !TIIM_key || !upd_key || !uad_key) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All fields are required.",
      });
    }

    const result = await inspModel.inspected(req.body);
    const timc_key = result[0][0].TIMC_KEY;

    for (let i = 0; i < req.files.length; i++) {
      const imageName = req.files[i].originalname;
      const result_images = await inspModel.inspectedImages(timc_key, imageName);
      console.log(result_images[0][0].result, "result");
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "Details added successfully",
    });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};



// ===================================================

const repairItems = async (req, res) => {
  try {
    const results = await inspModel.repairItems();
    res.status(200).json({
      success: true,
      error: false,
      msg: "user wants to repair item",
      data: results[0][0]
    });
    console.log( results[0][0]);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};
// damaged
const demageItems = async (req, res) => {
  try {
    const results = await inspModel.demageItems();
    console.log(results[0][0]);
    res.status(200).json({
      success: true,
      error: false,
      msg: "user wants to know damaged items",
      data: results[0][0]
    });

  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error",
    });
  }
};


//check status

const check_status = async (req, res) => {
    try {
        const P_TIM_KEY = req.body.P_TIM_KEY; // Ensure you extract the correct property
        const results = await inspModel.check_status(P_TIM_KEY);
 
        if (results[0] && results[0].length > 0) {
            res.status(200).json({ 
                success: true, 
                error: false, 
                msg: "Status details retrieved successfully", 
                data: results[0] 
            });
        } else {
            res.status(400).json({ 
                success: true, 
                error: false, 
                msg: "User does not exist", 
                data: results[0]
            });
        }
    } catch (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ 
            success: false, 
            error: true, 
            message: "Internal server error" 
        });
    }
};

module.exports = {
  inspected,
  repairItems,
  demageItems,
  check_status
};