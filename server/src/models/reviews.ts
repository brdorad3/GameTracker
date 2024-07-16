import mongoose from "mongoose";

const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    rating:{
        type:Number,
        required: true
    },
    comment:{
        type: String,

    }

})

export default mongoose.model("Reviews", reviewSchema)