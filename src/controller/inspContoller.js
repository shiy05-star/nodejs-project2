const dbConn = require("../../config/dbConfigure");
const inspModel = require("../model/inspModel");

const inspected = async (req, res) => {
  console.log("req.files", req.files);

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: 'Please select an Image.',
      });
    }
    // console.log("hello");

    const result = await inspModel.inspected(req.body);
    console.log(result[0][0].TIMC_KEY, "result");
    console.log(req.files.length, "length")
    const timc_key = result[0][0].TIMC_KEY;
    for (let i = 0; i < req.files.length; i++) {
      console.log(req.files[i].originalname, "asasa");
      // console.log("id",timc_key);
      //console.log(req.files[0][i].originalname, "112211asasa");
      const result_images = await inspModel.inspectedImages(timc_key, req.files[i].originalname);
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
    const results = await inspModel.check_status();
    console.log(results[0]);
    res.status(200).json({
      success: true,
      error: false,
      msg: "User Status check succeffully",
      data: results[0]
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


module.exports = {
  inspected,
  repairItems,
  demageItems,
  check_status
};