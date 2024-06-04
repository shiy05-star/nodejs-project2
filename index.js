const express = require("express");
const bodyParser= require("body-parser");
const dbConn = require("./config/dbConfigure");
const inspRoutes = require("./src/routes/inspRoutes");
const upRoutes = require ("./src/routes/upRoutes");


const app =express();
const port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.use('/api/v2/',inspRoutes);
app.use('/api/v2/',upRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
 
 });

