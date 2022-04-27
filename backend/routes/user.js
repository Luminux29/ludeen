const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const { restart } = require('nodemon');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');


const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "backend/files");

    },
    filename: (req,file,cb) => {

        cb(null, file.originalname.replaceAll(" ", "").split('.')[0] + '-' + Date.now() + '.' + getFileExt(file.originalname));

    }

});

router.put("/changepass/:id", checkAuth, (req, res, next)=>{
    
    
    bcrypt.hash(req.body.newpass, 10)
    .then(hash =>{

        User.updateOne({_id: req.params.id}, {

            password: hash

        })
        .then(result =>{
            res.status(200).json({
                message:'update successful',
                result: result
            });
        })
        .catch(err =>{
    
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            });
        })


    });





})


router.post("/signup", multer({storage: storage}).single('profilePic'), (req,res, next) =>{

    console.log(req.body.status);
    const url = req.protocol + '://'+ req.get('host');
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{

        const faculty = new User({

          // profilePic: url+ '/files/' + req.file.filename,
           EmployeeNumber: req.body.EmployeeNumber,
           LastName: req.body.LastName,
           FirstName: req.body.FirstName,
           MidInit: req.body.MidInit,
           NameExtention: req.body.NameExtention,
           birthdate: req.body.birthdate,
           age: req.body.age,
           PlaceOfBirth: req.body.PlaceOfBirth,
           gender: req.body.gender,
           CivilStatus: req.body.CivilStatus,
           height: req.body.height,
           weight: req.body.weight,
           BloodType: req.body.BloodType,
           gsis: req.body.gsis,
           pagibig: req.body.pagibig,
           sss: req.body.sss,
           tin: req.body.tin,
           citizenship: req.body.citizenship,
           r_zipCode: req.body.r_zipCode,
           r_lotNo: req.body.r_lotNo,
           r_street: req.body.r_street,
           r_village: req.body.r_village,
           r_brgy: req.body.r_brgy,
           r_city: req.body.r_city,
           r_province: req.body.r_province,
           p_zipCode: req.body.p_zipCode,
           p_lotNo: req.body.p_lotNo,
           p_street: req.body.p_street,
           p_village: req.body.p_village,
           p_brgy: req.body.p_brgy,
           p_city: req.body.p_city,
           p_province: req.body.p_province,
           email: req.body.email,
           altEmail: req.body.altEmail,
           password: hash,
           TelNo: req.body.TelNo,
           MobileNo: req.body.MobileNo,
           profilePic: url +'/files/'+ req.file.filename

         });


        //save user
        faculty.save()
        .then(result => {

            res.status(201).json({
                message: 'User created',
                result: result
            });

        })
        .catch(err => {
            res.status(500).json({
                error:err,
                message: "Error occurred."
            });
        })

    });


});

router.get('/faculty/:status', checkAuth ,(req,res,next) =>{

  

    User.find().where('role').equals('Faculty')
    .where('status').equals(req.params.status)
    .then( post =>{
       
            res.status(200).json( {

                message:"Success!",
                users: post

      }); 
     })
    .catch(err=>{

        res.status(500).json({

            message: "An error occured",
            error: err

        });

    });



});

router.delete("/:id",checkAuth, (req,res,next) => {

    User.deleteOne({_id: req.params.id})
    .then((result)=>{
        res.status(200).json({
            message: "User deleted!"
        });

    })
    .catch(err =>{
       
        res.status(500).json({
            error:err,
            message:"Error occurred."
        });

    });
    
});

router.post("/checkpass/:id", checkAuth , (req,res,next) => {


     User.findOne({ _id: req.params.id})
     .then(user =>{

        if(!user){

            //no account
            return res.status(401).json({message: 'No account found'});
        }
        else{
       

            //fetching compare password
            return bcrypt.compare(req.body.password, user.password);

        }

     })
     .then(result =>{

        if(!result){

            //wrong password
            return res
            .status(401)
            .json({       
                isCorrect: false,
                message:"Wrong password!"
            });
        }
        else{

            return res
            .status(200)
            .json({       
                isCorrect: true,
                message: "Correct pass!"
            });


        }


     })
     .catch(err=>{
      
        console.log(err);
        return res
        .status(500)
        .json({       
            message: "Something went wrong!",
            error: err
        });


     })


});

