const mongoose = require("mongoose")

const basketSchema = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        Ref: "User"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:"Product"
    },
    }
    , { timestamps: true })

module.exports = mongoose.model("Basket", basketSchema)