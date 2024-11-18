import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user

const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"})
        }

        const token = createToken(user._id);
        res.json({success:true, token})

    } catch (error) {
        
    }

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user

const registerUser = async(req,res)=>{
    const {name,password,email,pesId} = req.body;
    try {
        // checking if user exists
        const exists = await userModel.findOne({email});
        const idExists = await userModel.findOne({pesId});
        // const idPattern = "PES";
        // function idPattern(isId){
        //     return isId.startsWith("PES")
        // }

        if(exists || idExists){
            return res.json({success:false,message:"User already exists. Please check the email or ID"})
        }

        // if (idExists){
        //     return res.json({success:false, message:"ID already exists"})
        // }
        //  validating email format and strong password

        if(!validator.isEmail(email)){
            res.json({success:false, message:"Please enter a valid email"})
        }

        if (!validator.isNumeric(pesId)){
            res.json({success:false, message:"Invalid ID"})
        }

        if(pesId.length<10){
            return res.json({success:false, message:"Please enter valid ID"})
        }
        if(pesId.length>10){
            return res.json({success:false, message:"Please enter valid ID"})
        }

        // if(password.length<8){
        //     return res.json({success:false, message:"Please enter a strong password"})
        // }

        if(!validator.isStrongPassword(password)){
            return res.json({success:false, message:"Please enter a strong password: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"})
        }

        // hashing user password

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            pesId:pesId,
            password:hashedPassword,
        })

        const user = await newUser.save()
        const token = createToken(user._id);
        res.json({success:true,token});


        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }

}

export {loginUser,registerUser}