const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(
    fn(req, res, next).catch((err) => {
      console.log(`Error: ${err.message}`.red);
      res.status(err.code || 500).json({
        success: false,
        error: `Server Error`,
      });
    })
  );

export default asyncHandler;
