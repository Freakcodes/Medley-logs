import {Schema} from "mongoose";
import mongoose from "mongoose";

const postModel=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdBy:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },  
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
    },
    content:{
        type:String,
        required:true
    },
    visit:{
        type:Number,
        default:0,
    }


},
{timestamps:true})


export default mongoose.model("Post",postModel);