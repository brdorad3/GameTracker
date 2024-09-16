
import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler"
import mongoose from "mongoose";
import Reviews from "../models/reviews"



const review_post = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const user: any = await User.findById(req.body.review.user._id).populate("reviews");

    if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
    }

    const userId = req.body.review.user._id;
    const gameId = req.body.review.game;

    const existingReview = await Reviews.findOne({ author: userId, game: gameId });

    if (existingReview) {
        await Reviews.findOneAndUpdate({game: gameId, author: userId},
            {status: req.body.review.status, rating: req.body.review.score},
            {new: true}
            
        
        )
        
        const reviewInUser = user.reviews.find((review: any) => review.game.toString() === gameId.toString());
        if (reviewInUser) {
            reviewInUser.status = req.body.review.status;
            reviewInUser.rating = req.body.review.score;
        }
        await user.save()
        res.status(200).json({ message: "Successfuly updated" });
     
       
        return;
    }

    
    const review = new Reviews({
        game: req.body.review.game,
        rating: req.body.review.score,
        status: req.body.review.status,
        author: req.body.review.user
    })
    if(user.reviews)
    await review.save();
    user?.reviews?.push(review._id)
    await user.save()
    res.status(200).json({message: 'Game added to list!'})
})

const reviews_post= asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    
    
   const user = await User.findById(req.body.user._id).populate("reviews")
  
   res.status(200).json(user?.reviews)
})

const rev_del_post = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    
    try {
        
        await User.findByIdAndUpdate(req.body.e.author, {
          $pull: { reviews: req.body.e._id }
        });
    
   
        await Reviews.findByIdAndDelete(req.body.e._id);
    
        
        const updatedUser = await User.findById(req.body.e.author).populate('reviews');
    
        
        res.status(200).json(updatedUser);
    
      } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting review');
      }
    

 })


export{
    review_post,
    reviews_post,
    rev_del_post
}