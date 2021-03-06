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



router.delete("/:id",checkAuth, (req,res,next) => {

    School.deleteOne({_id: req.params.id})
    .then((result)=>{
        console.log(result);
        res.status(200).json({
            message: "School deleted!"
        });

    })
    .catch(err =>{
    
        res.status(500).json({
            error:err,
            message:"School deletion failed. Error occurred."
        });

    });
    
});




router.put("/:id", checkAuth, (req,res, next) =>{

    

    const school = new School({

        _id: req.params.id,
        nameOfSchool:req.body.nameOfSchool,
        course:req.body.course,
        fromYear:req.body.fromYear,
        toYear:req.body.toYear,
        highestLevel:req.body.highestLevel,
        yearGraduated:req.body.yearGraduated,
        honors:req.body.honors,
        type:req.body.type
    
    });
 

    School.updateOne({_id: req.params.id}, school )
    .then(result =>{
        res.status(200).json({
            message:'Subject update successful!',
            result: result
        });
    })
    .catch(err =>{

        res.status(500).json({

            message: 'Something went wrong',
            error: err

        });

    })

})



router.get('',checkAuth ,(req,res,next) =>{

 
    School.find()
    .then((documents) =>{
    
        res.status(200).json({
            message: 'Schools fetched successfully',
            subjects: documents
        });
    })
    .catch(err=>{

        res.status(500).json({

            message: 'error occured',
            error: err

        });
    });



});


router.get('/:user_id',checkAuth ,(req,res,next) =>{

    School.find({user_id: req.params.user_id})
    .then( school =>{
       
            res.status(200).json( {

                message:"Success!",
                schools: school

      }); 
     })
    .catch(err=>{

        res.status(500).json({

            message: "An error occured",
            error: err

        });

    });



});


module.exports = router;
