import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import asyncHandler from "express-async-handler"
import mongoose from "mongoose";


const review_post = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
})

export{
    review_post
}