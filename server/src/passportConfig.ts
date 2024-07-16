import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import User from './models/user'; 
import 'dotenv/config'
import UserModel , { UserDocument } from './models/user';

const localOptions = { usernameField: 'username' };

passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: string, done: (err: any, user?: UserDocument | null) => void) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

passport.use(new LocalStrategy(localOptions, async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false, { message: 'Invalid email' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Invalid password' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET! 
};

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.userId);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));
