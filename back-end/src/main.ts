import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cookieSession from 'cookie-session';
import session from 'express-session';
import cors from 'cors';

import passport from 'passport';
import api from './api';

import './auth/passportGoogleSSO';

const app: Application = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({ secret: 'tuffy', saveUninitialized: true, resave: true }));
app.use('/api/v1', api);

app.use(passport.initialize());
app.use(passport.session());
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/user', async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.users.findMany();
    return res.json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
});

app.get('/put', async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.users.update({
      where: { id: 1 },
      data: { firstName: 'david' },
    });
    return res.json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
