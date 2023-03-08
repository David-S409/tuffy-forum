import express, { Application, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app: Application = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080; // default port to listen

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/api/user', async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    return res.json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
});

app.get('/api/put', async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.update({
      where: { id: 1 },
      data: { name: 'david' },
    });
    return res.json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error,
    });
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
