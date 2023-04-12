/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import isUserAuth from '../../middleware/auth';

const router = express.Router();

router.get('/auth/user', isUserAuth, async (req, res) => {
  res.json(req.user);
});
export default router;
