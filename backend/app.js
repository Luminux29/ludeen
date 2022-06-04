const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/user');



//const cors = require('cors');
const app = express();


mongoose.connect("mongodb+srv://Bugsboni:raymond24@fmis.xsjz1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() =>{
console.log('Connected to database');
})
.catch(() =>{
    console.log('Failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) =>{
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, *");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS, *");
    next();
    
});



app.use("/files", express.static(path.join("backend/files")));
app.use("/api/users", userRoutes);



//app.use(cors());
module.exports = app;