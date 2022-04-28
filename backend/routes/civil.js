const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Civil = require('../models/civil');

//CREATE CIVIL SERVICE ELIGIBILITY INFO


router.post("", checkAuth, (req,res,next) =>{

  console.log(req.body)

  const civil = new Civil({
    nameOfCivilServiceEligibility: req.body.nameOfCivilServiceEligibility,
    rating: req.body.rating,
    dateOfExamination: req.body.dateOfExamination,
    placeOfExamination: req.body.placeOfExamination,
    licenseNo: req.body.licenseNo,
    user_id: req.body.user_id,
    dateOfValidity: req.body.dateOfValidity

  });

  civil.save().then(result => {
      res.status(201).json({
        message: 'Civil added successfully',
        civil: civil
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

    Civil.deleteOne({_id: req.params.id})
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

    

    const civil = new Civil({

        _id: req.params.id,
        nameOfCivilServiceEligibility: req.body.nameOfCivilServiceEligibility,
        rating: req.body.rating,
        dateOfExamination: req.body.dateOfExamination,
        placeOfExamination: req.body.placeOfExamination,
        licenseNo: req.body.licenseNo,
        dateOfValidity: req.body.dateOfValidity
        
    
    });
 

    Civil.updateOne({_id: req.params.id}, civil )
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

 
    Civil.find()
    .then((documents) =>{
    
        res.status(200).json({
            message: 'Schools fetched successfully',
            civils: documents
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
