const dbConn = require("../../config/dbConfigure");

const inspected = async (TIM_Key, inspected_items, status, comments, imagePaths,created_by ,TIIM_key, upd_key, uad_key) => {
   console.log(imagePaths,"imagePaths");
  
  const query= 'CALL kodie_new.insert_item_mapping_communication_shivani(?, ?,?, ?, ?, ?, ?,?,?)';
    return new Promise ((resolve, reject) =>{
     dbConn.query(query, [TIM_Key,inspected_items,status, comments, imagePaths,created_by,TIIM_key, upd_key,uad_key], (err, result) =>{
        if (err){
            return reject(err);
        }
        resolve(result);
     })
    })    
   
  }



  module.exports = {
    inspected
  };