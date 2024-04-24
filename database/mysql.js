const mysql = require("mysql");

module.exports = class Database{
    constructor(){
        this.config = {
            host:"localhost",
            user:"root",
            password:"password",
            database:"shop"
        }
        this.connection = mysql.createConnection(this.config)
        this.connection.connect()
    }
    Login(data,callback){
        
        if(data["Type"]==="client"){
            var db = "users"
        }else{
            db = "sellers"
        }
        //check alsoe the type
        const query = `select * From ${db} where Email=? AND Password=?`
        this.connection.query(query,
        [data["Email"],data["Password"]],
        (err,res)=>{
            if (err){
                return callback(err,null)
            }
            else{
                if (res.length ===0){
                    return callback(null,false,null)
                }
                else{
                    if(db=="users"){
                        return callback(null,true,"user",res[0]["id"])
                    }else{
                        return callback(null,true,"seller",res[0]["id"])
                    }
                    
                }
            }
        
        }) 


    }

    GetProduct(callback){
        this.connection.query("select * from products",(err,res)=>{
            if(err){
                return  callback(err,null)
            }
            return callback(null,res)
        })
    }
    close(){
        this.connection.end()
    }
    Check(data,callback){
        this.connection.query("select * from products where id = ? and quantity>?",
        [data["id"],data["quantity"]],
        (err,res)=>{
            if (err) callback(err,null);
            else callback(null,[{"id":res[0].id,"quantity":data.quantity,"seller_id":res[0].seller_id} ,{"product":res[0]}])
        })
    }

    updatedata(data,callback){
        this.connection.query("UPDATE products SET quantity = quantity - ? WHERE seller_id = ? AND id = ?;",
        [data["quantity"],data["seller_id"],data["id"]],
    (err,res,row)=>{
        if(err) callback(err,null);
        else callback(null,true);
    })
    }
    //Test this
    add(data,callback){
        this.connection.query("insert into products (name,description,quantity,price,img,seller_id,category) values (?,?,?,?,?,?,?)",
        [data["name"],data["description"],data["quantity"],data["price"],data["img"],data["seller_id"],data["category"]],
    (err,res,row)=>{
        if(err) callback(err,null);
        else callback(null,true);
    })

    }
    delete(data,callback){
        this.connection.query("delete from products where id = ?",
        [data["id"]],
    (err,res,row)=>{
        if(err) {
            console.log(err)
            callback(err,null)}
        else {
            callback(null,true)}
    })
    }
    getinfos(data,callback){
        this.connection.query("select * from products where seller_id=?",data["id"],
    (err,res,row)=>{
        if(err) callback(err,null);
        else{
            const responce = []
            res.map((element)=>{responce.push({"id":element["id"],"name":element["name"],"quantity":element["quantity"],"category":element["category"]})})
            callback(null,responce)
        };
    })
    }
    
}


 
