import { hash as _hash } from "bcrypt";

// Models
import User from "../models/user";

// @desc      Get All Users
// @route     GET /api/v1/users/
// @access    Public
export async function readAll(req, res, next) {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users.map((user) => ({
        _id: user._id,
        name: user.name,
        age: user.age,
        email: user.email,
      })),
    });
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    res.status(500).json({
      success: false,
      error: `Server Error`,
    });
  }
}

// @desc      Get a single user
// @route     GET /api/v1/users/id
// @access    Public
export async function read(req, res, next) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    res.status(500).json({
      success: false,
      error: `Server Error`,
    });
  }
}

// @desc      Create a user
// @route     POST /api/v1/users/
// @access    Public
export async function create(req, res, next) {
  try {
    const { name, email, password, age } = req.body;

    _hash(password, 10, async (err, hash) => {
      if (err) {
        throw new Error(err.message);
      }

      const user = await User.create({ name, age, email, password: hash });

      if (user) {
        res.status(201).json({
          success: true,
          data: user,
        });
      } else {
        throw new Error("User Not Created!");
      }
    });
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    res.status(500).json({
      success: false,
      error: `Server Error`,
    });
  }
}

// @desc      Update a single user
// @route     PUT /api/v1/users/id
// @access    Public
export async function update(req, res, next) {
  try {
    const { id } = req.params;

    const user = await User.findOneAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    res.status(500).json({
      success: false,
      error: `Server Error`,
    });
  }
}

// @desc      Delete a single user
// @route     DELETE /api/v1/users/id
// @access    Public
const _delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).deleteOne();
    console.log(user);
    res.status(201).json({
      success: true,
      count: user.deleteCount,
      data: {},
    });
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    res.status(500).json({
      success: false,
      error: `Server Error`,
    });
  }
};
export { _delete as delete };
