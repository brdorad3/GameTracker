import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import "dotenv/config"

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET! );
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;