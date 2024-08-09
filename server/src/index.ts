import "dotenv/config"
import express, { Request, Response } from "express";
import cors from "cors"
import mongoose from "mongoose";
import './passportConfig';
import session from "express-session";
import passport from "passport";
import * as LocalStrategy from "passport-local"
import MongoStore from 'connect-mongo'
import { UserDocument } from "./models/user";
import User from "./models/user";
import "./authMiddleware"
import { Error } from 'mongoose';
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import routes from "./routes/index"

const app = express();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB!);
}



const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200
  };

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(passport.initialize());



app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

app.use(passport.session());

app.use("/", routes)


app.post('/signup',[
  body("username").isLength({min:4, max: 20}).escape().withMessage("Username must be specified")
  .custom(async (value) => {
    const user = await User.findOne({ username: value });
    if (user) {
        throw new Error("Username is already in use");
    }
}).escape(),
  body("password").isLength({min:8, max: 25}).escape().withMessage("Password must be specified").isStrongPassword().withMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
  body("confirm").custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Passwords do not match');
    }
    return true;
}),
  async (req: Request, res: Response) => {
    
  

    const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors)
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password, confirm } = req.body;
    
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword, confirm });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
] );


app.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err: Error | null, user: UserDocument | false, info: { message: string } | undefined) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Your username or password are incorrect!' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '24h' });
    return res.json({ token, user });
  })(req, res, next);
});

app.get('/api/user/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
  } catch (err) {
      res.status(500).json({ error: 'Server error' });
  }
});


app.listen(3000, () => {
    console.log("up")
});