const dbConn = require("../../config/dbConfigure");

const upload_master = async (image_path) => {
    const query= 'CALL kodie_new.insert_item_mapping_communication_shivani(?)';
    return new Promise ((resolve, reject) =>{
     dbConn.query(query, [image_path], (err, result) =>{
        if (err){
            return reject(err);
        }
        resolve(result);
     })
    })    
   
  }



  module.exports = {
    upload_master
  };