router.post("/login", (req,res,next) => {


    let fetchedUser ;
    let haveAccount;

    //does email exist?
    User.findOne({ email: req.body.email})
    .then(user =>{
       
        if(!user){
            console.log("NO ACCOUNT");
            haveAccount = false;
            return res.status(401).json({message: 'No account found'});
        }
        else{
            console.log("FETCHING USER");
            haveAccount = true;
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);

        }
        
     
    })
    .then(result =>{
   
            if(!result){
                return res
                .status(401)
                .json({       
                    message: 'Wrong password'
                });
            }


        //create json web token for authentication 
      
        if(haveAccount){

            const token = jwt.sign(
                {email: fetchedUser.email, u_id: fetchedUser._id, role: fetchedUser.role },
                'secret_this_should_be_longer', { expiresIn: "1h" }
            );
    
    
            res.status(200).json({
    
                token:token,
                expiresIn: 3600,
                u_id: fetchedUser._id,
                role: fetchedUser.role,
                course: fetchedUser.course,
                year: fetchedUser.year, 
                section: fetchedUser.section,
                status: fetchedUser.status
    
            });
        

        }

    })
    .catch(err =>{

        console.log(err);

        return res.status(401).json({
        message: 'Error occurred',
        error: err
    });

    })
})




router.put("/:id", checkAuth, multer({storage: storage}).single('profilePic'), (req,res, next) =>{


    let profilePic = req.body.profilePic;

    if(req.file){
        const  url = req.protocol + "://"+req.get("host");
        profilePic = url+"/files/"+req.file.filename;

    }



    const user = new User({

  
        _id: req.body.id,
        EmployeeNumber: req.body.EmployeeNumber,
        LastName: req.body.LastName,
        FirstName: req.body.FirstName,
        MI: req.body.MI,
        NameExtention: req.body.NameExtention,
        birthdate: req.body.birthdate,
        PlaceOfBirth: req.body.PlaceOfBirth,
        gender: req.body.gender,
        CivilStatus: req.body.CivilStatus,
        height: req.body.height,
        weight: req.body.weight,
        BloodType: req.body.BloodType,
        gsis: req.body.gsis,
        pagibig: req.body.pagibig,
        philHealth: req.body.philHealth,
        sss: req.body.sss,
        tin: req.body.tin,
        citizenship: req.body.citizenship,
        r_zipCode: req.body.r_zipCode,
        r_lotNo: req.body.r_lotNo,
        r_street: req.body.r_street,
        r_village: req.body.r_village,
        r_brgy: req.body.r_brgy,
        r_city: req.body.r_city,
        r_province: req.body.r_province,
        p_zipCode: req.body.p_zipCode,
        p_LotNo: req.body.p_LotNo,
        p_street: req.body.p_street,
        p_village: req.body.p_village,
        p_brgy: req.body.p_brgy,
        p_city: req.body.p_city,
        p_province: req.body.p_province,
        TelNo: req.body.TelNo,
        MobileNo: req.body.MobileNo,
        email:req.body.email,
        altEmail: req.body.altEmail,
        status: req.body.status,
        role: req.body.role,
        profilePic : profilePic
  
  


    });
     
    User.updateOne({_id: req.params.id}, user )
    .then(result =>{
        res.status(200).json({
            message:'update successful',
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


router.get('/:role', checkAuth, (req, res, next) =>{

   
   User.find({role: req.params.role})
   .then(documents =>{

    res.status(200).json({

        message: "Success!",
        users: documents

    });

   })
   .catch(err=>{

    res.status(500).json({

        message:"error occurred",
        error:err

    });

   });





});

router.get('/find/:id', checkAuth ,(req, res, next) =>{

    User.findById(req.params.id)
    .then( user =>{
        if(user){

            res.status(200).json(user);
        }
        else{

            res.status(404).json({

                message: "not found",
                

            });
        }

    })
    .catch(err =>{

        res.status(500).json({
            message: "Something went wrong",
            error: err
            });
    });
 
 
 });



router.get('',checkAuth ,(req,res,next) =>{

  
    const userQuery = User.find();

   
    userQuery
    .then((documents) =>{
    

        res.status(200).json({
            message: "Success!",
            users: documents

        });
    })
    .catch(err=>{

        res.status(500).json({


            error:err,
            message: "something went wrong "

        });

    });
    





});


function getFileExt(fileName){
    return fileName.split('.').pop();
}

// router.get('/findnames',checkAuth ,(req,res,next) =>{

//     const u_id = +req.query.user_id;
//     const f_id = +req.query.faculty_id;
//     const postQuery = Request.find();
//     let fetchedRequests;

//     if(pageSize && currentPage){
//         postQuery
//         .skip(pageSize * (currentPage - 1))
//         .limit(pageSize);
//     }

//     postQuery
//     .then((documents) =>{
//         fetchedRequests = documents;
//       return Request.count();  
//     })
//     .then(count => {
//         res.status(200).json({
//             message: 'Request fetched successfully',
//             requests: fetchedRequests,
//             maxRequests: count
//         });
//     });




// });

module.exports = router;