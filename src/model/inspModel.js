const dbConn = require("../../config/dbConfigure");

const inspected = async (data) => {
  console.log(data, "data");
  const query = 'CALL kodie_new.insert_item_mapping_communication_shivani(?,?,?,?,?,?,?,?)';
  return new Promise((resolve, reject) => {
    dbConn.query(query, [data.TIM_Key, data.inspected_items, data.timc_status, data.comments, data.created_by, data.TIIM_key, data.upd_key, data.uad_key], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    })

  })

}


const inspectedImages = async (data, image_path) => {
  console.log(data, "data");
  const query = 'CALL kodie_new.USP_KODIE_UPLOAD_DOCUMENT_FILES_SS(?,?)';
  return new Promise((resolve, reject) => {
    dbConn.query(query, [data, image_path], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    })

  })

}

//==========================

const repairItems = async () => {
  const query = 'CALL kodie_new.USP_KODIE_GET_REPAIR_STATUS_SS()';
  return new Promise((resolve, reject) => {
    dbConn.query(query, [], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    })

  })
}
// damaged
const demageItems = async () => {
  const query = 'CALL kodie_new.USP_KODIE_GET_DAMAGED_STATUS_SS()';
  return new Promise((resolve, reject) => {
    dbConn.query(query, [], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    })

  })
}


//check statu
const check_status = async (P_TIM_KEY) => {

  const sql = "CALL kodie_new.`USP_KODIE_GET_R/D_STATUS_SS`(?)";
  const result = mysqlConnection.promise().query(sql, [P_TIM_KEY]);
  console.log(result, "result")
  return result;

}

module.exports = {
  inspected,
  inspectedImages,
  repairItems,
  demageItems,
  check_status

};