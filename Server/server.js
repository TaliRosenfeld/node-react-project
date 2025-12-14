require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const PORT = process.env.PORT || 1478
const app = express()
connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.use("/api/user", require("./routes/authRouter"))
app.use("/api/prudoct", require("./routes/ProductRouter"))
app.use("/api/user", require("./routes/authRouter"))
app.use("/api/basket", require("./routes/BasketRouter"))



mongoose.connection.once('open', () =>{
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
mongoose.connection.on('error', err =>{
    console.log(err)
})