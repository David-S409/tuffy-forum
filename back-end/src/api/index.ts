import express from 'express';

import loginWithGoogleApi from './loginGoogle';
import userRoute from './user';

const router = express.Router();

router.use(loginWithGoogleApi);
router.use(userRoute);

export default router;
