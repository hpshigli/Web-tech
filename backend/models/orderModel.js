import mongoose from 'mongoose'

// function getISTTime() {
//     const now = new Date();
//     const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
//     const istTime = new Date(now.getTime() + istOffset);
//     return istTime;
//   }

// const orderSchema = new mongoose.Schema({
//     userName:{type:String, required:true},
//     studentId:{type:Number, required:true},
//     userId:{type:String,required:true},
//     items:{type:Array, required:true},
//     amount:{type:Number, required:true},
//     status:{type:String, default:"Food processing"},
//     date:{type:Date, default:getISTTime},
//     // payment:{type:Boolean, default:false}
// })

function getISTTime() {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istTime = new Date(now.getTime() + istOffset);

  // Format the IST time as "YYYY-MM-DD HH:MM:SS"
  const formattedDate = istTime.toISOString().replace('T', ' ').split('.')[0];

  return formattedDate;
}

const orderSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  studentId: { type: Number, required: true },
  canteenName:{ type:String, required: true},
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Order placed" },
  date: { type: String, default: getISTTime }, // Adjusted to store as a string
  deliveryTime:{ type: String, required: true },
  // payment: { type: Boolean, default: false }
});
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema)

export default orderModel;