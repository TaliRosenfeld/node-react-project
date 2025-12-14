const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    productKode:{
        type:String,
        required:true,
        unique:true
    },
    type:{
    type:String,
    enum:["מחוגים","דיגיטלי"],
    default:"דיגיטלי"
    },
    color:{
        type:String,
        
    },
    amount:{
        type:Number,
        required:true
    },
    company:{
        type:String,
    },
    img:{
        type:String
    },
    descrabtion:{
        type:String
    },
    price:{
        type:Number
    }
},
{timestamps:true})
module.exports=mongoose.model("Product",productSchema)