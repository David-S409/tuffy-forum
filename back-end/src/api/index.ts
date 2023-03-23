import express from 'express';

import loginWithGoogleApi from './loginGoogle';
import userRoute from './user/user';
import courseRoute from './course/course';

const router = express.Router();

router.use(loginWithGoogleApi);
router.use(userRoute);
router.use(courseRoute);

export default router;
