import { PrismaClient, User } from '@prisma/client';
import express from 'express';
import { z } from 'zod';
import isUserAuth from '../../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

const courseScheme = z.object({
  courseCode: z
    .string({ required_error: 'Course Code is Required!' })
    .regex(/[A-Z]{4} \d{3}/),
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

router.get('/courses/search', async (req, res) => {
  const { query } = req;

  if (Object.keys(query).length !== 0) {
    const results = await prisma.course.findMany({
      take: 10,
      where: {
        OR: [
          { courseCode: { contains: query.courseCode as string } },
          { name: { contains: query.name as string } },
        ],
      },
    });

    if (results) {
      res.status(200).json(results);
    }
  } else {
    res.status(400).json({ error: 'Invalid Search' });
  }
});

router.get('/courses/:id', async (req, res) => {
  const { id } = req.params;

  const course = await prisma.course.findUnique({
    where: {
      courseCode: String(id),
    },
  });

  if (course) {
    res.status(200).json(course);
  } else {
    res.status(404).json({ error: 'Question not found' });
  }
});

router.post('/course', isUserAuth, async (req, res) => {
  const { body } = req;
  console.log(body);

  try {
    await courseScheme.parseAsync(body);
    const result = await prisma.course.create({
      data: {
        courseCode: body.courseCode,
        name: body.name,
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/add/course/:id', isUserAuth, async (req, res) => {
  const { id } = req.params;
  const currentUser = req.user as User;

  try {
    const updatedCourse = await prisma.course.update({
      where: { courseId: Number(id) },
      data: {
        users: {
          create: { user: { connect: { userId: currentUser.userId } } },
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error adding Course' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { userId: currentUser.userId },
      data: {
        courses: { create: { course: { connect: { courseId: Number(id) } } } },
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error adding Course' });
  }
});

export default router;
