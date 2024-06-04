const dbConn = require("../../config/dbConfigure");
const inspModel = require("../model/inspModel");


const inspected_items = async (req, res) => {
    const { TIM_Key , inspected_items, status, comments, image_path, created_by, disAgree_condition , TIIM_key, upd_key, uad_key} = req.body;

    try {
      const results = await inspModel.inspected_items(TIM_Key, inspected_items, status, comments, image_path,created_by, disAgree_condition , TIIM_key, upd_key, uad_key);    
        if (inspected_items === 1) {
            return res.status(200).json({
                success: true,
                message: "User agrees with condition.",
                data: results[0][0][0]
            });
        } else if (inspected_items === 0) {
            return res.status(200).json({
                success: true,
                message: "User does not agree with condition.",
                data: results[0][0][0]
            });
        }
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
    inspected_items
};