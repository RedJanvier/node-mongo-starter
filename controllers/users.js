// Models
const User = require('../models/user');

// @desc      Get All Users
// @route     GET /api/v1/users/
// @access    Public
exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        console.log(`Error: ${err.message}`.red);
        res.status(500).json({
            success: false,
            error: `Server Error`
        });
    }
};