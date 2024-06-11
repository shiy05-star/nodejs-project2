const dbConn = require("../../config/dbConfigure");

// const upload_master = async (TIM_Key, inspected_items, status, comments, image_path,created_by, disAgree_condition ,TIIM_key, upd_key, uad_key) => {
//     const query= 'CALL kodie_new.insert_item_mapping_communication_shivani(?,?,?,?,?,?,?,?,?,?)';
//     return new Promise ((resolve, reject) =>{
//      dbConn.query(query, [TIM_Key, inspected_items, status, comments, image_path,created_by, disAgree_condition ,TIIM_key, upd_key, uad_key], (err, result) =>{
//         if (err){
//             return reject(err);
//         }
//         resolve(result);
//      })
//     })    
   
//   }


//multiple

const upload_masterMultiple = async (TIM_Key ,imagePaths) => {
    const query= 'call kodie_new.insert_itmc_shivani(?,?)';
    return new Promise ((resolve, reject) =>{
     dbConn.query(query, [TIM_Key,  imagePaths], (err, result) =>{
        if (err){
            return reject(err);
        }
        resolve(result);
     })
    })    
   
  }


  module.exports = {
    // upload_master
    upload_masterMultiple
  };