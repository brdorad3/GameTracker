import mongoose from "mongoose";

const Schema = mongoose.Schema;


export interface Review  {
    game: string;
    rating: number;
    status: string;
    author?: mongoose.Types.ObjectId[];
  }

  export interface ReviewDocument extends Review, Document {}



const reviewSchema = new Schema<ReviewDocument>({
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
    author:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
   

})


const ReviewModel = mongoose.model<ReviewDocument>('Reviews', reviewSchema);
export default ReviewModel;