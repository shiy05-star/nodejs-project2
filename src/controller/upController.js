const multer = require("multer");
const path = require("path");
const upModel = require("../model/upModel");
//single_image
// const upload_master = async (req, res) => {
  
//   const { TIM_Key , inspected_items, status, comments, image_path, created_by, disAgree_condition , TIIM_key, upd_key, uad_key} = req.body;
 
//   console.log(req.files[0].originalname, "sasasas");
//   try {
//     const image_path = req.files[0].originalname;
//     const result = await upModel.upload_master( TIM_Key , inspected_items, status, comments, image_path, created_by, disAgree_condition , TIIM_key, upd_key, uad_key);
//     return res.status(200).json({ 
//       success: true,
//       image_url: `http://localhost:8000/image/${req.files[0].originalname}`,
//       message: "Image uploaded successfully", 
//       results: result[0][0][0]
//     });
  
//   } catch (err) {
//     console.error("Error uploading image:", err);
//     return res.status(500).json({ message: "Error uploading image", error: err });
//   } 
// };


//multiple_image


const upload_master = async (req, res) => {
  const { TIM_Key , inspected_items, status, comments, created_by , TIIM_key, upd_key, uad_key} = req.body;

  try {
  
    const imagePaths = req.files.map(file => file.originalname); 
    
    const results = []; 
    // Loop through each image path and upload it
    for (const imagePath of imagePaths) {
      const result = await upModel.upload_masterMultiple(
        TIM_Key , inspected_items, status, comments, imagePath, created_by, TIIM_key, upd_key, uad_key
      );
      results.push(result[0][0][0]);
    }
    
  
    const imageUrls = imagePaths.map(imagePath => `http://localhost:8000/image/${imagePath}`);
    
    return res.status(200).json({ 
      success: true,
      image_urls: imageUrls, 
      message: "Images uploaded successfully", 
      results: results
    });
  
  } catch (err) {
    console.error("Error uploading images:", err);
    return res.status(500).json({ message: "Error uploading images", error: err });
  } 
};


module.exports = {
  upload_master
};
