const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const User = require('../models/user');

// Get token from model, create cookie and send response
const sendTokenResponse = async (user, statusCode, res) => {
    // Create token
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
      });
  
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
  
    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token
      });
  };

// @desc      Get All Users
// @route     GET /api/v1/users/
// @access    Public
exports.readAll = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            count: users.length,
            data: users.map(user => ({ _id: user._id, name: user.name, age: user.age, email: user.email }))
        });
    } catch (err) {
        console.log(`Error: ${err.message}`.red);
        res.status(500).json({
            success: false,
            error: `Server Error`
        });
    }
};

// @desc      Get a single user
// @route     GET /api/v1/users/id
// @access    Public
exports.read = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.log(`Error: ${err.message}`.red);
        res.status(500).json({
            success: false,
            error: `Server Error`
        });
    }
};

// @desc      Create a user
// @route     POST /api/v1/users/
// @access    Public
exports.create = async (req, res, next) => {
    try {
        const { name, email, password, age } = req.body

        bcrypt.hash(password, 10, async (err, hash) => {
            if(err) {
                throw new Error(err.message);
            }

            const user = await User.create({ name, age, email, password: hash });
            
            if(user) {
                res.status(201).json({
                    success: true,
                    data: user  
                });
            } else {
                throw new Error('User Not Created!');
            }
            
        })
    } catch (err) {
        console.log(`Error: ${err.message}`.red);
        res.status(500).json({
            success: false,
            error: `Server Error`
        });
    }
};

// @desc      Update a single user
// @route     PUT /api/v1/users/id
// @access    Public
exports.update = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findOneAndUpdate(id, req.body, {
            new: true,
            runValidators: true
          });

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.log(`Error: ${err.message}`.red);
        res.status(500).json({
            success: false,
            error: `Server Error`
        });
    }
};

// @desc      Delete a single user
// @route     DELETE /api/v1/users/id
// @access    Public
exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).deleteOne();

        console.log(user);
        
        res.status(201).json({
            success: true,
            count: user.deleteCount,
            data: {}
        });
    } catch (err) {
        console.log(`Error: ${err.message}`.red);
        res.status(500).json({
            success: false,
            error: `Server Error`
        });
    }
};

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    
    // Check for user
    const user = await User.findOne({ email }).select('password');
  
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    // Check if password matches
    const isMatch = await bcrypt.compare(enteredPassword, user.password);
    
    if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  
    sendTokenResponse(user, 200, res);
  };
  
  // @desc      Log user out / clear cookie
  // @route     GET /api/v1/auth/logout
  // @access    Private
  exports.logout = async (req, res, next) => {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
  
    res.status(200).json({
      success: true,
      data: {}
    });
  };
  