const express = require('express');
const router = express.Router();
const Database = require("../database/mysql");
const path = require('path');


router.use("/static",express.static(path.join(process.cwd(),"public")))

router.use(express.json())

const database = new Database();

router.get("/",function(req,res,next){
    database.GetProduct((err,data)=>{
        if (err){
            res.send({})
        }else{
            res.send(data)
        }
    })
})



module.exports = router;
