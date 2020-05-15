import { hash as _hash } from 'bcrypt';

import User from '../models/user';
import asyncHandler from '../middlewares/async';

// @desc      Get All Users
// @route     GET /api/v1/users/
// @access    Public
export const readAll = asyncHandler(async (req, res) => {
  const users = await User.find();

  return res.status(200).json({
    success: true,
    count: users.length,
    data: users.map((user) => ({
      _id: user._id,
      name: user.name,
      age: user.age,
      email: user.email,
    })),
  });
});

// @desc      Get a single user
// @route     GET /api/v1/users/id
// @access    Public
export const read = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  return res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Create a user
// @route     POST /api/v1/users/
// @access    Public
export const create = asyncHandler(async (req, res) => {
  const { name, email, password, age } = req.body;

  _hash(password, 10, async (err, hash) => {
    if (err) throw new Error(err.message);

    const user = await User.create({ name, age, email, password: hash });

    if (user) {
      return res.status(201).json({
        success: true,
        data: { ...user, password: null },
      });
    }
    throw new Error('User Not Created!');
  });
});

// @desc      Update a single user
// @route     PUT /api/v1/users/id
// @access    Public
export const update = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOneAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Delete a single user
// @route     DELETE /api/v1/users/id
// @access    Public
const _delete = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).deleteOne();

  return res.status(201).json({
    success: true,
    count: user.deleteCount,
    data: {},
  });
});
export { _delete as delete };
