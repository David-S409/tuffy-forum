/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import { PrismaClient, User } from '@prisma/client';
import isUserAuth from '../../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/auth/user', isUserAuth, async (req, res) => {
  res.json(req.user);
});

router.get('/user/onboard', isUserAuth, async (req, res) => {
  const user = req.user as User;
  try {
    await prisma.user
      .update({
        where: { userId: user.userId },
        data: { isOnboard: true },
      })
      .then(() => {
        res.status(200).json({ success: 'Updated' });
      });
  } catch (error) {
    res.status(500).json({ error: 'Error setting on boarded' });
  }
});
export default router;
