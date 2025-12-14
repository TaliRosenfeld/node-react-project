const Basket = require("../models/Basket")
const Product = require("../models/Product")

const createProduct = async (req, res) => {
    const { productKode, type, amount, company, color,img ,descrabtion,price} = req.body
    if(!productKode || !amount ||!price || !type){
         return res.status(400).json({message:"productKode and amount are requierd"})
    }
    const duplicateProd = await Product.findOne({productKode:productKode})
        if(duplicateProd){
            return res.status(409).json({message:"duplicate prod"})
        }
    const product = await Product.create({ productKode, type, amount, company, color,img ,descrabtion,price})
    if(!product){
        return res.status(400).json({message:"Bad request"})
    }
    res.json(product)
}
const getAllProduct = async (req, res) => {
    const product = await Product.find()
    res.json(product)
}
const getProductById = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.json(product)
}
const updateProduct = async (req, res) => {
    const {id,type,color,amount,img,company,descrabtion,price} = req.body
    // console.log(id);
    const product = await Product.findById(id)
     product.type = type
    product.amount = amount
    product.company = company
    product.color = color
    product.descrabtion = descrabtion
    product.img = img
    product.price = price
    const savethis = await product.save()
    res.json(savethis)
}
const deleteProduct = async (req, res) => {   
    const {id} = req.params
    await Basket.deleteMany({id})
    // const dBasket=await Basket.deleteMany({product:_id})
    const product = await Product.findById(id)
    const result = await product.deleteOne()
    res.send(`this Product deleted`)
}

module.exports = { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct }