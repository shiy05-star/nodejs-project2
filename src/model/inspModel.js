const dbConn = require("../../config/dbConfigure");

 const inspected = async (data) => {
  console.log(data,"data"); 
  const query= 'CALL kodie_new.insert_item_mapping_communication_shivani(?,?,?,?,?,?,?,?)';
    return new Promise ((resolve, reject) =>{
     dbConn.query(query, [data.TIM_Key,data.inspected_items,data.timc_status,data.comments,data.created_by,data.TIIM_key, data.upd_key,data.uad_key], (err, result) =>{
        if (err){
            return reject(err);
        }
        resolve(result);
     })
     
    })    
   
  }


  const inspectedImages = async (data,image_path) => {
    console.log(data,"data"); 
    const query= 'CALL kodie_new.USP_KODIE_UPLOAD_DOCUMENT_FILES_SS(?,?)';
      return new Promise ((resolve, reject) =>{
       dbConn.query(query, [data,image_path], (err, result) =>{
          if (err){
              return reject(err);
          }
          resolve(result);
       })
       
      })    
     
    }
  
  module.exports = {
    inspected,
    inspectedImages
  };