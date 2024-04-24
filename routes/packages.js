const express = require('express');
const router = express.Router();
const path = require('path');
const {body,matchedData,checkSchema} = require("express-validator");
const {Checkorder} = require("../database/validationshema")
const Database = require('../database/mysql');

const database = new Database();
router.use("/static",express.static(path.join(process.cwd(),"public")))

router.use(express.json())

router.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'packages.html'));
});


router.post("/check",body('*.id').isInt(),body('*.quantity').isInt(),async function(req,res,next){
    try{
        var data = matchedData(req);
        console.log(req.body)
        data = Array.from(Object.values(data))
        const products = []
        const infos = []
        const result = await Promise.all(data.map(async(element)=>{
          return new Promise((resolve,reject)=> {
            database.Check(element,(err,res)=>{
              if(err){
                reject(err)
              }else{
                products.push(res[1])
                infos.push(res[0])
                resolve(res)
              }
            });
          });
        })
      )
      res.send([products,infos])  
          
    }catch(error){
      console.log(error)
        res.send({})
    }
})

router.get("/submit",(req,res)=>{
  
  res.sendFile(path.join(process.cwd(), 'views', 'confirmation.html'))
})

router.post("/orders",checkSchema(Checkorder),async (req,res)=>{
  try{
      const data = matchedData(req)
      const result = await Promise.all(data["products"].map(async(element)=>{
        return new Promise((resolve,reject)=> {
          database.updatedata(element,(err,res)=>{
            if(err){
              reject(err)
            }else{
              resolve(res)
            }
          });
        });
      })
    )
    const allSettled  = result.every(element=>element ===true)
    if (allSettled) {res.send({status:200})}
    else {res.send({status:400})}

  }catch(error){
    res.send({status:400})

  }
  
  

})

module.exports = router;