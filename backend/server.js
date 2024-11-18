import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import adminRouter from "./routes/adminRoute.js"


// app connfig
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.send("API Working")
})


// db connection
connectDB();

// api endpoints

app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

// mongodb+srv://hpshigli:avkdobara@cluster0.z40cksl.mongodb.net/?



