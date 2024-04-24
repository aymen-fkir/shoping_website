const createError = require('http-errors');
const express = require('express');
const path = require('path');


app = express();

app.set('view engine', 'jade');

app.use('/static', express.static(path.join(__dirname, 'public')))
const packages_router = require("./routes/packages");
const Seller_router = require("./routes/seller");
const Login_router = require("./routes/login");
const GetData_router = require("./routes/client")

app.use("/login",Login_router);
app.use("/products",GetData_router);
app.use("/packages",packages_router);
app.use("/seller",Seller_router);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"views/login.html"))
})

app.listen(3000,()=>{
    console.log("listening in port 3000")
})



