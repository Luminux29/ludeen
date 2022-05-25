const express = require('express');
const About = require('../models/about');
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



router.get('',checkAuth ,(req,res,next) =>{
 

    About.find()
    .then((documents) =>{

        console.log("documents : " + documents);
        res.status(200).json({
            message: 'Request fetched successfully',
            about: documents
        }); 
    })
   


});


router.get('/:user_id',checkAuth ,(req,res,next) =>{

    About.find({_id: req.params.user_id})
    .then( about =>{
       
            res.status(200).json( {

                message:"Success!",
                about: about

      }); 
     })
    .catch(err=>{

        res.status(500).json({

            message: "An error occured",
            error: err

        });

    });


});



router.put("/:id",  multer({storage: storage}).single('logo'), (req,res, next) =>{

 
   var logo = req.body.logo;
   
    if(req.file){
        console.log("req file is existing!");     
        const  url = req.protocol + "://"+req.get("host");
        logo = url+"/files/"+req.file.filename;

    }


    const about = new About({


        _id : req.params.id,
        vision: req.body.vision ,
        mission:  req.body.mission,
        logo:  logo,
       

    });
 
    About.updateOne({_id: req.params.id}, about )
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