import { Router } from 'express';
import user from '../controllers/users';
import middlewares from '../middlewares/users';

const router = Router();

router.route('/').get(user.readAll);
router.route('/login').post(middlewares.validateLogin, user.login);
router.route('/signup').post(middlewares.validateSignup, user.create);
router.route('/confirm/:token').get(middlewares.validateConfirm, user.confirm);
router.route('/:id').get(user.read).put(user.update).delete(user.delete);

export default router;
