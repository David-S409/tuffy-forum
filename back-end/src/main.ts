/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import session from 'express-session';
import cors from 'cors';

import passport from 'passport';
import cookieSession from 'cookie-session';
import api from './api';

import './auth/passportGoogleSSO';

const app = express();
const port = 8080; // default port to listen

app.use(
  cors({
    origin: 'http://http://127.0.0.1:5173', // Your Client, do not write '*'
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: 'tuffy',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 1000 * 60 * 60 * 12 },
//   })
// );
app.use(
  cookieSession({
    name: 'session',
    keys: ['tuffy'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', api);
// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
