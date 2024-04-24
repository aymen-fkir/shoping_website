// define your shema for data base
const User = {
    Email:{
        notEmpty:true,
    },
    Password:{
        notEmpty:true,
    },
    Type:{
        notEmpty:true,
    }
}



const Product = {
    name:{
        notEmpty:true,
        isLenght:{min:8}
    },
    description:{
        notEmpty:true,
        isLenght:{min:7}
    },
    quantity:{
        notEmpty:true,
    },
    price:{
        notEmpty:true,
    },

}

const Checkquantity = {
    id:{
        isInt:true,
    },
    quantity:{
        isInt:true,
    }
}

const Checkorder = {
    address: {
        notEmpty:true,
    },
    email: {
        notEmpty:true,
    },
    lastname: {
        notEmpty:true,
    },
    name: {
        notEmpty:true,
    },
    payment_method: {
        notEmpty:true,
    },
    phone_number: {
        notEmpty:true,
    },
    products:{
        notEmpty:true
    },
    reduction_code:{
        notEmpty:true,
    }
}

module.exports={User,Product,Checkquantity,Checkorder}