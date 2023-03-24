import { PrismaClient, User } from '@prisma/client';
import express from 'express';
import { z } from 'zod';
import isUserAuth from '../../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

const questionSchema = z.object({
  courseId: z.string(),
  header: z.string({ required_error: 'A Header is required!' }).min(1),
  text: z.string({ required_error: 'Question text is required!' }).min(1),
});

router.get('/questions', isUserAuth, async (req, res) => {
  const user = req.user as User;
  if (user && user.userId) {
    const userCourses = await prisma.user.findUnique({
      where: {
        userId: user.userId,
      },
      include: {
        questions: true,
      },
    });
    res.json(userCourses?.questions);
  } else {
    res.status(400);
    res.json({ error: 'Invalid Request' });
  }
});

router.get('/question/:id', async (req, res) => {
  const { id } = req.params;
  const question = await prisma.question.findUnique({
    where: {
      questionId: Number(id),
    },
  });
  if (question) {
    res.status(200).json(question);
  } else {
    res.status(404).json({ error: 'Question not found' });
  }
});

router.post('/question', isUserAuth, async (req, res) => {
  const { body } = req;
  const user = req.user as User;
  try {
    await questionSchema.parseAsync(body);
    const result = await prisma.question.create({
      data: {
        authorId: user.userId,
        courseId: Number(body.courseId),
        header: body.header,
        text: body.text,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
