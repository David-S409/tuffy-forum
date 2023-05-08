import express from 'express';

import loginWithGoogleApi from './loginGoogle';
import userRoute from './user/user';
import courseRoute from './course/course';
import questionRoute from './question/question';
import answerRoute from './answer/answer';

const router = express.Router();

router.use(loginWithGoogleApi);
router.use(userRoute);
router.use(courseRoute);
router.use(questionRoute);
router.use(answerRoute);

export default router;
