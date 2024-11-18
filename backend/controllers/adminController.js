import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login admin

const loginAdmin = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const admin = await adminModel.findOne({email});
        if(!admin){
            return res.json({success:false, message:"Admin doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,admin.password);

        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"})
        }

        const adToken = createToken(admin._id);
        res.json({success:true, adToken})

    } catch (error) {
        
    }

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET_1)
}



//register admin

const registerAdmin = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        // checking if admin exists
        const exists = await adminModel.findOne({email});
        // const idExists = await adminModel.findOne({pesId});
        // const idPattern = "PES";
        // function idPattern(isId){
        //     return isId.startsWith("PES")
        // }

        if(exists){
            return res.json({success:false,message:"Admin already exists. Please check the email"})
        }

        // if (idExists){
        //     return res.json({success:false, message:"ID already exists"})
        // }
        //  validating email format and strong password

        if(!validator.isEmail(email)){
            res.json({success:false, message:"Please enter a valid email"})
        }

        // if (!validator.isNumeric(pesId)){
        //     res.json({success:false, message:"Invalid ID"})
        // }

        // if(pesId.length<10){
        //     return res.json({success:false, message:"Please enter valid ID"})
        // }
        // if(pesId.length>10){
        //     return res.json({success:false, message:"Please enter valid ID"})
        // }

        // if(password.length<8){
        //     return res.json({success:false, message:"Please enter a strong password"})
        // }

        if(!validator.isStrongPassword(password)){
            return res.json({success:false, message:"Please enter a strong password: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"})
        }

        // hashing admin password

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newAdmin = new adminModel({
            name:name,
            email:email,
            // pesId:pesId,
            password:hashedPassword,
        })

        const admin = await newAdmin.save()
        const adToken = createToken(admin._id);
        res.json({success:true,adToken});


        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }

}

export {loginAdmin,registerAdmin}