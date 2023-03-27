import { Request, Response, NextFunction } from 'express';

const isUserAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
};

export default isUserAuth;
