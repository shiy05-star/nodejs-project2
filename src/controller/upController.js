const multer = require("multer");
const path = require("path");
const upModel = require("../model/upModel");


const upload_master = async (req, res) => {
  
  const { TIM_Key , inspected_items, status, comments, image_path, created_by, disAgree_condition , TIIM_key, upd_key, uad_key} = req.body;
  // const inspected = req.body;
  //    if (
  //     typeof inspected.TIM_Key !== 'number' ||
  //     typeof inspected.inspected_items !== 'number' ||
  //     typeof inspected.status !== 'string' ||
  //     typeof inspected.comments !== 'string' ||
  //     typeof inspected.created_by !== 'number' ||
  //     typeof inspected.disAgree_condition !== 'string' ||
  //     typeof inspected.TIIM_key !== 'number' ||
  //     typeof inspected.upd_key !== 'number' ||
  //     typeof inspected.uad_key !== 'number' 
  //   )
  //   {
  //     return res.status(400).json({
  //       error:true,
  //       msg:"invalid input parameters"
  //     });
  //   }
  console.log(req.files[0].originalname, "sasasas");
  try {
    const image_path = req.files[0].originalname;
    const result = await upModel.upload_master( TIM_Key , inspected_items, status, comments, image_path, created_by, disAgree_condition , TIIM_key, upd_key, uad_key);
    return res.status(200).json({ 
      success: true,
      image_url: `http://localhost:8000/image/${req.files[0].originalname}`,
      message: "Image uploaded successfully", 
      results: result[0][0][0]
    });
  
  } catch (err) {
    console.error("Error uploading image:", err);
    return res.status(500).json({ message: "Error uploading image", error: err });
  } 
};

module.exports = {
  upload_master
};
