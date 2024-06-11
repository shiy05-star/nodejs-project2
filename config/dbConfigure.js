
'user strict';
 
const mysql = require('mysql2');
 
const dbConn = mysql.createConnection({
  
  host: "47.247.174.18",
  user: "Kodiemysql", // USER NAME
  database: "kodie_new", // DATABASE NAME
  password: "Cylsys@Kodie@2",
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected successfully");
});
module.exports = dbConn;