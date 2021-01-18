/* eslint-disable class-methods-use-this */
import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import { compare, genSalt, hash } from 'bcryptjs';

const { JWT_SECRET } = process.env;

class AuthHelpers {
  async encryptPassword(password) {
    const salt = await genSalt(10);
    const hashed = await hash(password, salt);
    return hashed;
  }

  async decryptPassword(...params) {
    const isValid = await compare(...params);
    return isValid;
  }

  signToken(data, secret = JWT_SECRET, duration = '2h') {
    const token = sign(data, secret, { expiresIn: duration });
    return token;
  }

  verifyToken(token, secret = JWT_SECRET) {
    const data = verify(token, secret);
    return data;
  }
}

const authHelpers = new AuthHelpers();

export default authHelpers;
