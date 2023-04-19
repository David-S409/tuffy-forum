import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';

import passport from 'passport';
import cookieSession from 'cookie-session';
import api from './api';

import './auth/passportGoogleSSO';

const app = express();
const port = 8080; // default port to listen
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://http://127.0.0.1:5173', // Your Client, do not write '*'
    credentials: true,
  })
);

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
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
