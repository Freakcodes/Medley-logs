import mongoose from "mongoose"

const connectDB=async()=>{
    try{
         await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected successfully...");
        
    }catch(err){
        console.log("connection failed",err);
        
    }
}
export default connectDB;