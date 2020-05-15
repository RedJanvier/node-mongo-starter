// Models
import Index from '../models/index';
import asyncHandler from '../middlewares/async';

// @desc      Test Route
// @route     GET /api/v1/
// @access    Public
export const testRoute = asyncHandler(async (req, res) => {
  const indexes = await Index.find();

  return res.status(200).json({
    success: true,
    count: indexes.length,
    data: indexes,
  });
});
