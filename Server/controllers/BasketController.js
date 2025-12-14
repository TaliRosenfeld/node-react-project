const Basket = require("../models/Basket")
const addToBasket = async (req, res) => {
    const { id } = req.body
    if (!id)
        return res.status(400).json({ message: "all filed are required" })
    const b = await Basket.create({ userRef: req.user._id, product: id })
    res.json(b)
}
const deleteFromBasket = async (req, res) => {
    const  {id}  = req.params
    const basket = await Basket.findById(id)
    if (!basket) {
        return res.status(401).json({ message: "prouduct is not find" })
    }
    await basket.deleteOne()
    res.json("delete sucsses")

}
const getUserBasket = async (req, res) => {
    const {_id} = req.user
    console.log(_id);
    // const basket = await Basket.find().populate("product")

    const basket = await Basket.find({userRef:_id}).populate("product")
    // const basket = await Basket.find({userRef:_id})
    console.log(basket);
    res.json(basket)
}



module.exports = { addToBasket, getUserBasket ,deleteFromBasket}

