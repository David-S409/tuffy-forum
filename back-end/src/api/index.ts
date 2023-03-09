import express from 'express';

import loginWithGoogleApi from './loginGoogle';

const router = express.Router();

router.use(loginWithGoogleApi);

export default router;
