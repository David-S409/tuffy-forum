import { PrismaClient, User} from '@prisma/client';
import express from 'express';
import { z } from 'zod';
import isUserAuth from '../../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

const answerSchema = z.object({
    questionId: z.string(),
    text: z.string({ required_error: 'Answer text is required!' }).min(1),
});

router.get('/answers/:qid', async (req, res) => {
  const { qid } = req.params;

  const answers = await prisma.answer.findMany({
    where: { questionId: Number(qid) }
  });
  res.json(answers);
});

router.get('/user/answers', isUserAuth, async (req, res) => {
  const user = req.user as User;

  if (user && user.userId) {
    const userAnswers = await prisma.user.findUnique({
      where: {
        userId: user.userId,
      },
      include: {
        answers: true,
      },
    });
    res.json(userAnswers?.answers);
  } else {
    res.status(400);
    res.json({ error: 'Invalid Request' });
  }
});

router.post('/answer', isUserAuth, async (req, res) => {
  const { body } = req;
  const user = req.user as User;

  try {
    await answerSchema.parseAsync(body);
    const result = await prisma.answer.create({
      data: {
        authorId: user.userId,
        questionId: Number(body.questionId),
        text: body.text,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/upvote/answer/:id', isUserAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAnswer = await prisma.answer.update({
      where: { answerId: Number(id) },
      data: { votes: { increment: 1 } },
    });
    res.json({ votes: updatedAnswer.votes });
  } catch (error) {
    res.status(500).json({ error: 'Error up voting Answer' });
  }
});

router.post('/downvote/answer/:id', isUserAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAnswer = await prisma.answer.update({
      where: { answerId: Number(id) },
      data: { votes: { decrement: 1 } },
    });
    res.json({ votes: updatedAnswer.votes });
  } catch (error) {
    res.status(500).json({ error: 'Error down voting voting Answer' });
  }
});

export default router;