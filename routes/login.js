const express = require('express');
const router = express.Router();
const path = require('path');
const {checkSchema,matchedData} = require("express-validator");
const Database = require("../database/mysql");
const {User} = require("../database/validationshema.js")
const cookieParser = require('cookie-parser');

router.use(express.urlencoded({extended:false}))

router.use(cookieParser());
router.use("/static",express.static(path.join(process.cwd(),"public")))

// check if the user / seller is login in 

const database = new Database();

router.post('/', checkSchema(User),function(req, res, next) {
    const data = matchedData(req);
    database.Login(data,(error,result,db,id)=>{
        if (error){
            console.log(error)
        }
        else{
            if(result==true){
                // check this
                res.cookie('id',id,{httponly:false,expires: new Date(Date.now() + 60 * 60 * 1000)})
                if(db=="user"){
                    res.sendFile(path.join(process.cwd(),'views/product.html'))
                }else{
                    res.sendFile(path.join(process.cwd(),'views/seller.html'))
                }
                
            }else{
                res.redirect("/")
            }
        }
        
    });
    
});


module.exports = router;
