import { PrismaClient, User } from '@prisma/client';
import express from 'express';
import { z } from 'zod';
import isUserAuth from '../../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

const courseScheme = z.object({
  courseCode: z
    .string({ required_error: 'Course Code is Required!' })
    .regex(/\/[A-Za-z]+s[0-9]+\/i/),
  name: z.string({ required_error: 'Course Name is Required!' }),
});

router.get('/user/courses', isUserAuth, async (req, res) => {
  const user = req.user as User;
  if (user && user.userId) {
    const userCourses = await prisma.user.findUnique({
      where: {
        userId: user.userId,
      },
      include: {
        courses: true,
      },
    });
    res.json(userCourses?.courses);
  } else {
    res.status(400);
    res.json({ error: 'Invalid Request' });
  }
});

export default router;
