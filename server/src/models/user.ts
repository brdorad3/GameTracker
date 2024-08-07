import mongoose, { ObjectId, Document } from "mongoose";

const Schema = mongoose.Schema;

export interface User  {
    username: string;
    password: string;
  //  id: string;
    reviews: mongoose.Types.ObjectId[];
  }

  export interface UserDocument extends User, Document {}


const userSchema = new mongoose.Schema<UserDocument>({
    username:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
       ref: "Reviews" 
    }]
})


const UserModel = mongoose.model<UserDocument>('User', userSchema);
export default UserModel;