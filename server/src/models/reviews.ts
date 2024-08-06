import mongoose from "mongoose";

const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    game:{
        type: String,
        required: true
    },
    rating:{
        type:Number,
        required: true
    },
    status:{
        type: String,
        required: true
    },
   

})

export default mongoose.model("Reviews", reviewSchema)