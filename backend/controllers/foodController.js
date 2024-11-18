import foodModel from "../models/foodModel.js";
import fs from 'fs'

const addFood = async(req,res)=>{

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        // description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        canteen:req.body.canteen,
        image:image_filename
    })

    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
 
}


// All food list
const listFood = async (req, res) => {
    try {
        // Check if there's a canteen query parameter
        const canteenName = req.query.canteen;

        // Fetch food items, optionally filtering by canteen name
        let foods;
        if (canteenName) {
            foods = await foodModel.find({ canteen: canteenName });
        } else {
            foods = await foodModel.find({});
        }

        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error fetching food list' });
    }
};


// Remove food item

const removeFood = async(req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:'Food removed'})
        
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error'})
         
    }
}

export {addFood,listFood,removeFood};