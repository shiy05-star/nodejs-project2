const dbConn = require("../../config/dbConfigure");
const upModel = require("../model/upModel");
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generating unique filename
  }
});

const upload = multer({ storage: storage }).array('images', 10); // 'images' is the field name for multiple files, 10 is the maximum number of files allowed

const upload_master = async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {

      console.log(err);
      return res.status(500).json({ message: "Multer error occurred", error: err });
    } else if (err) {
      
      console.log(err);
      return res.status(500).json({ message: "Unknown error occurred", error: err });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files were uploaded" });
    }

    const image_path = req.files.map(file => file.path); 

    try {
            const results = await upModel.upload_master(image_path);
      return res.status(200).json({ message: "Images uploaded successfully", results });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Error uploading images", error: err });
    }
  });
};

module.exports = {
  upload_master
};
