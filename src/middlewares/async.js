import respond from '../utils/respond';

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(
    fn(req, res, next).catch((err) => {
      if (err.message === 'User not found!')
        return respond.error(res, 404, err.message);

      if (err.name === 'CastError')
        return respond.error(
          res,
          404,
          `Resource not found of id ${err.value}`,
          err
        );
      if (err.code === 11000)
        return respond.error(
          res,
          409,
          `Values entered already exist (${
            err.message.split('"')[1].split('"')[0]
          })`,
          err
        );
      if (err.name === 'ValidationError')
        return respond.error(
          res,
          400,
          Object.values(err.errors).map((val) => val.message),
          err
        );
      if (err.message === `No auth token`)
        return respond.error(res, 401, 'please provide a token', err);
      console.log(`Error: ${err.message}`.red);
      return respond.error(res, 500, err.message, err);
    })
  );

export default asyncHandler;
