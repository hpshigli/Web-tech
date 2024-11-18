import express from "express"
import { loginAdmin, registerAdmin } from "../controllers/adminController.js";
// import { loginUser,registerUser } from "../controllers/adminController.js"

const adminRouter = express.Router()

adminRouter.post("/qazPLM/register/Q1D5t7y8", registerAdmin)
adminRouter.post("/login",loginAdmin)

export default adminRouter;