const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Work = require('../models/work');

//CREATE WORK INFO


router.post("", checkAuth, (req,res,next) =>{


  const work = new Work({
    toDate: req.body.toDate ,
    fromDate: req.body.fromDate ,
    position: req.body.position ,
    dept: req.body.dept ,
    monthlySalary: req.body.monthlySalary,
    status: req.body.status,
    salaryGrade : req.body.salaryGrade,
    government : req.body.government,
    user_id : req.body.user_id


  });

  work.save().then(result => {
      res.status(201).json({
        message: 'work added successfully',
        work: result
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

    Work.deleteOne({_id: req.params.id})
    .then((result)=>{
        console.log(result);
        res.status(200).json({
            message: "Work deleted!"
        });

    })
    .catch(err =>{
    
        res.status(500).json({
            error:err,
            message:"Work deletion failed. Error occurred."
        });

    });
    
});




router.put("/:id", checkAuth, (req,res, next) =>{


    const work = new Work({

        _id: req.params.id,
        toDate: req.body.toDate ,
        fromDate: req.body.fromDate ,
        position: req.body.position ,
        dept: req.body.dept ,
        monthlySalary: req.body.monthlySalary,
        status: req.body.status,
        salaryGrade : req.body.salaryGrade,
        government : req.body.government
    
    });
 

    Work.updateOne({_id: req.params.id}, work )
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

 
    Work.find()
    .then((documents) =>{
    
        res.status(200).json({
            message: 'Works fetched successfully',
            works: documents
        });
    })
    .catch(err=>{

        res.status(500).json({

            message: 'error occured',
            error: err

        });
    });



});




module.exports = router;
