const express = require("express")
const router = express.Router()
const BasketControllers = require("../controllers/BasketController")
const jwt=require("../middleware/verifyJWT")

router.post("/",jwt,BasketControllers.addToBasket)
router.get("/",jwt,BasketControllers.getUserBasket)
router.delete("/:id",jwt,BasketControllers.deleteFromBasket)

module.exports=router