import { Router } from 'express';

import {
  readAll,
  create,
  read,
  update,
  delete as deleteUser,
} from '../controllers/users';

const router = Router();

router.route('/').get(readAll).post(create);

router.route('/:id').get(read).put(update).delete(deleteUser);

export default router;
