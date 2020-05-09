import { Router } from 'express';

import { testRoute } from '../controllers/index';
import users from './users';

const router = Router();

router.route('/').get(testRoute);

router.use('/users', users);

export default router;
