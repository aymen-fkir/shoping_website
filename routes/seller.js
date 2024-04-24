const express = require('express');
const router = express.Router();
const Database = require("../database/mysql");
const path = require('path');


router.use("/static",express.static(path.join(process.cwd(),"public")))
router.use(express.json())

const database = new Database();

router.post("/add",function(req,res){
    const data = req.body;
    database.add(data,(err,responce)=>{
        if(err) res.send({status:401})
        else res.send({status:200})
    })
})

router.post("/delete",function(req,res){
    const data = req.body;
    console.log(data)
    database.delete(data,(err,responce)=>{
        if(err) {
            res.send({status:401})}
        else res.send({status:200})
    })
})


router.post("/",function(req,res){
    const data = req.body;
    database.getinfos(data,(err,responce)=>{
        if(err) res.send({status:401,data:null})
        else res.send({status:200,data:responce})
    })
})


router.get("/addproduct",function(req,res){
    res.sendFile(path.join(process.cwd(),"views","addproduct.html"))
})

router.post("/recieveproducts",(req,res)=>{
    const data = req.body
    database.add(data,(err,responce)=>{
        if(err) res.send({"status":401});
        else res.send({"status":200});
    })

})

module.exports = router;





