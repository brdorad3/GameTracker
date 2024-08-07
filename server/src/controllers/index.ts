import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler"
import mongoose from "mongoose";
import Reviews from "../models/reviews"



const review_post = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.body.review.user._id)

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    const userId = req.body.review.user._id;
    const gameId = req.body.review.game;

    
    const existingReview = await Reviews.findOne({ author: userId, game: gameId });

    if (existingReview) {
        res.status(400).json({ message: "You have already reviewed this game." });
        return;
    }

    console.log(req.body)
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
    res.status(200).json(review)
})

export{
    review_post
}