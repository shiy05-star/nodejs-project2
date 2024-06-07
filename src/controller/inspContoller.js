const dbConn = require("../../config/dbConfigure");
const inspModel = require("../model/inspModel");

const inspected = async (req, res) => {
    
    const { TIM_Key, inspected_items, status, comments, created_by, TIIM_key, upd_key, uad_key } = req.body;
    if (!TIM_Key ||!inspected_items ||!status ||!comments ||!image_path ||!created_by  ||!TIIM_key ||!upd_key ||!uad_key) {
        return res.status(400).json({
            success: false,
            error: true,
            message: "All fields are required!"
        });
    }
 console.log(typeof TIM_Key );
    if (typeof TIM_Key !== 'number' || typeof inspected_items !== 'number' || typeof status !== 'string' || typeof comments!== 'string' || typeof image_path!== 'string' || typeof created_by!== 'number' || typeof TIIM_key!== 'number' || typeof upd_key!== 'number' || typeof uad_key!== 'number') {
        return res.status(400).json({
            success: false,
            error: true,
            message: "Invalid data type for one or more fields"
        });
        
    }
    console.log(typeof comments);
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: 'Please select an Image.',
            });
        }
        console.log("hello");
        
          
        const imagePaths = req.files.map(file => file.originalname);        
        const results = [];
        for (const imagePath of imagePaths) {
            const result = await inspModel.inspected(
                TIM_Key, inspected_items, status, comments, imagePath, created_by, TIIM_key, upd_key, uad_key
            );
            results.push(result[0][0]);
        }
        

        const imageUrls = imagePaths.map(imagePath => `http://localhost:8000/image/${imagePath}`);

        if (inspected_items === 1 || inspected_items === 0) {
            return res.status(200).json({
                success: true,
                image_urls: imageUrls,
                message: "Details added successfully",
                // data: results[0][0][0] 
            });
        
        }else{
          return res.status(200).json({
            success: true,
            error: false,
            message: "incorrect field details",
            // data: results[0][0][0]
        
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
    inspected
};
