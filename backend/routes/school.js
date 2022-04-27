const express = require('express');
const School = require('../models/school');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


//CREATE SCHOOL INFO


router.post("", checkAuth, (req,res,next) =>{

  console.log(req.body)

  const school = new School({
    nameOfSchool : req.body.nameOfSchool,
    course: req.body.course,
    fromYear: req.body.fromYear,
    toYear: req.body.toYear,
    highestLevel: req.body.highestLevel,
    yearGraduated : req.body.yearGraduated,
    type: req.body.type,
    honor : req.body.honors,
    user_id: req.body.user_id

  });

  school.save().then(result => {
      res.status(201).json({
          message: 'School added successfully',
         school: result
      });
  })
  .catch(err=>{

      res.status(500).json({

          message: "Something went wrong",
          error: err

      });
  });


});



module.exports = router;
