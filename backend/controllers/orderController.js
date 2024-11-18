import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// import foodModel from "../models/foodModel.js";
// placing order from frontend

const placeOrder = async(req,res)=>{

    try {

        const user = await userModel.findById(req.body.userId);
        // const food = await foodModel.findById(req.body.itemId);

        const newOrder = new orderModel({
            userName:user.name,
            studentId:user.pesId,
            canteenName:req.body.canteenName,
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            deliveryTime:req.body.deliveryTime,
        })
        await newOrder.save();
        res.json({success:true, message:"Order Successfully Placed!!"}) 
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
        
    }

}

// user orders for frontend

const userOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true, data:orders})
    } catch (error) {
        console.log("Error");
        res.json({success:false, message:"Error"})
        
    }
}

// listing orders for admins

const listOrders = async(req,res)=>{
    try {
        const canteenDetail = req.query.canteenName;
        let orders;
        if (canteenDetail) {
            orders = await orderModel.find({canteenName:canteenDetail})
            
        } else {
            
            orders = await orderModel.find({})
        }
        res.json({success:true, data:orders})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }

}

// api for updating status

const updateStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
        res.json({success:true, message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

const cancelOrders = async(req,res)=>{
    try {
        await orderModel.findByIdAndDelete(req.body.orderId)
        res.json({success:true, message:"Ordered Cancelled"})
       
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}

// const verifyOrder = async(req,res) =>{
//     const {orderId,success} = req.body;
//     try {
//         if (success=="true")
//         {
//             await orderModel.findByIdAndUpdate(orderId, {payment:true})
//             res.json({success:true, message:"Paid" })
//         }
//     } catch (error) {
//         res.json({success:false, message:"Error"})
//     }
// }

export {placeOrder,userOrders,listOrders,updateStatus,cancelOrders}
































