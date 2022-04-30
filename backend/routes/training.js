const express = require('express');
const Training = require('../models/training');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const { json } = require('body-parser');
const multer = require('multer');
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "backend/files");

    },
    filename: (req,file,cb) => {

        cb(null, file.originalname.replaceAll(" ", "").split('.')[0] + '-' + Date.now() + '.' + getFileExt(file.originalname));

    }

});


router.post("", multer({storage: storage}).single('certificate'), checkAuth, (req,res,next) =>{




    let certificate = req.body.certificate;
    if(req.file){
        const  url = req.protocol + "://"+req.get("host");
        certificate = url+"/files/"+req.file.filename;

    }

    console.log("certificate", certificate);
   
    const training = new Training({

        title: req.body.title ,
        fromDate:  req.body.fromDate,
        toDate:  req.body.toDate,
        noOfHours: req.body.noOfHours,
        typeOfLearningDevelopment: req.body.typeOfLearningDevelopment,
        conductor: req.body.conductor,
        certificate: certificate,
        user_id: req.body.user_id
        
    });

    training.save().then(result => {
        res.status(201).json({
            message: 'Request added successfully',
            request: result
        });
    })
    .catch(err=>{

        res.status(500).json({

            message: "Something went wrong",
            error: err

        });
    });
  
    
});


router.get('',checkAuth ,(req,res,next) =>{
 
    //res.set('Access-Control-Allow-Origin', 'http://localhost:4200');


    Training.find()
    .then((documents) =>{

        res.status(200).json({
            message: 'Request fetched successfully',
            trainings: documents
        }); 
    })
   


});



// router.get('/:status',checkAuth ,(req,res,next) =>{

//     Request.find({status: req.params.status})
//     .then( post =>{
       
//             res.status(200).json( {

//                 message:"Success!",
//                 requests: post

//       }); 
//      })
//     .catch(err=>{

//         res.status(500).json({

//             message: "An error occured",
//             error: err

//         });

//     });



// });



// router.get("/find/:id",checkAuth, (req, res, next) =>{

//     Request.findById(req.params.id).then( post =>{
//         if(post){
//             res.status(200).json(post);
//         }
//         else{

//             res.status(404).json({

//                 message: "not found"

//             });
//         }

//     })
//     .catch(err=>{

//         res.status(500).json({

//             message:"An error occured",
//             error: err

//         })

//     });
// })

router.delete("/:id",checkAuth, (req,res,next) => {

    Training.deleteOne({_id: req.params.id})
    .then((result)=>{
        res.status(200).json({
            message: "Request deleted!"
        });

    })
    .catch(err=>{

        res.status(500).json({

            message: 'An error occurred while deleting. check logs',
            error:err

        });

    });
    
});



router.put("/:id",  multer({storage: storage}).single('certificate'), (req,res, next) =>{

 
   var certificate = req.body.certificate;
   
    if(req.file){
        console.log("req file is existing!");     
        const  url = req.protocol + "://"+req.get("host");
        certificate = url+"/files/"+req.file.filename;

    }


    const training = new Training({


        _id : req.params.id,
        title: req.body.title ,
        fromDate:  req.body.fromDate,
        toDate:  req.body.toDate,
        noOfHours: req.body.noOfHours,
        typeOfLearningDevelopment: req.body.typeOfLearningDevelopment,
        conductor: req.body.conductor,
        certificate: certificate,
        user_id: req.body.user_id

    });
 
    Training.updateOne({_id: req.params.id}, training )
    .then(result =>{
        res.status(200).json({message:'update successful'});
    })
    .catch(err=>{

        console.log(JSON.stringify(err));
        
        res.status(500).json({

            error: err,
            message: "Something went wrong!"
        })

    })

})



function getFileExt(fileName){
    return fileName.split('.').pop();
}

module.exports = router;