import express from 'express';
import passport from 'passport';

const router = express.Router();
const successRedirectUrl = 'http://localhost:5173/login/success';
const failureRedirectUrl = 'http://localhost:5173/login/fail';

router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot Login to Google. Please try again.',
    failureRedirect: failureRedirectUrl,
    successRedirect: successRedirectUrl,
  })
);

export default router;
