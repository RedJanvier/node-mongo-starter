/* eslint-disable class-methods-use-this */
import Joi from 'joi';
import respond from '../utils/respond';
import asyncHandler from './async';

class UsersMiddlewares {
  constructor() {
    this.validateSignup = asyncHandler(async (req, res, next) => {
      const schema = Joi.object({
        name: Joi.string().min(5).required(),
        age: Joi.number().min(12).allow(null),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required(),
      });
      const { error } = schema.validate(req.body);
      if (error)
        return respond.error(
          res,
          400,
          error.details[0].message.split('"').join('')
        );
      return next();
    });

    this.validateLogin = asyncHandler(async (req, res, next) => {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required(),
      });
      const { error } = schema.validate(req.body);
      if (error)
        return respond.error(
          res,
          400,
          error.details[0].message.split('"').join('')
        );
      return next();
    });

    this.validateConfirm = asyncHandler(async (req, res, next) => {
      const schema = Joi.object({
        token: Joi.string().min(10).required(),
      });
      const { error } = schema.validate(req.params);
      if (error) return respond.error(res, 403, 'Invalid URL!');
      return next();
    });
  }
}

const usersMiddlewares = new UsersMiddlewares();

export default usersMiddlewares;
