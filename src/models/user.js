/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import authHelpers from '../utils/auth';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, 'Please Provide a name'],
    },
    age: Number,
    email: {
      type: String,
      unique: [true, 'The email is already in use'],
      required: [true, 'Please Provide an email'],
    },
    password: {
      type: String,
      required: [true, 'Please Provide a password'],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await authHelpers.encryptPassword(this.password);
  return next();
});

UserSchema.methods.matchPasswords = async function (password) {
  const valid = await authHelpers.decryptPassword(password, this.password);
  return valid;
};

export default model('User', UserSchema);
