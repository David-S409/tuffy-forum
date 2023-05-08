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
  tags: z.string().array().optional(),
});

router.get('/questions', isUserAuth, async (req, res) => {
  const user = req.user as User;
  if (user && user.userId) {
    const userCourses = await prisma.question.findMany({
      where: { authorId: user.userId },
      include: { answers: true },
    });
    res.json(userCourses);
  } else {
    res.status(400);
    res.json({ error: 'Invalid Request' });
  }
});
router.get('/questions/search', async (req, res) => {
  const { query } = req;

  if (Object.keys(query).length !== 0) {
    const results = await prisma.question.findMany({
      take: 10,
      where: {
        OR: [
          { header: { contains: query.search as string } },
          { text: { contains: query.search as string } },
          { tags: { has: query.search as string } },
        ],
      },
      include: { answers: true },
    });

    if (results) {
      res.status(200).json(results);
    }
  } else {
    res.status(400).json({ error: 'Invalid Search' });
  }
});

router.get('/questions/:id', async (req, res) => {
  const { id } = req.params;
  const question = await prisma.question.findUnique({
    where: {
      questionId: Number(id),
    },
    include: { answers: true },
  });
  if (question) {
    res.status(200).json(question);
  } else {
    res.status(404).json({ error: 'Question not found' });
  }
});

router.post('/question', isUserAuth, async (req, res) => {
  const { body } = req;
  const tags = body.tags ? body.tags : [];
  const user = req.user as User;
  try {
    await questionSchema.parseAsync(body);
    const result = await prisma.question.create({
      data: {
        authorId: user.userId,
        courseId: Number(body.courseId),
        header: body.header,
        text: body.text,
        tags,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/upvote/question/:id', isUserAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPost = await prisma.question.update({
      where: { questionId: Number(id) },
      data: { votes: { increment: 1 } },
    });
    res.json({ votes: updatedPost.votes });
  } catch (error) {
    res.status(500).json({ error: 'Error up voting Post' });
  }
});

router.post('/downvote/question/:id', isUserAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPost = await prisma.question.update({
      where: { questionId: Number(id) },
      data: { votes: { decrement: 1 } },
    });
    res.json({ votes: updatedPost.votes });
  } catch (error) {
    res.status(500).json({ error: 'Error down voting voting Post' });
  }
});

router.get('/question/remove/:id', isUserAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.question
      .delete({ where: { questionId: Number(id) } })
      .then(() => {
        res.status(200).json({ msg: 'Question Deleted' });
      });
  } catch (error) {
    console.log(error);
  }
});
export default router;
