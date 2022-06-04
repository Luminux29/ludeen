const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const requestsRoutes = require('./routes/requests');
const userRoutes = require('./routes/user');
const schoolRoutes = require('./routes/school');
const subjectRoutes = require('./routes/subjects');
const civilRoutes = require('./routes/civil');
const workRoutes = require('./routes/work');
const trainingRoutes = require('./routes/training');
const aboutRoutes = require('./routes/about');


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
app.use("/api/requests",requestsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/civils", civilRoutes);
app.use("/api/works",workRoutes);
app.use("/api/trainings",trainingRoutes);
app.use("/api/abouts",aboutRoutes);


//app.use(cors());
module.exports = app;