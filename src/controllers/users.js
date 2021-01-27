import asyncHandler from '../middlewares/async';
import authHelpers from '../utils/auth';
import mailHelpers from '../utils/mail';
import respond from '../utils/respond';
import User from '../services/user';

class UserControllers {
  constructor() {
    /**
     * @desc      Get All Users
     * @route     GET /api/v1/users/
     * @access    Public
     */
    this.readAll = asyncHandler(async (req, res) => {
      const users = await User.findAll();

      return respond.success(res, 200, { count: users.length, users });
    });

    /**
     * @desc      Get a single user
     * @route     GET /api/v1/users/:id
     * @access    Public
     */
    this.read = asyncHandler(async (req, res) => {
      const user = await User.findOne({ _id: req.params.id });

      return respond.success(res, 200, user);
    });

    /**
     * @desc      Login user
     * @route     POST /api/v1/users/login
     * @access    Public
     */
    this.login = asyncHandler(async (req, res) => {
      const { email, password } = req.body;
      const user = await User.findOriginalOne({ email });
      if (!user.confirmed)
        return respond.error(res, 401, 'Please confirm your email first!');

      const isValid = await user.matchPasswords(password);
      if (!isValid) return respond.error(res, 401, 'Invalid Credentials');

      const token = authHelpers.signToken({
        id: user.id,
        name: user.name,
        email: user.email,
      });

      return respond.success(res, 200, token, 'Login success');
    });

    /**
     * @desc      Confirm a user
     * @route     GET /api/v1/users/confirm/:token
     * @access    Private
     */
    this.confirm = asyncHandler(async (req, res) => {
      const { email } = authHelpers.verifyToken(req.params.token);
      const user = await User.findOne({ email });
      if (user.confirmed)
        return respond.error(res, 400, 'User already confirmed!');

      await User.update({ email }, { confirmed: true });

      return respond.success(
        res,
        200,
        {},
        'User confirmed! You can now login.'
      );
    });

    /**
     * @desc      Signup a user
     * @route     POST /api/v1/users/signup
     * @access    Public
     */
    this.create = asyncHandler(async (req, res) => {
      const user = await User.create(req.body);
      mailHelpers.requestEmailConfirm(user);
      respond.success(
        res,
        201,
        user,
        'User created! Please confirm your email.'
      );
    });

    /**
     * @desc      Update a single user
     * @route     PUT /api/v1/users/:id
     * @access    Public
     */
    this.update = asyncHandler(async (req, res) => {
      const user = await User.update({ _id: req.params.id }, req.body);

      return res.status(200).json({
        success: true,
        data: user,
      });
    });

    /**
     * @desc      Delete a single user
     * @route     DELETE /api/v1/users/:id
     * @access    Public
     */
    this.delete = asyncHandler(async (req, res) => {
      const user = await User.delete({ _id: req.params.id });

      return res.status(200).json({
        success: true,
        count: user.deleteCount,
        data: {},
      });
    });
  }
}

const userController = new UserControllers();

export default userController;
