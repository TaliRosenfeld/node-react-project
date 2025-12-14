const express=require("express")
const router=express.Router()
const ProductControllers = require("../controllers/ProductControllers")
const jwt=require("../middleware/verifyJWT")

router.get("/:id",ProductControllers.getProductById)
router.get("/",ProductControllers.getAllProduct)
// router.use(jwt)

router.delete("/:id",jwt,ProductControllers.deleteProduct)
router.put("/",jwt,ProductControllers.updateProduct)
router.post("/",jwt,ProductControllers.createProduct)


module.exports = router